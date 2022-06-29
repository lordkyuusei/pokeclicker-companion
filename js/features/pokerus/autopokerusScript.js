if (App.game && player && player.starter() !== GameConstants.Starter.None) {
    intervalMap.set('autopokerusInterval', setInterval(() => {
        const SORT_DESC_ASC = true;
        const SORT_BY_BREEDING_EFF = 6;

        if (App.game.breeding.canAccess()) {
            if (App.game.breeding.hasFreeEggSlot()) {
                const hatchHelper = App.game.breeding.hatcheryHelpers.available()[0];
                const pokemons = [...App.game.party.caughtPokemon];
                const starter = pokemons.find(pokemon => pokemon.name === GameConstants.Starter[player.starter()]);
                const breedable = pokemons
                    .sort(PartyController.compareBy(SORT_BY_BREEDING_EFF, SORT_DESC_ASC))
                    .filter(pokemon => pokemon.breeding === false && pokemon.level === 100 && pokemon.pokerus === false);

                if (starter && breedable) {
                    if (starter.breeding === true) {
                        App.game.breeding.addPokemonToHatchery(breedable[0]);
                    } else if (starter.breeding === false) {
                        if (starter.level === 100) {
                            hatchHelper.hire();
                            App.game.breeding.hatcheryHelpers.hatchery.gainPokemonEgg(starter, true);
                            hatchHelper.charge();
                            GameHelper.incrementObservable(hatchHelper.hatched, 1);
                        } else {
                            if (hatchHelper.hired()) {
                                hatchHelper.fire();
                            }
                        }
                    }
                }
            }

            App.game.breeding.eggList
                .map((egg, i) => ({ egg, pos: i }))
                .filter(egg => egg.egg().progress() >= 100)
                .forEach(egg => App.game.breeding.hatchPokemonEgg(egg.pos));
        }
    }, 250));
}