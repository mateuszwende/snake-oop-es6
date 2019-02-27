import { CanvasDrawing } from '../lib/canvas-drawing';
import { getRandomInt } from '../lib/utils';

export class Apple extends CanvasDrawing {
    constructor(x, y) {
        super(x, y)
        this.color = 'red';
    }

    draw(canvas) {
        canvas.cxt.fillStyle = this.color;
        canvas.cxt.fillRect(this.x, this.y, canvas.gridSize - 1, canvas.gridSize - 1);
    }

    update(canvas) {
        this.draw(canvas);
    }

    reset(canvas, snake) {
        this.x = getRandomInt(0, canvas.width / canvas.gridSize) * canvas.gridSize;
        this.y = getRandomInt(0, canvas.width / canvas.gridSize) * canvas.gridSize;
        
        for (let i = 0; i < snake.parts.length; i++) {
            if (this.samePositionAs(snake.parts[i])) {
                this.reset(canvas, snake);
            }
        }
    }

    samePositionAs(snakePart) {
        return (
            this.x === snakePart.x && this.y === snakePart.y ? true : false
        );
    }
}