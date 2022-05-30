sendMessageToExtension({
    gyms: Object
        .keys(GymList)
        .filter(gym => GymList[gym].clears() !== 0)
});