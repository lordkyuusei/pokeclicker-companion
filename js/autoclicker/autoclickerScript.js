if (App.game && BattleFrontierRunner.started() === false) {
    intervalMap.set('autoclickInterval', setInterval(() => Battle.clickAttack(), 100));
}