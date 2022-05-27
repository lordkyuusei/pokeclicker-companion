intervalMap.set('autohatchInterval', setInterval(() => {
    if (App.game.breeding.hasFreeQueueSlot() || App.game.breeding.hasFreeEggSlot()) {
        const firstAvailable = PartyController.getHatcherySortedList()?.find(pokemon => pokemon.breeding === false);
        App.game.breeding.addPokemonToHatchery(firstAvailable);
    }
}, 1000));