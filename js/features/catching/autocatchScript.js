intervalMap.set('catchTypeOption', document.currentScript.getAttribute('catchTypeOption'));
intervalMap.set('autocatchScript', setInterval(() => {
    if (App.game.gameState === 2) {
        const { type1, type2 } = Battle.enemyPokemon();
        const typeOption = intervalMap.get('catchTypeOption');
        if ([type1, type2].includes(parseInt(typeOption))) {
            App.game.pokeballs.alreadyCaughtSelection = 2;
        } else {
            App.game.pokeballs.alreadyCaughtSelection = -1;
        }
    }
}, 500));