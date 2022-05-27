intervalMap.set('autohatchInterval', setInterval(() => {
    if (App.game.breeding.hasFreeQueueSlot() || App.game.breeding.hasFreeEggSlot()) {
        Settings.setSettingByName('hatcherySort', SortOptions[SortOptions[6]]);
        Settings.setSettingByName('hatcherySortDirection', true);
        const firstAvailable = PartyController.getHatcherySortedList()?.find(pokemon => pokemon.breeding === false);
        App.game.breeding.addPokemonToHatchery(firstAvailable);
    }
}, 1000));