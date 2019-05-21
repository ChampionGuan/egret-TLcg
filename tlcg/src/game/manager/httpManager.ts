namespace TLcg {
	export class httpManager implements Ibase {
		public constructor() {
		}

		private static _instance: httpManager;
		public static get instance(): httpManager {
			if (null == httpManager._instance) {
				httpManager._instance = new httpManager();
			}
			return httpManager._instance
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