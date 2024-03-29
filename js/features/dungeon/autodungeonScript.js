if (App.game) {
    intervalMap.set('dungeonName', document.currentScript.getAttribute('dungeonName'));
    intervalMap.set('dungeonOption', document.currentScript.getAttribute('dungeonOption'));
    intervalMap.set('autodungeonScript', new function () {
        /* Resets the internal data to default */
        this.setupads = function () {
            this.direction = 1;
            this.floors = DungeonRunner.map.floorSizes;
            this.floor = 0;
            this.size = this.floors[this.floor];
            this.boss = { x: -1, y: -1 }
            this.speed = 500 - (500 * (DungeonRunner.dungeon.difficultyRoute / 100))
        };

        this.getFloorSize = () => this.floors[this.floor];

        this.nextPositions = {
            1: (x, y) => ({ x: x, y: y - 1 }),
            2: (x, y) => ({ x: x + 1, y: y }),
            3: (x, y) => ({ x: x, y: y + 1 }),
            4: (x, y) => ({ x: x - 1, y: y }),
        };

        /* Return board tile if coordinates are valid*/
        this.getBoardTile = function (row, column, floor = this.floor) {
            if (row < 0 || column < 0 || row >= this.size || column >= this.size) return null;
            return DungeonRunner.map.board()[floor][row][column];
        };

        /* Trigger direction change following loop 1 -> 2 -> 3 -> 4 -> 1 */
        this.toggleDirection = function () {
            this.direction = this.direction === 4 ? 1 : this.direction + 1;
        }

        /* If the boss appeared, we note its coordinate for further use (algo change?) */
        this.checkIfBossAppeared = function () {
            const index = DungeonRunner.map.board()[this.floor].findIndex(row => row.find(tile => tile.type() === 4 && tile.isVisible === true));
            if (index >= 0) {
                this.boss.x = index;
                this.boss.y = DungeonRunner.map.board()[this.floor][index].findIndex(tile => tile.type() === 4);
            }
        };

        /* Determines if the 4 side tiles have already been visited. */
        this.allAroundVisited = function (x, y) {
            const { x: nextTopX, y: nextTopY } = this.nextPositions[1](x, y);
            const { x: nextRightX, y: nextRightY } = this.nextPositions[2](x, y);
            const { x: nextBottomX, y: nextBottomY } = this.nextPositions[3](x, y);
            const { x: nextLeftX, y: nextLeftY } = this.nextPositions[4](x, y);

            const top = this.getBoardTile(nextTopY, nextTopX) || { isVisited: true };
            const right = this.getBoardTile(nextRightY, nextRightX) || { isVisited: true };
            const bottom = this.getBoardTile(nextBottomY, nextBottomX) || { isVisited: true };
            const left = this.getBoardTile(nextLeftY, nextLeftX) || { isVisited: true };

            return top.isVisited && right.isVisited && bottom.isVisited && left.isVisited;
        };

        /* Following the snail algorithm, teleports on the 1st left tile next to entrance */
        this.goToFirstAvailable = function () {
            this.move(Math.floor(this.size / 2), this.size - 1);
            this.direction = 4;
        };

        /* If we found a ladder, handles it */

        this.handleLadder = () => {
            DungeonRunner.nextFloor();
            this.floor += 1;
            this.size = this.getFloorSize();
        }

        /* If we found a boss, handles its fight */
        this.handleBoss = () => {
            DungeonRunner.startBossFight();
            const attack = setInterval(() => {
                if (DungeonRunner.fightingBoss() === true) {
                    DungeonRunner.handleClick();
                } else {
                    clearInterval(attack);
                }
            }, 100)
        };

        /* If we found a chest, we open it and check if the boss appeared */
        this.handleChest = function () {
            DungeonRunner.openChest();
            this.checkIfBossAppeared();
        };

        /* If we found an enemy (wild pokemon or trainer), we fight it */
        this.handleEnemy = () => {
            const attack = setInterval(() => {
                if (DungeonRunner.fighting() === true) {
                    DungeonRunner.handleClick();
                } else {
                    clearInterval(attack);
                }
            }, 100)
        };

        /* Depending on the tile we landed in, adapt the behavior */
        this.handleNextTurn = function () {
            const tile = DungeonRunner.currentTileType()();
            if ([0, 1].includes(tile)) return;
            if (tile === 2) this.handleEnemy();
            if (tile === 3) this.handleChest();
            if (tile === 4) this.handleBoss();
            if (tile === 5) this.handleLadder();
        };

        /* Move the player in position ⬅️x➡️, ⬆️y⬇️ */
        this.move = (x, y, f = this.floor) => {
            DungeonRunner.map.moveToCoordinates(x, y, f);
        };

        /* Main dungeon crawling loop */
        this.loop = async function () {
            while (DungeonRunner.dungeonFinished() === false && this.runs > 0) {
                const { x, y } = DungeonRunner.map.playerPosition();
                const { x: newX, y: newY } = this.nextPositions[this.direction](x, y);
                if (![-1, this.size].includes(newY) && ![-1, this.size].includes(newX)) {
                    const tile = this.getBoardTile(newY, newX);
                    if (tile.isVisited === false) {
                        this.move(newX, newY);
                        this.handleNextTurn();
                        await new Promise(resolve => setTimeout(resolve, this.speed));
                    } else if (this.allAroundVisited(x, y)) {
                        this.goToFirstAvailable();
                        this.handleNextTurn();
                        await new Promise(resolve => setTimeout(resolve, this.speed));
                    } else if (tile.isVisited === true) {
                        this.toggleDirection();
                    }
                } else {
                    this.toggleDirection();
                }
            }
        };
        this.reset = function () {
            this.runs = 0;
        }
        this.launchDungeon = async function () {
            this.runs = intervalMap.get('dungeonOption');
            const dungeon = intervalMap.get('dungeonName');

            MapHelper.moveToTown(dungeon);
            player.region = player.town().region;
            while (App.game.wallet.currencies[2]() >= player.town().dungeon.tokenCost && this.runs > 0) {
                DungeonRunner.initializeDungeon(player.town().dungeon);
                this.setupads();
                await this.loop();
                this.runs -= 1;
            }
        }
    });

    intervalMap.get('autodungeonScript').launchDungeon();
}
