import toggle from '../../messages/toggle.js';
import feedDungeonSelect from './dungeon.js';
import defaultCallback from '../common/index.js'

const toggleDungeon = document.getElementById('toggle-dungeon');
const selectDungeon = feedDungeonSelect(document.getElementById('select-dungeon'), []);

toggleDungeon.onchange = ({ target }) => toggle(target.checked, 'toggle-dungeon-on', 'toggle-dungeon-off', defaultCallback, {
    name: 'dungeonOption',
    value: selectDungeon.value
});

selectDungeon.onchange = (_) => toggle(false, 'toggle-dungeon-on', 'toggle-dungeon-off', () => toggleDungeon.checked = false);

export {
    toggleDungeon,
};