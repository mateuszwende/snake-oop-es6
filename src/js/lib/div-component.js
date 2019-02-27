export class DivComponent {
    constructor(className) {
        this.className = className.toString();
        this.element = document.createElement('div');
        this.element.classList.add(this.className);
    }

    destroy() {
        document.body.removeChild(this.element);
    }
}