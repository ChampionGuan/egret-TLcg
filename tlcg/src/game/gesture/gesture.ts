namespace TLcg {
    export class gesture {
        private config: Array<any>;
        private gestureDirIdStr: string;
        private gestureId: number;
        private gestureIdConfig: any;
        private pointsIdle: pointPool;
        private shapesIdle: shapePool;
        private isMouseDown: boolean = false;
        private touchsInfo: egret.Point[]
        private touchsInfo2: egret.Point[]

        private lineShape: egret.Shape = null;
        private lineGroup: eui.Group = null;
        private gestureCallback: Function = null;

        private static _instance: gesture;
        public static get instance(): gesture {
            if (null == gesture._instance) {
                gesture._instance = new gesture();
            }
            return gesture._instance
        }

        public Initialize(config: Array<any>): void {
            if (null == config) {
                return;
            }
            if (null == this.pointsIdle) {
                this.pointsIdle = new pointPool();
            }
            if (null == this.shapesIdle) {
                this.shapesIdle = new shapePool();
            }
            this.config = config;
        }

        public Start(group: eui.Group, func: Function): void {
            this.lineGroup = group;
            this.lineShape = this.shapesIdle.get(group);
            this.gestureCallback = func;
            this.isMouseDown = false;
            this.lineGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
            this.lineGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            this.lineGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
            this.lineGroup.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.mouseUp, this);
        }

        public End(): void {
            this.lineGroup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
            this.lineGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            this.lineGroup.removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
            this.lineGroup.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.mouseUp, this);
            this.shapesIdle.back(this.lineShape);
            this.lineShape = null;
            this.lineGroup = null;
        }

        private mouseDown(value: egret.TouchEvent): void {
            if (this.isMouseDown) {
                return;
            }
            this.isMouseDown = true;
            this.lineShape.graphics.clear();
            this.lineShape.graphics.lineStyle(8, 0xFFFFFF);
            this.touchsInfo = [];
            this.touchsInfo2 = [];

            let point1 = this.pointsIdle.get(value.stageX, value.stageY);
            let point2 = this.pointsIdle.get(value.stageX, value.stageY);
            this.touchsInfo.push(point1);
            this.touchsInfo2.push(point2);
            this.lineShape.graphics.moveTo(point1.x, point1.y);
        }
        private mouseMove(value: egret.TouchEvent): void {
            if (!this.isMouseDown) {
                return;
            }
            let point1 = this.pointsIdle.get(value.stageX, value.stageY);
            let point2 = this.pointsIdle.get(value.stageX, value.stageY);
            this.touchsInfo.push(point1);
            this.touchsInfo2.push(point2);
            this.lineShape.graphics.lineTo(point1.x, point1.y);
        }
        private mouseUp(value: egret.TouchEvent): void {
            if (!this.isMouseDown) {
                return;
            }
            let point1 = this.pointsIdle.get(value.stageX, value.stageY);
            let point2 = this.pointsIdle.get(value.stageX, value.stageY);
            this.touchsInfo.push(point1);
            this.touchsInfo2.push(point2);
            this.lineShape.graphics.clear();
            this.isMouseDown = false;

            this.handleTouchsInfo();
        }

        private handleTouchsInfo(): void {
            this.distanceCheck();
            this.directionCheck();
            this.gestureIdCheck();
            this.gestrueTailing();
        }
        private distanceCheck(): void {
            let array: egret.Point[] = [];
            let length: number = this.touchsInfo.length;
            let index: number = 0;
            array.push(this.touchsInfo[index]);
            for (let i: number = 0; i < length; i++) {
                if (egret.Point.distance(this.touchsInfo[index], this.touchsInfo[i]) > 40) {
                    index = i;
                    array.push(this.touchsInfo[index]);
                }
                this.pointsIdle.back(this.touchsInfo[i]);
            }
            this.touchsInfo = array;
        }
        private directionCheck(): void {
            let len: number = this.touchsInfo.length;
            let p1: egret.Point = null;
            let p2: egret.Point = null;
            let v1: number = null;
            let v2: number = null;
            let angle: number = null;
            let quad: number = null;
            let dirIdPre: string = "";
            let dirIdCur: string = "";
            let dirIdStr: string = "";
            for (let i: number = 0; i < len; i++) {
                if (this.touchsInfo[i + 1]) {
                    p1 = this.touchsInfo[i];
                    p2 = this.touchsInfo[i + 1];
                    v1 = p1.y - p2.y;
                    v2 = egret.Point.distance(p1, p2);
                    // 正弦sin=对边比斜边  余弦cos=邻边比斜边  正切tan=对边比邻边
                    // rad * 180/Math.PI 直接求常量，优化
                    angle = Number((Math.asin(v1 / v2) * 57.2957800).toFixed(1));
                    quad = this.getQuadrant(p1, p2);
                    dirIdCur = this.getIdByAngQuad(angle, quad).toString();
                    if (dirIdCur != dirIdPre) {
                        dirIdPre = dirIdCur;
                        dirIdStr += dirIdCur;
                    }
                }
            }
            this.gestureDirIdStr = dirIdStr;
            console.log("手势编码串：" + this.gestureDirIdStr);
        }
        private gestureIdCheck(): void {
            this.gestureId = -1;
            this.gestureIdConfig = null;
            var max: number = -1;
            var len: number = this.config.length;
            let len1: number;
            for (var i: number = 0; i < len; i++) {
                len1 = this.config[i].data.length;
                for (var m: number = 0; m < len1; m++) {
                    var val: number = this.levenshteinDistancePercent(this.config[i].data[m], this.gestureDirIdStr);
                    if (val > max) {
                        max = val;
                        this.gestureIdConfig = this.config[i];
                        this.gestureId = this.config[i].id;
                    }
                }
            }

            if (max < 0.4) {
                this.gestureId = -1;
                this.gestureIdConfig = null;
            }
            console.log("手势类型id：" + this.gestureId);
            if (this.gestureId == -1) {
                return;
            }
            if (null != this.gestureCallback) {
                this.gestureCallback(this.gestureId)
            }
        }
        private gestrueTailing(): void {
            let shape: egret.Shape;
            if (null != this.gestureIdConfig) {
                shape = this.shapesIdle.get(this.lineGroup);
                shape.graphics.lineStyle(8, this.gestureIdConfig.color);
                shape.graphics.moveTo(this.touchsInfo2[0].x, this.touchsInfo2[0].y)
                this.pointsIdle.back(this.touchsInfo2[0])
            }
            for (let i: number = 1; i < this.touchsInfo2.length; i++) {
                if (null != shape) {
                    shape.graphics.lineTo(this.touchsInfo2[i].x, this.touchsInfo2[i].y);
                }
                this.pointsIdle.back(this.touchsInfo2[i])
            }
            if (null != shape) {
                timerManager.instance.newTimer(0.5, 1, false, null, null, () => {
                    this.shapesIdle.back(shape);
                });
            }
        }
        /*
        计算两点关系所形成的象限
        以P1 作为坐标原点，P2为设定点，判断P2相对于P1时所在象限
                |
            3   |    4
                |
        ------------------
                |
            2   |    1
                |
        */
        private getQuadrant(p1: egret.Point, p2: egret.Point): number {
            if (p2.x >= p1.x) {
                if (p2.y <= p1.y) {
                    return 1;
                }
                else {
                    return 4;
                }
            }
            else {
                if (p2.y <= p1.y) {
                    return 2;
                }
                else {
                    return 3;
                }
            }
        }
        /*
        根据所在象限与角度计算出方向编号。
        方向编号，以第一象限0度为基础，按照顺时针方向，将圆等分为8份。
        顺时针方向 0 - 360
        8: 22.5 - 67.6
        7: 67.5 - 112.5
        6: 112.5 - 157.5
        5: 157.5 - 202.5
        4: 202.5 - 247.5
        3: 247.5 - 292.5
        2: 292.5 - 337.5
        1：337.5 - 22.5
        */
        private getIdByAngQuad(ang: number, quad: number): number {
            switch (quad) {
                case 1:
                    if (ang <= 22.5 && ang >= 0) {
                        return 1;
                    }
                    else if (ang <= 67.5 && ang > 22.5) {
                        return 8;
                    }
                    else {
                        return 7;
                    }
                case 2:
                    if (ang <= 22.5 && ang >= 0) {
                        return 5;
                    }
                    else if (ang <= 67.5 && ang > 22.5) {
                        return 6;
                    }
                    else {
                        return 7;
                    }
                case 3:
                    if (ang <= -67.5 && ang >= -90) {
                        return 3;
                    }
                    else if (ang <= -22.5 && ang > -67.5) {
                        return 4;
                    }
                    else {
                        return 5;
                    }
                case 4:
                    if (ang <= -67.5 && ang >= -90) {
                        return 3;
                    }
                    else if (ang <= -22.5 && ang > -67.5) {
                        return 2;
                    }
                    else {
                        return 1;
                    }
            }
        }
        // 编辑距离算法（模糊匹配）
        private levenshteinDistancePercent(s, t): number {

            var l = s.length > t.length ? s.length : t.length;
            var d = this.levenshteinDistanceValue(s, t);
            return 1 - d / l;//.toFixed(4);
        }
        private levenshteinDistanceValue(s, t) {
            var n = s.length;// length of s
            var m = t.length;// length of t
            var d = [];// matrix
            var i;// iterates through s
            var j;// iterates through t
            var s_i;// ith character of s
            var t_j;// jth character of t
            var cost;// cost

            // Step 1
            if (n == 0) return m;
            if (m == 0) return n;

            // Step 2
            for (i = 0; i <= n; i++) {
                d[i] = [];
                d[i][0] = i;
            }
            for (j = 0; j <= m; j++) {
                d[0][j] = j;
            }

            // Step 3

            for (i = 1; i <= n; i++) {
                s_i = s.charAt(i - 1);
                // Step 4
                for (j = 1; j <= m; j++) {
                    t_j = t.charAt(j - 1);
                    // Step 5
                    if (s_i == t_j) {
                        cost = 0;
                    } else {
                        cost = 1;
                    }

                    // Step 6
                    //（左，左上，上三个值取最小）+ 花销
                    d[i][j] = this.minimum(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
                }
            }

            // Step 7
            return d[n][m];
        }
        private minimum(a, b, c) {
            return a < b ? (a < c ? a : c) : (b < c ? b : c);
        }
    }
    export class pointPool {
        private points: Array<egret.Point> = new Array<egret.Point>();

        public get(x: number, y: number): egret.Point {
            let p = this.points.pop();
            if (null == p) {
                p = new egret.Point(x, y);
            }
            else {
                p.setTo(x, y);
            }
            return p;
        }
        public back(p: egret.Point) {
            if (null == p) {
                return;
            }
            this.points.push(p);
        }
    }
    export class shapePool {
        private shapes: Array<egret.Shape> = new Array<egret.Shape>();

        public get(parent: eui.Group): egret.Shape {
            let p = this.shapes.pop();
            if (null == p) {
                p = new egret.Shape();
            }
            if (null != parent) {
                parent.addChild(p);
            }
            return p;
        }
        public back(p: egret.Shape) {
            if (null == p) {
                return;
            }
            p.graphics.clear();
            this.shapes.push(p);
        }
    }
}