namespace TLcg {
	export class popupCtrl extends uiCtrlBase {
		public view:popupView;
		
		public get isPopupBox():boolean
		{
			return true;
		}

		public get ctrlName():string
		{
			return uiCtrlName.popup;
		}

		private btnBack():void
		{
			this.close();
		}
		
		protected onCreat():void
		{
			this.view.m_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnBack,this);
		}

		protected onDestroy():void
		{
			this.view.m_back.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.btnBack,this);
		}
	}
}