namespace TLcg {
	export class uiViewBase extends eui.Component {
		private uiLayer: egret.DisplayObjectContainer;

		public creat(): void {
			this.addEventListener(egret.Event.RESIZE, this.onResize, this)
			this.uiLayer = uiManager.instance.uiLayer;
			this.onCreat();
		}

		public destroy(): void {
			this.removeEventListener(egret.Event.RESIZE, this.onResize, this)
			this.onDestroy();
		}

		public show(value: boolean): void {
			if (value) {
				if (this.uiLayer.contains(this)) {
					this.uiLayer.setChildIndex(this, this.uiLayer.numChildren - 1);
				}
				else {
					this.uiLayer.addChild(this);
				}
				this.onShow();
			}
			else {
				this.onHide();
				this.uiLayer.removeChild(this);
			}
		}

		public setInteractive(value: boolean): void {
			// this.touchEnabled = value;
			this.touchChildren = value;
		}

		protected onCreat(): void {

		}

		protected onDestroy(): void {

		}

		protected onShow(): void {

		}

		protected onHide(): void {

		}

		protected onResize(event: egret.Event = null) {

		}
	}
}