namespace TLcg {
	export class configManager implements Ibase {
		public constructor() {
		}

		private static _instance: configManager;
		public static get instance(): configManager {
			if (null == configManager._instance) {
				configManager._instance = new configManager();
			}
			return configManager._instance
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