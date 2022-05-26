let ads = {
    isRunning: true,
    delay: 1000,
    size: 0,
    boss: {
        x: -1,
        y: -1,
    },
    direction: 1,
    nextPositions: {
        1: (x, y) => ({ x: x, y: y - 1 }),
        2: (x, y) => ({ x: x + 1, y: y }),
        3: (x, y) => ({ x: x, y: y + 1 }),
        4: (x, y) => ({ x: x - 1, y: y }),
    },
    getBoardTile: (row, column) => {
        if (row < 0 || column < 0 || row >= ads.size || column >= ads.size) return null;
        return DungeonRunner.map.board()[row][column];
    },
    toggleDirection: () => ads.direction === 4 ? ads.direction = 1 : ads.direction += 1,
    checkIfBossAppeared: () => {
        const index = DungeonRunner.map.board().findIndex(row => row.find(tile => tile.type() === 4 && tile.isVisible === true));
        if (index >= 0) {
            ads.boss.x = index;
            ads.boss.y = DungeonRunner.map.board()[index].findIndex(tile => tile.type() === 4);
            ads.delay = 500;
        }
    },
    allAroundVisited: (x, y) => {
        const { x: nextTopX, y: nextTopY } = ads.nextPositions[1](x, y);
        const { x: nextRightX, y: nextRightY } = ads.nextPositions[2](x, y);
        const { x: nextBottomX, y: nextBottomY } = ads.nextPositions[3](x, y);
        const { x: nextLeftX, y: nextLeftY } = ads.nextPositions[4](x, y);

        const top = ads.getBoardTile(nextTopY, nextTopX) || { isVisited: true };
        const right = ads.getBoardTile(nextRightY, nextRightX) || { isVisited: true };
        const bottom = ads.getBoardTile(nextBottomY, nextBottomX) || { isVisited: true };
        const left = ads.getBoardTile(nextLeftY, nextLeftX) || { isVisited: true };

        return top.isVisited && right.isVisited && bottom.isVisited && left.isVisited;
    },
    goToFirstAvailable: () => {
        ads.move(Math.floor(ads.size / 2), ads.size - 1);
        ads.direction = 4;
    },
    handleBoss: () => {
        DungeonRunner.startBossFight();
        const attack = setInterval(() => {
            if (DungeonRunner.fightingBoss() === true) {
                DungeonRunner.handleClick();
            } else {
                clearInterval(attack);
            }
        }, 100)
    },
    handleChest: () => {
        DungeonRunner.openChest();
        ads.checkIfBossAppeared();
    },
    handleEnemy: () => {
        const attack = setInterval(() => {
            if (DungeonRunner.fighting() === true) {
                DungeonRunner.handleClick();
            } else {
                clearInterval(attack);
            }
        }, 100)
    },
    handleNextTurn: () => {
        const tile = DungeonRunner.currentTileType()();
        if ([0, 1].includes(tile)) return;
        if (tile === 2) ads.handleEnemy();
        if (tile === 3) ads.handleChest();
        if (tile === 4) ads.handleBoss();
    },
    move: (x, y) => {
        DungeonRunner.map.moveToCoordinates(x, y);
    },
    loop: async () => {
        while (DungeonRunner.dungeonFinished() === false && ads.isRunning) {
            const { x, y } = DungeonRunner.map.playerPosition();
            const { x: newX, y: newY } = ads.nextPositions[ads.direction](x, y);
            if (![-1, ads.size].includes(newY) && ![-1, ads.size].includes(newX)) {
                const tile = ads.getBoardTile(newY, newX);
                if (tile.isVisited === false) {
                    ads.move(newX, newY);
                    ads.handleNextTurn();
                    await new Promise(resolve => setTimeout(resolve, 500));
                } else if (ads.allAroundVisited(x, y)) {
                    ads.goToFirstAvailable();
                    ads.handleNextTurn();
                    await new Promise(resolve => setTimeout(resolve, 500));
                } else if (tile.isVisited === true) {
                    ads.toggleDirection();
                    // console.log(`we are at [${x}, ${y}], going to ${newX}, ${newY}`);
                    // console.log('normal path');
                    // console.log('stuck');
                    // console.log(`now looking toward`, ads.direction === 1 ? '⬆️' : ads.direction === 2 ? '➡️' : ads.direction === 3 ? '⬇️' : '⬅️');
                }
            } else {
                ads.toggleDirection();
            }
        }
    },
    setupads: () => {
        ads.direction = 1;
        ads.size = DungeonRunner.map.size;
        ads.boss.x = -1;
        ads.boss.y = -1;
        ads.delay = 1000;
    },
    launchDungeon: async () => {
        while (App.game.wallet.currencies[2]() >= player.town().dungeon.tokenCost && ads.isRunning) {
            DungeonRunner.initializeDungeon(player.town().dungeon);
            ads.setupads();
            await ads.loop();
        }
    }
}

ads.launchDungeon();