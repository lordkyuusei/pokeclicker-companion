if (App.game && player) sendMessageToExtension({
    dungeons: Object
        .keys(dungeonList)
        .filter(dungeon => MapHelper.accessToTown(dungeon))
});