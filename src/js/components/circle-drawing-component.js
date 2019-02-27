import { DrawingComponent } from '../lib/drawing-component';

export class CircleDrawingComponent extends DrawingComponent {
    constructor(canvas) {
        super();
        
        this.ctx = canvas.element.getContext('2d');
        this.strokeColor = slot.color;
        this.update();
    }

    update() {
        this.ctx.beginPath();
        this.ctx.arc(this._x, this._y, this._width / 2, 0, 2 * Math.PI);
        this.ctx.fillStyle = this._color;
        this.ctx.fill();
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.stroke();
    }
}