if (App.game && player) sendMessageToExtension({
    regions: GameHelper
        .enumStrings(GameConstants.Region)
        .filter(region => GameConstants.Region[region] <= player.highestRegion())
        .map((region, index) => ({ id: index - 1, region }))
});