import { CanvasDrawing } from '../lib/canvas-drawing';

export class Snake extends CanvasDrawing {
    constructor(x, y, dx, dy, length) {
        super(x, y);
        this.dx = dx;
        this.dy = dy;
        this.length = length;
        this.parts = [];
        this.color = 'green';
        this.isDead = false;
    }

    update(player, canvas, apple) {
        this.move(canvas);
        this.draw(player, canvas, apple);
    }

    draw(player, canvas, apple) {
        canvas.cxt.fillStyle = this.color;

        this.parts.forEach((part, index) => {   
            canvas.cxt.fillRect(part.x, part.y, canvas.gridSize - 1, canvas.gridSize - 1);  
            
            if (this.ateApple(part, apple)) {   
                this.length++;
                player.score++;
                apple.reset(canvas, this);
            }
            
            for (let i = index + 1; i < this.parts.length; i++) {
                if (this.occupiedItself(part, this.parts[i])) {
                    this.isDead = true;        
                }
            }
        });
    }

    reset(canvas) {
        this.x = 160;
        this.y = 160;
        this.parts = [];
        this.length = 4;
        this.dx = canvas.gridSize;
        this.dy = 0;
    }

    move(canvas) {
        this.x += this.dx;
        this.y += this.dy;

        this.manageWall(canvas);

        this.parts.unshift({x: this.x, y: this.y});  
        if (this.parts.length > this.length) {
            this.parts.pop();
        }   
    }

    manageWall(canvas) {
        this.manageWallHorizontally(canvas);
        this.manageWallVertically(canvas);
    }

    manageWallHorizontally(canvas) {
        if (this.x < 0) {
            this.x = canvas.width - canvas.gridSize;
        }
        else if (this.x >= canvas.width) {
            this.x = 0;
        }
    }

    manageWallVertically(canvas) {
        if (this.y < 0) {
            this.y = canvas.height - canvas.gridSize;
        }
        else if (this.y >= canvas.height) {
            this.y = 0;
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
            if (e.which === 37 && this.dx === 0) {
                this.dx = -canvas.gridSize;
                this.dy = 0;
            }
            else if (e.which === 38 && this.dy === 0) {
                this.dy = -canvas.gridSize;
                this.dx = 0;
            }
            else if (e.which === 39 && this.dx === 0) {
                this.dx = canvas.gridSize;
                this.dy = 0;
            }
            else if (e.which === 40 && this.dy === 0) {
                this.dy = canvas.gridSize;
                this.dx = 0;
            }
        });
    }
}
