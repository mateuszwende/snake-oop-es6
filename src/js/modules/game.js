import { Snake } from '../components/snake';
import { Apple } from '../components/apple';
import { Canvas } from '../components/canvas';
import { DivComponent } from '../lib/div-component';
import { Player } from '../components/player';
import { Scoreboard } from '../components/scoreboard';
import { PlayerScore } from '../components/player-score';

export class Game {
    constructor() {
        this.width = 400;
        this.height = 400;
        this.canvas = null;
        this.snake = null;
        this.apple = null;
        this.count = 0;
        this.fps = 15;
        this.start = false;
        this.players = [];
        this.player = null;
        this.scoreboard = null;
        this.playerScore = null;
        this.animationFrame = null;
        this.init();
    }

    async init() {
        await this.getPlayerInfo();

        this.canvas = new Canvas(this.width, this.height, 16);
        document.body.appendChild(this.canvas.canvas);

        this.scoreboard = new Scoreboard(this.players);
        document.body.appendChild(this.scoreboard.element);

        this.playerScore = new PlayerScore(this.player.score);
        document.body.appendChild(this.playerScore.element);

        this.apple = new Apple(320, 320);
        this.snake = new Snake(160, 160, this.canvas.gridSize, 0, 4);
        this.snake.addEventListeners(this.canvas);

        this.animationFrame = requestAnimationFrame(this.update.bind(this));
    }

    update() {  
        if (this.snake.isDead) {
            this.restart();
            return;
        }
        
        this.animationFrame = requestAnimationFrame(this.update.bind(this));
               
        if (++this.count < 60 / this.fps) {
            return;
        }

        this.count = 0;
        this.canvas.clear();
        this.snake.update(this.player, this.canvas, this.apple);
        this.apple.update(this.canvas);
        this.playerScore.update(this.player.score);    
    }

    restart() {
        cancelAnimationFrame(this.animationFrame);
        document.body.innerHTML = '';
        this.snake.isDead = false;

        this.players.push(this.player);
        localStorage.setItem('snakePlayers', JSON.stringify(this.players));

        this.init();
    }

    async getPlayerInfo() {

        if (!localStorage.getItem('snakePlayers')) {
            localStorage.setItem('snakePlayers', JSON.stringify(this.players));
        } else {
            this.players = JSON.parse(localStorage.getItem('snakePlayers'));
        }

        const playerInfoDiv = new DivComponent('player-info');
        document.body.appendChild(playerInfoDiv.element);
        const formStr =
        ` 
            <input type="text" name="playerName" autocomplete="off" placeholder="Your nick">    
        `;
        playerInfoDiv.element.innerHTML = formStr;

        const playerNameInput = document.querySelector('input[name="playerName"]');

        return new Promise((res, rej) => {
            playerNameInput.addEventListener('keydown', e => {
                if (e.which === 13) {
                    const inputValue = playerNameInput.value;
                    this.player = new Player({
                        id: this.players.length + 1,
                        name: inputValue.toString(),
                        score: 0
                    });
                    playerInfoDiv.destroy();
                    res();
                }
            });
        })
    }   
}