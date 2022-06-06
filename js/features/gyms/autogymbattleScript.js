intervalMap.set('gymRunsOption', document.currentScript.getAttribute('gymRunsOption'));
intervalMap.set('gymOption', document.currentScript.getAttribute('gymOption'));
intervalMap.set('autogymbattleScript', setInterval(() => {
    const runs = intervalMap.get('gymRunsOption');
    if (!GymRunner?.running() && runs > 0) {
        const gym = GymList[intervalMap.get('gymOption')];
        if (gym) {
            GymRunner.startGym(gym);
            intervalMap.set('gymRunsOption', runs - 1);
        }
    }
}, 500));