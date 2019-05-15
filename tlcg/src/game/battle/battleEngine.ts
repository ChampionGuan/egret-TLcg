namespace TLcg
{
	export class battleEngine {

		private static _instance:battleEngine;
		public static get instance() : battleEngine {
			if(null == battleEngine._instance)
			{
				battleEngine._instance = new battleEngine();
			}
			return battleEngine._instance
		}

		private isWorking:boolean = false;
		private logic:battleLogic = null;

		public start(group:eui.Group,func:Function):void
		{
			if (null == this.logic)
			{
				this.logic = new battleLogic();
			}
			this.logic.start(group,func);
			this.isWorking = true;
		}
		public over():void
		{
			this.isWorking = false;
			this.logic.over();
		}

		public pause():void
		{
			this.isWorking = false;
		}
		public resume():void
		{
			this.isWorking = true;
		}

		public update():void
		{
			if (!this.isWorking)
			{
				return;
			}
		}
	}
}