namespace TLcg {
	export class uiCenter extends uiCenterBase {
		public getCtrl(value: string): uiCtrlBase {
			let ctrl: uiCtrlBase = super.getCtrl(value);
			if (null == ctrl) {
				switch (value) {
					case uiCtrlName.login: ctrl = new loginCtrl(); break;
					case uiCtrlName.battle: ctrl = new battleCtrl(); break;
					case uiCtrlName.popup: ctrl = new popupCtrl(); break;
					default: break;
				}
				if (null != ctrl) {
					ctrl.creat(this);
				}
			}
			return ctrl;
		}
		public getView(value: string): uiViewBase {
			let view: uiViewBase = super.getView(value);
			if (null == view) {
				switch (value) {
					case uiCtrlName.login: view = new loginView(); break;
					case uiCtrlName.battle: view = new battleView(); break;
					case uiCtrlName.popup: view = new popupView(); break;
					default: break;
				}
			}
			return view;
		}
	}
}