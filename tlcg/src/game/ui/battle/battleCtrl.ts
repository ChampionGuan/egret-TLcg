namespace TLcg {
	export class battleCtrl extends uiCtrlBase {
		public view:battleView;
		
		public get ctrlName():string
		{
			return uiCtrlName.battle;
		}
		
		private btnToLogin():void
		{
			uiManager.instance.openCtrl(uiCtrlName.login)
		}

		private btnToPopup():void
		{
			uiManager.instance.openCtrl(uiCtrlName.popup)
		}

		protected onCreat():void
		{
			this.view.m_btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnToLogin,this);
			this.view.m_btnPopup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnToPopup,this);
		}

		protected onDestroy():void
		{
			this.view.m_btnLogin.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.btnToLogin,this);
			this.view.m_btnPopup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.btnToPopup,this);
		}

		protected onInteractive(value:boolean):void
		{
			if(value)
			{
				battleEngine.instance.start(this.view.m_gestureGroup,(id)=>{});
			}
			else
			{
				battleEngine.instance.over();
			}
		}
	}
}