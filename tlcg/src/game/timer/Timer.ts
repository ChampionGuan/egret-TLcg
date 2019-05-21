namespace TLcg {
	export class Timer {
		static index: number = 0;

		public insId: number = 0;
		public isIdle: boolean = true;

		private onStart: Function;
		private onUpdate: Function;
		private onComplete: Function;

		private isCycle: boolean;
		private tickValue: number;
		private tickDuration: number;
		private curCd: number;
		private maxCd: number;

		private invokeStart(): void {
			if (null != this.onStart) {
				this.onStart();
			}
		}
		private invokeUpdate(): void {
			if (null == this.onUpdate) {
				return;
			}
			this.tickValue -= timerManager.deltaTime;
			if (this.tickValue > 0) {
				return;
			}
			this.tickValue = this.tickDuration;
			this.onUpdate(this.curCd, this.maxCd);
		}
		private invokeComplete(): void {
			if (null != this.onComplete) {
				this.onComplete();
			}
		}
		public init(maxCd: number, tickDuration: number, isCycle: boolean, funcStart: Function, funcUpdate: Function, funcComplete: Function): void {
			Timer.index++;
			this.insId = Timer.index;
			this.tickValue = 0;
			this.tickDuration = tickDuration;
			this.curCd = maxCd;
			this.maxCd = maxCd;
			this.onStart = funcStart;
			this.onUpdate = funcUpdate;
			this.onComplete = funcComplete;
			this.isIdle = false;

			this.invokeStart();
		}

		public addCd(value: number) {
			this.tickValue = 0;
			this.maxCd += value;
			this.curCd += value;
		}

		public ticker(): void {
			this.curCd -= timerManager.deltaTime
			if (this.curCd >= 0) {
				this.invokeUpdate();
				return;
			}
			this.invokeComplete();

			if (!this.isCycle) {
				this.dispose();
			}
			else {
				this.curCd = this.maxCd;
			}
		}
		public dispose(): void {
			this.onStart = null;
			this.onUpdate = null;
			this.onComplete = null;
			this.isCycle = false;
			this.isIdle = true;
		}
	}
	export class TimerCenter {
		private idle: Array<Timer> = new Array<Timer>();
		private using: { [key: number]: Timer } = {};

		public get(maxCd: number, tickDuration: number, isCycle: boolean, funcStart: Function, funcUpdate: Function, funcComplete: Function): number {
			let t: Timer = this.idle.pop();
			if (null == t) {
				t = new Timer();
			}
			t.init(maxCd, tickDuration, isCycle, funcStart, funcUpdate, funcComplete);
			this.using[t.insId] = t;

			return t.insId;
		}
		public addCd(insId: number, value: number): boolean {
			let t: Timer = this.using[insId];
			if (null == t) {
				return false;
			}
			t.addCd(value);

			return true
		}
		public disposeTimer(insId: number): void {
			let t: Timer = this.using[insId];
			if (null == t) {
				return;
			}
			t.dispose();
		}
		public disposeAllTimer(): void {
			for (let k in this.using) {
				this.using[k].dispose();
			}
		}
		public ticker(): void {
			let t: Timer;
			for (let k in this.using) {
				t = this.using[k];
				if (!t) {
					continue;
				}
				t.ticker();
				if (t.isIdle) {
					this.idle.push(t);
					delete this.using[k];
					this.using[k] = null;
				}
			}
		}
	}
}
