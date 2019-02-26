export class Canvas {
    constructor(width, height, gridSize) {
        this._canvas = null;
        this._width = width;
        this._height = height;
        this._cxt = null;
        this._gridSize = gridSize;
        this.init();
    }

    init() {
        this._canvas = document.createElement('canvas');      
        this._canvas.width = this._width;
        this._canvas.height = this._height;
        this._canvas.setAttribute('style', `border: 1px solid #fafafa`);
        this._cxt = this._canvas.getContext('2d');
    }

    clear() {
        this._cxt.clearRect(0, 0, this._width, this._height);
    }

    get canvas() { return this._canvas; }
    get cxt() { return this._cxt; }
    get gridSize() { return this._gridSize; }
    get width() { return this._width; }
    get height() { return this._height; }

    set canvas(canvas) { this._canvas = canvas; }
    set cxt(cxt) { this._cxt = cxt; }
    set gridSize(gridSize) { this._gridSize = gridSize; }
    set width(width) { this._width = width; }
    set height(height) { this._height = height; }

}  