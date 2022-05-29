intervalMap.set('autocatchTypeOption', document.currentScript.getAttribute('autocatchTypeOption'));
intervalMap.set('autocatchScript', setInterval(() => {
    if (App.game.gameState === 2) {
        const { type1, type2 } = Battle.enemyPokemon();
        const typeOption = intervalMap.get('autocatchTypeOption');
        if ([type1, type2].includes(parseInt(typeOption))) {
            App.game.pokeballs.alreadyCaughtSelection = 2;
        } else {
            App.game.pokeballs.alreadyCaughtSelection = -1;
        }
    }
}, 500));