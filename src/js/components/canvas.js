export class Canvas {
    constructor(width, height, gridSize) {
        this.canvas = null;
        this.width = width;
        this.height = height;
        this.cxt = null;
        this.gridSize = gridSize;
        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');      
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.setAttribute('style', `border: 1px solid #fafafa`);
        this.cxt = this.canvas.getContext('2d');
    }

    clear() {
        this.cxt.clearRect(0, 0, this.width, this.height);
    }
}  