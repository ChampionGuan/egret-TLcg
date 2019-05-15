namespace TLcg {

    export interface Ibase
    {
        update():void;
        destroy():void;
        appFocus(focus:boolean):void;
    }

    // 单例
    export class singleton<T> {
        private static _instance: any = null;
        public static getInstance<T>(type: { new(): T}){
            if (this._instance === null) {
                this._instance = new type();
            }
            return this._instance;
        } 
    }

    // 队列
    export class Queue<T> {

        private elements: Array<T>;
        private _size: number | undefined;

        public constructor(capacity?: number) {
            this.elements = new Array<T>();
            this._size = capacity;
        }

        public push(o: T) {
            if (o == null) {
                return false;
            }
            //如果传递了size参数就设置了队列的大小
            if (this._size != undefined && !isNaN(this._size)) {
                if (this.elements.length == this._size) {
                    this.pop();
                }
            }
            this.elements.unshift(o);
            return true;
        }

        public pop(): T {
            return this.elements.pop();
        }

        public size(): number {
            return this.elements.length;
        }

        public empty(): boolean {
            return this.size() == 0;
        }

        public clear() {
            delete this.elements;
            this.elements = new Array<T>();
            this._size = 0;
        }
    }

    // 栈
    export class Stack<T> {
            
        private elements:Array<T>;
        private _size:number;
        
        public constructor(capacity:number = 10){
            this.elements = new Array<T>(capacity);
            this._size = 0;
        }

        public push(o:T){
            var len = this.elements.length;
            if(this._size >= len){
                let temp = new Array<T>(len);
                this.elements=this.elements.concat(temp);
            }
            this.elements[this._size++]=o;
        }

        public pop():T{
            return this.elements[--this._size];
        }

        public peek():T{
            return this.elements[this._size-1];
        }

        public size():number{
            return this._size;
        }
        
        public empty():boolean{
            return this._size==0;
        }

        public clear(capacity:number = 10){
            delete this.elements;
            this.elements = new Array(capacity);
            this._size = 0;
        }
    }

    // 集合
    export class List<T> {
        private elements:Array<T> = [];
        private _size: number;

        public constructor(capacity:number = 10){
            this.elements = new Array<T>(capacity);
            this._size = 0;
        }

        public get(v:number):T
        {
            return this.elements[v];
        }

        public add(o:T){
            var len = this.elements.length;
            if(this._size >= len){
                let temp = new Array<T>(len);
                this.elements=this.elements.concat(temp);
            }
            this.elements[this._size++]=o;
        }

        public remove(o:T){
            let index:number = this.indexOf(o);
            if(index < 0){
                return
            }
            delete this.elements[index];
            for(let i:number = index ;i<this._size;i++)
            {
                if(this.elements[i+1])
                {
                    this.elements[i] = this.elements[i+1]
                }
            }
            this._size--;
        }

        public indexOf(o:T):number{
            return this.elements.indexOf(o);
        }

        public size():number{
            return this._size;
        }

        public empty():boolean{
            return this._size==0;
        }

        public clear(){
            delete this.elements;
            this.elements = new Array<T>();;
            this._size = 0;
        }
    }

    export class Bezier
    {
        private s:egret.Point;
        private e:egret.Point;
        private m:egret.Point;
        private r:egret.Point;
        private dis:number;

        private clear():void
        {
            this.dis = 0;
            this.s.setTo(0,0);
            this.e.setTo(0,0);
            this.m.setTo(0,0);
            this.r.setTo(0,0);
        }
        public setBezierPoints(s:egret.Point,e:egret.Point,factor:number):void
        {
            this.clear();

            this.dis = egret.Point.distance(s,e);
            this.s = s;
            this.e = e;
            this.m.setTo(0.5*(s.x+e.x),0.5*(s.y+e.y) + this.dis*factor);
        }
        public setLinePoints(s:egret.Point,e:egret.Point)
        {
            this.clear();

            this.dis = 0;
            this.s = s;
            this.e = e;
            this.m.setTo(0.5*(s.x + e.x),0.5*(s.y+e.y))
        }
        public getPointAtTime(v:number)
        {
            v = v > 1? 1:v;
            v = v < 0? 0:v;

            this.r.x = v * v * (this.e.x - 2*this.m.x + this.s.x) + this.s.x + 2 * v * (this.m.x - this.s.x);
            this.r.y = v * v * (this.e.y - 2*this.m.y + this.s.y) + this.s.y + 2 * v * (this.m.y - this.s.y);

            return this.r;
        }
    }
}