 namespace TLcg {
	export class battleView extends uiViewBase {
		public m_btnLogin:eui.Button;
		public m_btnPopup:eui.Button;
		public m_gestureGroup:eui.Group;
		public m_gestureShape:egret.Shape;

		public constructor()
		{
			super();
			this.skinName = uiSkipName.battle
			this.m_gestureShape = new egret.Shape()
			this.addChild(this.m_gestureShape);
		}
	}
 }