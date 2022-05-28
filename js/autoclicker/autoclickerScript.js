/* Gamestates:
    0: "idle"
    1: "paused"
    2: "fighting"
    3: "gym"
    4: "dungeon"
    5: "safari"
    6: "town"
    7: "shop"
    8: "battleFrontier"
    9: "temporaryBattle" */

if (App.game && BattleFrontierRunner.started() === false) {
    intervalMap.set('autoclickInterval', setInterval(() => {
        const battling = {
            2: () => Battle.clickAttack(),
            3: () => GymBattle.clickAttack(),
        }
        const func = battling[App.game.gameState]
        if (func) {
            func()
        }
    }, 100));
}