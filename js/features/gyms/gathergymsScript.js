if (App.game && player) sendMessageToExtension({
    gyms: Object
        .keys(GymList)
        .filter(gym => GymList[gym].clears() !== 0)
        .map(gym => ({
            region: (TownList[gym] ?? GymList[gym].parent).region,
            gym
        }))
});