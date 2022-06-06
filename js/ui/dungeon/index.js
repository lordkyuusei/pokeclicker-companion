import toggle from '../../messages/toggle.js';
import { feedDungeonRunsSelect, feedDungeonsSelect } from './dungeon.js';
import defaultCallback from '../common/index.js'

const toggleDungeon = document.getElementById('toggle-dungeon');
const selectDungeons = feedDungeonsSelect(document.getElementById('select-dungeon'), []);
const selectDungeonRuns = feedDungeonRunsSelect(document.getElementById('select-dungeon-runs'));

toggleDungeon.onchange = ({ target }) => toggle(target.checked, 'toggle-dungeon-on', 'toggle-dungeon-off', defaultCallback, {
    name: 'dungeonOption',
    value: selectDungeonRuns.value
}, {
    name: 'dungeonName',
    value: selectDungeons.value
});

selectDungeons.onchange = (_) => toggle(false, '', 'toggle-dungeon-off', () => toggleDungeon.checked = false);
selectDungeonRuns.onchange = (_) => toggle(false, '', 'toggle-dungeon-off', () => toggleDungeon.checked = false);

const handleDungeonUpdate = (dungeons) => feedDungeonsSelect(selectDungeons, dungeons);

export {
    toggleDungeon,
    handleDungeonUpdate
};