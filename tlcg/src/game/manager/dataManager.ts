namespace TLcg {
	export class dataManager implements Ibase{
		public constructor() {
		}

		private static _instance:dataManager;
		public static get instance() : dataManager {
			if(null == dataManager._instance)
			{
				dataManager._instance = new dataManager();
			}
			return dataManager._instance
		}

		public initialize():void
		{
			
		}

		public update():void
		{
			
		}

		public destroy():void{

		}
		
		public appFocus(focus:boolean):void{
			
		}
	}
}