import { CanvasDrawing } from '../lib/canvas-drawing';

export class Snake extends CanvasDrawing {
    constructor(x, y, dx, dy, length) {
        super(x, y);
        this._dx = dx;
        this._dy = dy;
        this._length = length;
        this._parts = [];
        this._color = 'green';
    }

    update(canvas, apple) {
        this.move(canvas);
        this.draw(canvas, apple);
    }

    wrap(canvas) {
        this.wrapHorizontally(canvas);
        this.wrapVertically(canvas);
    }

    draw(canvas, apple) {
        canvas.cxt.fillStyle = this._color;
        this._parts.forEach((part, index) => {   
            canvas.cxt.fillRect(part.x, part.y, canvas.gridSize - 1, canvas.gridSize - 1);  
            
            if (this.ateApple(part, apple)) {   
                this._length++;
                apple.reset(canvas);
            }
            
            for (let i = index + 1; i < this._parts.length; i++) {
                if (this.occupiedItself(part, this._parts[i])) {
                    this.reset(canvas); 
                    apple.reset(canvas);        
                }
            }
        });
    }

    reset(canvas) {
        this._x = 160;
        this._y = 160;
        this._parts = [];
        this._length = 4;
        this._dx = canvas.gridSize;
        this._dy = 0;
    }

    move(canvas) {
        this._x += this._dx;
        this._y += this._dy;
        this.wrap(canvas);
        this._parts.unshift({x: this._x, y: this._y});
        
        if (this._parts.length > this._length) {
            this._parts.pop();
        }   
    }

    wrapHorizontally(canvas) {
        if (this._x < 0) {
            this._x = canvas.width - canvas.gridSize;
        }
        else if (this._x >= canvas.width) {
            this._x = 0;
        }
    }

    wrapVertically(canvas) {
        if (this._y < 0) {
            this._y = canvas.height - canvas.gridSize;
        }
        else if (this._y >= canvas.height) {
            this._y = 0;
        }
    }

    ateApple(part, apple) {
        return part.x === apple.x && part.y === apple.y;
    }

    occupiedItself(currPart, nextPart) {
        return currPart.x === nextPart.x && currPart.y === nextPart.y
    }

    addEventListeners(canvas) {
      document.addEventListener('keydown', e => {
            if (e.which === 37 && this._dx === 0) {
                this._dx = -canvas.gridSize;
                this._dy = 0;
            }
            else if (e.which === 38 && this._dy === 0) {
                this._dy = -canvas.gridSize;
                this._dx = 0;
            }
            else if (e.which === 39 && this._dx === 0) {
                this._dx = canvas.gridSize;
                this._dy = 0;
            }
            else if (e.which === 40 && this._dy === 0) {
                this._dy = canvas.gridSize;
                this._dx = 0;
            }
        });
    }


    get dx() { return this._dx; }
    get dy() { return this._dy; }
    get parts() { return this._parts; }

    set dx(x) { this._dx = dx; }
    set dy(y) { this._dy = dy; }
    set parts(parts) { this._parts = parts; }
}
