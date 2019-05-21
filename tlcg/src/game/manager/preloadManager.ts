namespace TLcg {
	export class preloadManager implements Ibase {
		public constructor() {
		}

		private static _instance: preloadManager;
		public static get instance(): preloadManager {
			if (null == preloadManager._instance) {
				preloadManager._instance = new preloadManager();
			}
			return preloadManager._instance
		}

		public initialized: boolean = false;
		public initialize(func: Function): void {
			this.initialized = false;
			this.loadResource(() => {
				func();
				this.initialized = true;
			});
		}

		public update(): void {

		}

		public destroy(): void {

		}

		public appFocus(focus: boolean): void {

		}

		private async loadResource(func: Function) {
			try {
				// config
				await RES.loadConfig("resource/default.res.json", "resource/");
				// 主题
				await this.loadTheme();
				// 资源组
				RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupProgress, this);
				await RES.loadGroup("egret", 0);
				await RES.loadGroup("config", 0);
				await RES.loadGroup("preload", 0);
				RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupProgress, this);

				func();
			}
			catch (e) {
				console.error("加载异常：" + e);
			}
		}

		private loadTheme() {
			return new Promise((resolve, reject) => {
				//加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
				let theme = new eui.Theme("resource/default.thm.json", gameEngine.instance.stage);
				theme.addEventListener(eui.UIEvent.COMPLETE, () => { resolve(); }, this);
			})
		}

		private onGroupProgress(event: RES.ResourceEvent): void {
			console.log("资源组：" + event.groupName + ",当前:" + event.itemsLoaded + ",总:" + event.itemsTotal);
		}
	}
}