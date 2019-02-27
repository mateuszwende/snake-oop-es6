import { DivComponent } from "../lib/div-component";

export class Scoreboard extends DivComponent {
    constructor(players) {
        super('scoreboard');
        this.title = 'Scoreboard';
        this.maxNumPlayers = 5;
        this.players = players;
        this.init();
    }

    init() {
        const p = document.createElement('p');
        p.classList.add('scoreboard__title');
        p.textContent = this.title;
        this.element.appendChild(p);

        this.players.sort((a, b) => b.score - a.score)
            .slice(0, this.maxNumPlayers)
            .forEach((player, index) => {
                const scoreBlock = new DivComponent('scoreboard__block');
                const scoreBlockLeft = new DivComponent('scoreboard__block-left');
                const scoreBlockRight = new DivComponent('scoreboard__block-right');

                scoreBlockLeft.element.textContent = `${index + 1}. ${player.name}`;
                scoreBlockRight.element.textContent = player.score;

                scoreBlock.element.appendChild(scoreBlockLeft.element);
                scoreBlock.element.appendChild(scoreBlockRight.element);
                this.element.appendChild(scoreBlock.element);
            });
    }
}