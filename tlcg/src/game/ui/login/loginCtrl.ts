namespace TLcg {
	export class loginCtrl extends uiCtrlBase {
		public view: loginView;

		public get ctrlName(): string {
			return uiCtrlName.login;
		}

		private btnToBattle(evt: egret.TouchEvent): void {
			console.log("去战斗");
			uiManager.instance.openCtrl(uiCtrlName.battle)
		}

		protected onNtfMsg(value: string, data: any): void {
			switch (value) {
				default: break;
			}
		}
		protected onCreat(): void {
			this.view.m_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnToBattle, this);
		}

		protected onDestroy(): void {
			this.view.m_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnToBattle, this.view);
		}
	}
}