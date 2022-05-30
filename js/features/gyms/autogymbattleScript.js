intervalMap.set('autogymbattleOption', document.currentScript.getAttribute('autogymbattleOption'));
intervalMap.set('autogymbattleScript', setInterval(() => {
    if (!GymRunner?.running()) {
        const gym = GymList[intervalMap.get('autogymbattleOption')];
        if (gym) {
            GymRunner.startGym(gym);
        }
    }
}, 500));