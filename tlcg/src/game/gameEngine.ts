namespace TLcg {
	export class gameEngine extends egret.DisplayObjectContainer implements Ibase{
	
	public constructor()
	{
		super();
		Main.instance.addChild(this);
	}

	private static _instance:gameEngine;
	public static get instance() : gameEngine {
		if(null == gameEngine._instance)
		{
			gameEngine._instance = new gameEngine();
		}
		return gameEngine._instance
	}

	public start():void
	{
        preloadManager.instance.initialize(()=>
		{
			console.log("开始游戏！");

			dataManager.instance.initialize();
			audioManager.instance.initialize();
			videoManager.instance.initialize();
			timerManager.instance.initialize();
			networkManager.instance.initialize();
			httpManager.instance.initialize();
			levelManager.instance.initialize();
			configManager.instance.initialize();
			uiManager.instance.initialize();
		});
	}

	public update():void
	{
		if(preloadManager.instance.initialized)
		{
			dataManager.instance.update();
			audioManager.instance.update();
			videoManager.instance.update();
			timerManager.instance.update();
			uiManager.instance.update();
			networkManager.instance.update();
			httpManager.instance.update();
			levelManager.instance.update();
			configManager.instance.update();
		}
	}

    public destroy():void{
		if(preloadManager.instance.initialized)
		{
			dataManager.instance.destroy();
			audioManager.instance.destroy();
			videoManager.instance.destroy();
			timerManager.instance.destroy();
			uiManager.instance.destroy();
			networkManager.instance.destroy();
			httpManager.instance.destroy();
			levelManager.instance.destroy();
			configManager.instance.destroy();
		}
		else
		{
			preloadManager.instance.destroy();
		}
	}
    
	public appFocus(focus:boolean):void{
		if(preloadManager.instance.initialized)
		{
			dataManager.instance.appFocus(focus);
			audioManager.instance.appFocus(focus);
			videoManager.instance.appFocus(focus);
			timerManager.instance.appFocus(focus);
			uiManager.instance.appFocus(focus);
			networkManager.instance.appFocus(focus);
			httpManager.instance.appFocus(focus);
			levelManager.instance.appFocus(focus);
			configManager.instance.appFocus(focus);
		}
	}
}
}