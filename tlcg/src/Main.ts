class Main extends eui.UILayer {

    public static instance: Main;

    protected createChildren(): void {
        Main.instance = this;
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            context.onUpdate = this.update;
        })

        egret.lifecycle.onPause = () => {
            this.appFocus(false);
        }

        egret.lifecycle.onResume = () => {
            this.appFocus(true);
        }

        //注入自定义的素材解析器
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.startGame();
    }

    public startGame(): void {
        TLcg.gameEngine.instance.start();
    }

    public update(): void {
        TLcg.gameEngine.instance.update();
    }

    public destroy(): void {
        TLcg.gameEngine.instance.destroy();
    }

    public appFocus(focus: boolean): void {
        TLcg.gameEngine.instance.appFocus(focus);
        // 是否进入后台
        if (focus) {
            // 恢复渲染和心跳
            egret.ticker.resume();
        }
        else {
            egret.ticker.pause();
        }
    }
}