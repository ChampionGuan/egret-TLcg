namespace TLcg {
	export class networkManager implements Ibase{
	public constructor() {
	}

	private static _instance:networkManager;
	public static get instance() : networkManager {
		if(null == networkManager._instance)
		{
			networkManager._instance = new networkManager();
		}
		return networkManager._instance
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