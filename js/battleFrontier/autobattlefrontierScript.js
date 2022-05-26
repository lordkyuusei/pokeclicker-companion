const battleFrontierInterval = setInterval(() => {
    if (BattleFrontierRunner.started() === false) {
        BattleFrontierRunner.start();
    }
}, 5000)