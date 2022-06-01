import toggle from '../../messages/toggle.js'
import feedCatchSelect from './catch.js'
import defaultCallback from '../common/index.js'

const toggleCatch = document.getElementById('toggle-catch');
const selectCatch = feedCatchSelect(document.getElementById('select-catch'), []);

toggleCatch.onchange = ({ target }) => toggle(target.checked, 'toggle-catch-on', 'toggle-catch-off', defaultCallback, {
    name: 'catchTypeOption',
    value: selectCatch.value
});

selectCatch.onchange = (_) => toggle(false, 'toggle-catch-on', 'toggle-catch-off', () => toggleCatch.checked = false);

export {
    toggleCatch,
}