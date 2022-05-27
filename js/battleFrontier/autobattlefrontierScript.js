if (App.game) {
    intervalMap.set('autobattlefrontierInterval', setInterval(() => {
        if (BattleFrontierRunner.started() === false) {
            BattleFrontierRunner.start();
        }
    }, 5000));
}