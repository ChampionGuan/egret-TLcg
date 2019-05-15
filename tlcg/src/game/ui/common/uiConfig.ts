namespace TLcg {
	export class uiConfig 
	{
	}
	export class uiCtrlName
	{
		public static login:string = "loginCtrl";
		public static battle:string = "battleCtrl";
		public static popup:string = "popupCtrl";
	}
	export class uiSkipName
	{
		public static login:string = "resource/skins/login.exml";
		public static battle:string = "resource/skins/battle.exml";
		public static popup:string = "resource/skins/popup.exml";
	}
	export class uiEventType
	{
		public static loginComplete:string = "loginComplete";
	}
    export var uiColors = {
        white: 0xFFFFFF,//白色
        milkWhite: 0xefe8c0,//乳白色 
        grayWhite: 0xceb6a2,//灰白色
        yellow: 0xffff00,//金黄色 
        lightYellow: 0xffd375,//淡黄色
        orangeYellow: 0xff9900,//橘黄色//道具名称 //玩家姓名
        red: 0xa52d1c,//红色
        green: 0x00e500,//绿色 
        blue: 0x1a94d7,//蓝色 
        grayBlue: 0x2f5177,//墨蓝色 
        purple: 0xe938f2,//紫色 
        pink: 0xFF3030,//粉色 
        black: 0x2e2d2d,//黑色
        golden: 0xFFD700, //金色
        lvNotFull: 0x6f685d, //等级未满
        lvFull: 0x91bd32, //等级已满
    }
    export var uiLabelFontSize = {
        little: 12,//小型字体大小
        middle: 18,//中型字体大小
        normal: 24,//正常字体大小
        big: 36//大型字体大小
    }
}