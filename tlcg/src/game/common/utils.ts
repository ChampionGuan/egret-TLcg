namespace TLcg {
    export class utils 
    {
        static createShape(x,y,width,height):egret.Shape{
            let shape = new egret.Shape();
            shape.graphics.beginFill(0x000000, 1);
            shape.graphics.drawRect(x,y,width,height);
            shape.graphics.endFill();
            return shape;
        }
        /**
         * 创建文本
         * @param str   显示的内容
         * @param x,y   文本的位置
         * @param size  文本的大小(默认24)
         * @param color 文本的颜色(默认白色)
         */
        static createText(str:string, x:number, y:number, size:number = 24, color:number = 0xFFFFFF):egret.TextField{
            let text  = new egret.TextField();
            text.text = str;
            text.x    = x;
            text.y    = y;
            text.size = size;
            text.textColor = color;
            return text;
        }
        /**
         * 创建位图
         * @param name  位图的ID
         */
        static createBitmap(name:string):egret.Bitmap {
            let bitMap = new egret.Bitmap();
            let texture:egret.Texture = RES.getRes(name);
            bitMap.texture = texture;
            return bitMap;
        }
        /**
         * 创建位图字体
         */
        static createBitmapText(name:string, parent:any = null):egret.BitmapText {
            let bitmapText:egret.BitmapText = new egret.BitmapText();
            let font = RES.getRes(name);
            bitmapText.font = font;
            if (parent) parent.addChild(bitmapText);
            return bitmapText;
        }
        /**得到圆角矩形*/
        static getRoundRect(w:number,h:number,c:number=0,ew:number=5,eh:number=5,x:number=0,y:number=0):egret.Sprite
        {
            var s:egret.Sprite=new egret.Sprite()
            s.graphics.beginFill(c);
            s.graphics.drawRoundRect(x,y,w,h,ew,eh);
            s.graphics.endFill();
            return s;
        }
        /**得到圆形*/
        static getCircle(r:number,c:number=0,x:number=0,y:number=0):egret.Sprite
        {
            var s:egret.Sprite=new egret.Sprite();
            s.graphics.beginFill(c);
            s.graphics.drawCircle(x,y,r);
            s.graphics.endFill();
            return s;
        }
        /**得到矩形*/
        static getRect(w:number,h:number,c:number=0,x:number=0,y:number=0):egret.Sprite
        {
            var s:egret.Sprite=new egret.Sprite()
            s.graphics.beginFill(c);
            s.graphics.drawRect(x,y,w,h);
            s.graphics.endFill();
            return s;
        }
        /**
         * 深复制对象方法
         */
        static cloneObj(obj) {  
            var newObj = {};  
            if (obj instanceof Array) {  
                newObj = [];  
            }  
            for (var key in obj) {  
                var val = obj[key];    
                newObj[key] = typeof val === 'object' ? utils.cloneObj(val): val;  
            }  
            return newObj;  
        }
        /**获取从n~m之间的随机数
        * 没有参数(0~1) 一个参数n(0~n的整数) 两个参数m,n(m~n的整数)
        */
        static getRandom(...args:any[]) {
            let argsLen:number = args.length;
            let random:number;
            switch (argsLen) {
                case 0:
                    random = Math.random();
                break;
                case 1:
                    random = Math.floor((args[0] + 1)*Math.random());
                break;
                default:
                    random = Math.floor(Math.random()*(args[1]-args[0]+1) + args[0]);
                break;
            }
            return random;
        }
        /**
         * 获取两点间距离
         * @param p1X
         * @param p1Y
         * @param p2X
         * @param p2Y
         * @returns {number}
         */
        static getDistance(p1X:number, p1Y:number, p2X:number, p2Y:number):number {
            var disX:number = Math.round(p2X - p1X);
            var disY:number = Math.round(p2Y - p1Y);
            var disQ:number = disX * disX + disY * disY;
            var temp:number = utils.InvSqrt(disQ);
            var dis:number = 1/temp;
            return Math.floor(dis);
        }
        /**
         * 平方根倒数
         */
        static InvSqrt(n:number, precision:number = 1) {
            let y = new Float32Array(1);
            let i = new Int32Array(y.buffer);
            y[0] = n;
            i[0] = 0x5f375a86 - (i[0] >> 1);
            for (let iter = 0; iter < precision; iter ++) {
                y[0] = y[0] * (1.5 - ((n * 0.5) * y[0] * y[0]));
            }
            return y[0];
        }
        /**
         * 弧度制转换为角度值
         * @param radian 弧度制
         * @returns {number}
         */
        static getAngle(radian:number):number {
            return 180 * radian / Math.PI;
        }
        /**
         * 角度值转换为弧度制
         * @param angle
         */
        static getRadian(angle:number):number {
            return angle / 180 * Math.PI;
        }
        /**
         * 获取两点间弧度
         * @param p1X
         * @param p1Y
         * @param p2X
         * @param p2Y
         * @returns {number}
         */
        static getRadianByPoints(p1X:number, p1Y:number, p2X:number, p2Y:number):number {
            var xdis:number = Math.round(p2X - p1X);
            var ydis:number = Math.round(p2Y - p1Y);
            var tmp_angle:number = Math.atan2(ydis, xdis);
            var angle = parseFloat(tmp_angle.toFixed(2));
            return angle;
        }
    }
}