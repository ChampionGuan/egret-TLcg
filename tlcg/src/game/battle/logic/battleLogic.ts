namespace TLcg
{
	export class battleLogic {
		public constructor() {
		}

		private gesture:gesture;

		private initGestrue():void
		{
			if(null != this.gesture)
			{
				return;
			}
			this.gesture = new gesture();
			this.gesture.Initialize(RES.getRes("gesture_json"));
		}

		public start(group:eui.Group,func:Function):void
		{
			this.initGestrue();
			this.gesture.Start(group,func);
		}
		public over():void
		{

		}
	}
}