namespace TLcg {
	export class levelManager implements Ibase {
		public constructor() {
		}

		private static _instance: levelManager;
		public static get instance(): levelManager {
			if (null == levelManager._instance) {
				levelManager._instance = new levelManager();
			}
			return levelManager._instance
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