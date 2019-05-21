namespace TLcg {
	export class uiManager implements Ibase {

		private static _instance: uiManager;
		public static get instance(): uiManager {
			if (null == uiManager._instance) {
				uiManager._instance = new uiManager();
			}
			return uiManager._instance
		}

		// ui中心
		private _uiCenter: uiCenter;
		private _uiEvent: uiEvent;

		// ui层
		private _uilayer: egret.DisplayObjectContainer;
		public get uiLayer(): egret.DisplayObjectContainer {
			return this._uilayer;
		}

		// 引导层
		private _guidelayer: egret.DisplayObjectContainer;
		public get guidelayer(): egret.DisplayObjectContainer {
			return this._guidelayer;
		}

		// 置顶层
		private _toplayer: egret.DisplayObjectContainer;
		public get toplayer(): egret.DisplayObjectContainer {
			return this._toplayer;
		}

		public initialize(): void {
			this._uiCenter = new uiCenter();
			this._uiEvent = new uiEvent();

			this._uilayer = new egret.DisplayObjectContainer();
			this._guidelayer = new egret.DisplayObjectContainer();
			this._toplayer = new egret.DisplayObjectContainer();
			gameEngine.instance.addChild(this._uilayer);
			gameEngine.instance.addChild(this._guidelayer);
			gameEngine.instance.addChild(this._toplayer);

			// 打开登陆面板
			this.openCtrl(uiCtrlName.login);
		}

		public update(): void {
			this._uiCenter.update();
		}

		public destroy(): void {

		}

		public appFocus(focus: boolean): void {

		}

		public openCtrl(value: string, data: any = null): void {
			let ctrl = this._uiCenter.getCtrl(value);
			if (null == ctrl) {
				return;
			}
			ctrl.open(data);
		}
		public closeCtrl(value: string): void {
			let ctrl = this.getCtrl(value);
			if (null == ctrl) {
				return;
			}
			ctrl.close();
		}
		public getCtrl(value: string): uiCtrlBase {
			if (!this._uiCenter.existsCtrl(value)) {
				return null;
			}
			return this._uiCenter.getCtrl(value);
		}

		public dispatchEvent(type: string, data?: any, cancelable?: boolean) {
			this._uiCenter.dispatchEvent(type, data);
			this._uiEvent.dispatchEventWith(type, false, data, cancelable);
		}
		public addEventListener(type: string, listener: Function, thisObject: any, priority?: number): void {
			this._uiEvent.addEventListener(type, listener, thisObject, false, priority);
		}
		public addOnceEventListener(type: string, listener: Function, thisObject: any, priority?: number): void {
			this._uiEvent.once(type, listener, thisObject, false, priority);
		}
		public removeEventListener(type: string, listener: Function, thisObject: any): void {
			this._uiEvent.removeEventListener(type, listener, thisObject, false);
		}
	}
}