namespace TLcg {
	export class timerManager implements Ibase {
		public constructor() {
		}

		private static _instance: timerManager;
		public static get instance(): timerManager {
			if (null == timerManager._instance) {
				timerManager._instance = new timerManager();
			}
			return timerManager._instance
		}

		private static _deltaTime: number;
		public static get deltaTime(): number {
			return this._deltaTime;
		}

		private _timrCenter: TimerCenter;
		private _lastTime: number;

		public initialize(): void {
			this._lastTime = egret.getTimer();
			this._timrCenter = new TimerCenter();
			timerManager._deltaTime = egret.getTimer() - this._lastTime;
		}

		public newTimer(maxCd: number, tickDuration: number, isCycle: boolean, funcStart: Function, funcUpdate: Function, funcComplete: Function): number {
			return this._timrCenter.get(maxCd, tickDuration, isCycle, funcStart, funcUpdate, funcComplete);;
		}
		public addCd(insId: number, value: number): boolean {
			return this._timrCenter.addCd(insId, value);
		}
		public disposeTimer(insId: number): void {
			this._timrCenter.disposeTimer(insId);
		}
		public disposeAllTimer(): void {
			this._timrCenter.disposeAllTimer();
		}

		public update(): void {
			this._timrCenter.ticker();
		}

		public destroy(): void {
		}

		public appFocus(focus: boolean): void {
		}
	}
}