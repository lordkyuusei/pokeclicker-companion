intervalMap.set('gymOption', document.currentScript.getAttribute('gymOption'));
intervalMap.set('autogymbattleScript', setInterval(() => {
    if (!GymRunner?.running()) {
        const gym = GymList[intervalMap.get('gymOption')];
        if (gym) {
            GymRunner.startGym(gym);
        }
    }
}, 500));