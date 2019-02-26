import { CanvasDrawing } from '../lib/canvas-drawing';
import { getRandomInt } from '../lib/utils';

export class Apple extends CanvasDrawing {
    constructor(x, y) {
        super(x, y)
        this._color = 'red';
    }

    draw(canvas) {
        canvas.cxt.fillStyle = this._color;
        canvas.cxt.fillRect(this._x, this._y, canvas.gridSize - 1, canvas.gridSize - 1);
    }

    update(canvas) {
        this.draw(canvas);
    }

    reset(canvas) {
        this._x = getRandomInt(0, canvas.width / canvas.gridSize) * canvas.gridSize;
        this._y = getRandomInt(0, canvas.width / canvas.gridSize) * canvas.gridSize;
    }
}