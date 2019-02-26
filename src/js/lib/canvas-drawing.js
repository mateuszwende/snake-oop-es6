export class CanvasDrawing {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

     set x(x) { this._x = x; }
     set y(y) { this._y = y; }
 
     get x() { return this._x; }
     get y() { return this._y; }
}