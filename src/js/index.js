import '../styles/main.scss';

import { Game } from './modules/game';

document.addEventListener('DOMContentLoaded', () => new Game());



if (module.hot) {
    module.hot.accept('./hot-print.js', function() {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}