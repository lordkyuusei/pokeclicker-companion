intervalMap.set('hatchOption', document.currentScript.getAttribute('hatchOption'));
intervalMap.set('regionOption', document.currentScript.getAttribute('regionOption'));
intervalMap.set('autohatchInterval', setInterval(() => {
    const sortOption = parseInt(intervalMap.get('hatchOption'));
    const region = parseInt(intervalMap.get('regionOption'));
    const hasQueueRoom = App.game.breeding.hasFreeEggSlot() || App.game.breeding.usableQueueSlots() > 0;
    if (App.game && App.game.breeding.canAccess() && hasQueueRoom) {
        if (sortOption !== Settings.getSetting('hatcherySort').value) {
            Settings.setSettingByName('hatcherySort', SortOptions[SortOptions[parseInt(sortOption)]]);
            Settings.setSettingByName('hatcherySortDirection', true);
        }

        let breedable = [...App.game.party.caughtPokemon]
            .sort(PartyController.compareBy(Settings.getSetting('hatcherySort').observableValue(), Settings.getSetting('hatcherySortDirection').observableValue()))
            .filter(pokemon => pokemon.breeding === false && pokemon.level === 100);

        if (breedable) {
            const firstAvailable = region >= 0 ? breedable.find(pokemon => PokemonHelper.calcNativeRegion(pokemon.name) === region) : breedable[0];
            if (firstAvailable) {
                App.game.breeding.addPokemonToHatchery(firstAvailable);
            }
        }
    } else {
        App.game.breeding.eggList.forEach((eggFunc, i) => {
            const egg = eggFunc();
            if (egg.progress() >= 100) {
                App.game.breeding.hatchPokemonEgg(i);
            }
        })
    }
}, 1000));
