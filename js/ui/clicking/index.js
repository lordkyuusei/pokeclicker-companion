import toggle from '../../messages/toggle.js';
import feedClickSelect from './click.js';
import defaultCallback from '../common/index.js'

const toggleClick = document.getElementById('toggle-click');
const selectClick = feedClickSelect(document.getElementById('select-click'), []);

toggleClick.onchange = ({ target }) => toggle(target.checked, 'toggle-click-on', 'toggle-click-off', defaultCallback, {
    name: 'clickOption',
    value: selectClick.value
});

selectClick.onchange = (_) => toggle(false, 'toggle-click-on', 'toggle-click-off', () => toggleClick.checked = false);

export {
    toggleClick,
}

