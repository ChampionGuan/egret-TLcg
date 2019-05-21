namespace TLcg {
	export class audioManager implements Ibase {
		public constructor() {
		}

		private static _instance: audioManager;
		public static get instance(): audioManager {
			if (null == audioManager._instance) {
				audioManager._instance = new audioManager();
			}
			return audioManager._instance
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