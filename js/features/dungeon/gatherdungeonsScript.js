if (App.game && player) sendMessageToExtension({
    dungeons: Object
        .keys(dungeonList)
        .filter(dungeon => MapHelper.accessToTown(dungeon))
        .map(dungeon => ({
            region: (TownList[dungeon] ?? {}).region,
            dungeon
        }))
});