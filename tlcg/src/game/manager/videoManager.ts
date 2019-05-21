namespace TLcg {
	export class videoManager implements Ibase {
		public constructor() {
		}

		private static _instance: videoManager;
		public static get instance(): videoManager {
			if (null == videoManager._instance) {
				videoManager._instance = new videoManager();
			}
			return videoManager._instance
		}

		public initialize(): void {

		}

		public update(): void {

		}

		public destroy(): void {

		}

		public appFocus(focus: boolean): void {

		}
	}
}