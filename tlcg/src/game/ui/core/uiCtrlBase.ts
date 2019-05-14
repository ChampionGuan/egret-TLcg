namespace TLcg {
	export class uiCtrlBase {
		private _center:uiCenterBase;

		public view:uiViewBase;
		protected data:any;
		
		private _isOpen:boolean = false;
		public get isOpen():boolean
		{
			return this._isOpen;
		}

		public get isPopupBox():boolean
		{
			return false;
		}

		public get ctrlName():string
		{
			return "";
		}

		public creat(center:uiCenterBase):void
		{
			this._center = center;
			this.view = null == this.view ? this._center.getView(this.ctrlName):this.view;
			this.view.creat();

			this._center.addCtrl(this);
			this._center.addView(this);

			this.onCreat();
		}
		
		public open(data:any):void
		{
			this.data = data;
			this._isOpen = true
			this.onOpen();
			this._center.enqueue(this);
		}

		public close():void
		{
			this._center.dequeue(this);
			this.onClose();
			this._isOpen = false;
		}

		public show():void
		{
			this.onShow();
			this.setInteractive(true);
			this.view.show(true);
		}
		
		public hide():void
		{
			this.view.show(false);
			this.setInteractive(false);
			this.onHide();
		}

		public setInteractive(value:boolean):void
		{
			this.view.setInteractive(value);
			this.onInteractive(value);
		}

		public destroy():void
		{
			this._center.removeCtrl(this.ctrlName);
			this._center.removeCtrl(this.ctrlName);
			
			this.onDestroy();
			this.view.destroy();
		}

		public ntfMsg(value:string,data:any):void
		{
			if(!this.isOpen)
			{
				return;
			}
			this.onNtfMsg(value,data);
		}

		public update():void
		{
			if(!this.isOpen)
			{
				return;
			}
			this.onUpdate();
		}
		
		protected onCreat():void
		{

		}
		protected onDestroy():void
		{
			
		}

		protected onOpen():void
		{

		}
		protected onClose():void
		{

		}

		protected onShow():void
		{

		}
		protected onHide():void
		{
			
		}

		protected onInteractive(value:boolean):void
		{

		}

		protected onUpdate():void
		{

		}
		protected onNtfMsg(value:string,data:any):void
		{

		}
	}
}