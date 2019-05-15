 namespace TLcg {
	export class battleView extends uiViewBase {
		public m_btnLogin:eui.Button;
		public m_btnPopup:eui.Button;
		public m_gestureGroup:eui.Group;

		public constructor()
		{
			super();
			this.skinName = uiSkipName.battle
		}
	}
 }