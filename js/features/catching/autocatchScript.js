intervalMap.set('catchBallOption', document.currentScript.getAttribute('catchBallOption'));
intervalMap.set('catchTypeOption', document.currentScript.getAttribute('catchTypeOption'));
intervalMap.set('autocatchScript', setInterval(() => {
    if (App.game.gameState === 2) {
        const { type1, type2 } = Battle.enemyPokemon();
        const typeOption = intervalMap.get('catchTypeOption');
        const ballOption = [type1, type2].includes(parseInt(typeOption)) ? intervalMap.get('catchBallOption') : -1;
        App.game.pokeballs.alreadyCaughtSelection = ballOption;
    }
}, 250));