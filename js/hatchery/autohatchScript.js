intervalMap.set('autohatchOption', document.currentScript.getAttribute('hatcherySortOption'));
intervalMap.set('autohatchInterval', setInterval(() => {
    if (App.game.breeding.hasFreeEggSlot()) {
        var allPokemon = [...App.game.party.caughtPokemon];
        const sortOption = intervalMap.get('autohatchOption');
        if (sortOption !== Settings.getSetting('hatcherySort').value) {
            allPokemon = allPokemon.sort(PartyController.compareBy(Settings.getSetting('hatcherySort').observableValue(), Settings.getSetting('hatcherySortDirection').observableValue()))
            Settings.setSettingByName('hatcherySort', SortOptions[SortOptions[parseInt(sortOption)]]);
            Settings.setSettingByName('hatcherySortDirection', true);
        }
        const firstAvailable = allPokemon.find(pokemon => pokemon.breeding === false && pokemon.level === 100);
        if (firstAvailable) {
            App.game.breeding.addPokemonToHatchery(firstAvailable);
        }
    } else {
        App.game.breeding.eggList.forEach((eggFunc, i) => {
            const egg = eggFunc();
            if (egg.progress() > 100) {
                App.game.breeding.hatchPokemonEgg(i);
            }
        })
    }
}, 1000));