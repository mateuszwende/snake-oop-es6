import { Snake } from '../components/snake';
import { Apple } from '../components/apple';
import { Canvas } from '../components/canvas';

export class Game {
    constructor() {
        this._width = 400;
        this._height = 400;
        this._canvas = null;
        this._snake = null;
        this._apple = null;
        this._count = 0;
        this._fps = 10;
        this.init();
    }

    init() {
        this._canvas = new Canvas(this._width, this._height, 16);
        document.body.appendChild(this._canvas.canvas);
        this._apple = new Apple(320, 320);
        this._snake = new Snake(160, 160, this._canvas.gridSize, 0, 4);
        this._snake.addEventListeners(this._canvas);
        requestAnimationFrame(this.update.bind(this));
    }

    update() {  
        requestAnimationFrame(this.update.bind(this));
        if (++this._count < 60 / this._fps) return;
        this._count = 0;
        this._canvas.clear();
        this._snake.update(this._canvas, this._apple);
        this._apple.update(this._canvas);
    }

    


    
}