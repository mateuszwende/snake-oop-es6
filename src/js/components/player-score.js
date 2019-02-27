import { DivComponent } from "../lib/div-component";

export class PlayerScore extends DivComponent {
    constructor(score) {
        super('player-score');
        this.score = score;
        this.init();
    }

    init() {
        this.update(this.score);
    }

    update(score) {
        this.element.textContent = `Score: ${score}`;
    }

    increment() {
        this.score++;
        this.update(this.score);
    }
}