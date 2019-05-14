namespace TLcg {
	export class gameManager implements Ibase{
	public constructor() {
	}

	private static _instance:gameManager;
	public static get instance() : gameManager {
		if(null == gameManager._instance)
		{
			gameManager._instance = new gameManager();
		}
		return gameManager._instance
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