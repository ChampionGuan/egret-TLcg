namespace TLcg {
	export class battleCtrl extends uiCtrlBase {
		public view:battleView;
		
		public get ctrlName():string
		{
			return uiCtrlName.battle;
		}
		
		private gesture:gesture;

		private btnToLogin():void
		{
			uiManager.instance.openCtrl(uiCtrlName.login)
		}

		private btnToPopup():void
		{
			uiManager.instance.openCtrl(uiCtrlName.popup)
		}

		private initGestrue():void
		{
			if(null != this.gesture)
			{
				return;
			}
			this.gesture = new gesture();
			this.gesture.Initialize(RES.getRes("gesture_json"));
		}

		protected onCreat():void
		{
			this.view.m_btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnToLogin,this);
			this.view.m_btnPopup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnToPopup,this);

			this.initGestrue();
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
				this.gesture.Start(this.view.m_gestureShape,this.view.m_gestureGroup);
			}
			else
			{
				this.gesture.End();
			}
		}
	}
}