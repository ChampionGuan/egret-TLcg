namespace TLcg {
	export class uiCenterBase {
		private ctrlMap: { [key: string]: uiCtrlBase } = {};
		private viewMap: { [key: string]: uiViewBase } = {};
		private ctrlStack: List<uiCtrlBase> = new List<uiCtrlBase>();

		public getCtrl(value: string): uiCtrlBase {
			if (null != this.ctrlMap[value]) {
				return this.ctrlMap[value];
			}
			return null;
		}
		public getView(value: string): uiViewBase {
			if (null != this.viewMap[value]) {
				return this.viewMap[value];
			}
			return null;
		}

		public existsCtrl(value: string): boolean {
			return this.ctrlMap[value] != null;
		}
		public existsView(value: string): boolean {
			return this.viewMap[value] != null;
		}

		public addCtrl(value: uiCtrlBase): void {
			if (null != this.ctrlMap[value.ctrlName]) {
				return;
			}
			this.ctrlMap[value.ctrlName] = value;
		}
		public addView(value: uiCtrlBase): void {
			if (null != this.viewMap[value.ctrlName]) {
				return;
			}
			this.viewMap[value.ctrlName] = value.view;
		}

		public removeCtrl(value: string): void {
			if (null == this.ctrlMap[value]) {
				return;
			}
			this.ctrlMap[value] = null;
		}
		public removeView(value: string): void {
			if (null == this.viewMap[value]) {
				return;
			}
			this.viewMap[value] = null;
		}

		public enqueue(value: uiCtrlBase): void {
			let index: number = this.ctrlStack.size();
			if (!value.isPopupBox) {
				this.hidePreCtrl(index - 1);
			}
			else {
				this.ctrlStack.get(index - 1).setInteractive(false);
			}

			this.ctrlStack.remove(value);
			this.ctrlStack.add(value);
			value.show();
		}
		public dequeue(value: uiCtrlBase): void {
			value.hide();

			let index: number = this.ctrlStack.size();
			if (index < 0) {
				return;
			}
			if (this.ctrlStack.indexOf(value) < 0) {
				return;
			}
			this.ctrlStack.remove(value);

			index = this.ctrlStack.size();
			if (!value.isPopupBox) {
				this.showPreCtrl(index - 1);
			}
			else {
				this.ctrlStack.get(index - 1).setInteractive(true);
			}
		}

		private hidePreCtrl(value: number): void {
			if (value < 0) {
				return;
			}
			let ctrl: uiCtrlBase = this.ctrlStack.get(value);
			if (null == ctrl) {
				return;
			}
			ctrl.hide();
			if (ctrl.isPopupBox) {
				value--;
				this.hidePreCtrl(value);
			}
		}
		private showPreCtrl(value: number): void {
			if (value < 0) {
				return;
			}
			let ctrl: uiCtrlBase = this.ctrlStack.get(value);
			if (null == ctrl) {
				return;
			}
			ctrl.show();
			if (ctrl.isPopupBox) {
				value--;
				this.showPreCtrl(value);
			}
		}
		public dispatchEvent(value: string, data: any): void {
			let len: number = this.ctrlStack.size();
			for (let i: number = 0; i < len; i++) {
				this.ctrlStack.get(i).ntfMsg(value, data);
			}
		}
		public update(): void {
			let len: number = this.ctrlStack.size();
			for (let i: number = 0; i < len; i++) {
				this.ctrlStack.get(i).update();
			}
		}
	}
}