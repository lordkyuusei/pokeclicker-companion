if (App.game && player && player.starter() !== GameConstants.Starter.None) {
    intervalMap.set('autopokerusInterval', setInterval(() => {
        if (App.game.breeding.canAccess() && App.game.breeding.hasFreeEggSlot()) {
            const starter = [...App.game.party.caughtPokemon]
                .find(pokemon => pokemon.name === GameConstants.Starter[player.starter()]);

            Settings.setSettingByName('hatcherySort', 6);

            const breedable = [...App.game.party.caughtPokemon]
                .sort(PartyController.compareBy(Settings.getSetting('hatcherySort').observableValue(), Settings.getSetting('hatcherySortDirection').observableValue()))
                .filter(pokemon => pokemon.breeding === false && pokemon.level === 100 && pokemon.pokerus === false);

            if (starter && breedable) {
                if (starter.breeding === true) {
                    App.game.breeding.addPokemonToHatchery(breedable[0]);
                } else if (starter.breeding === false && starter.level === 100) {
                    App.game.breeding.addPokemonToHatchery(starter);
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
    }, 250));
}