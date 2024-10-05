import balls from './balls.json' with { type: "json" };
import options from './options.json' with { type: "json" };

import toggle from '../../messages/toggle.js'
import feedCatchSelect from './catch.js'
import defaultCallback from '../common/index.js'

const toggleCatch = document.getElementById('toggle-catch');
const selectCatch = feedCatchSelect(document.getElementById('select-catch'), options);
const selectBallCatch = feedCatchSelect(document.getElementById('select-ball-catch'), balls);

toggleCatch.onchange = ({ target }) => toggle(target.checked, 'toggle-catch-on', 'toggle-catch-off', defaultCallback, {
    name: 'catchTypeOption',
    value: selectCatch.value
}, {
    name: 'catchBallOption',
    value: selectBallCatch.value
});

selectCatch.onchange = (_) => toggle(false, 'toggle-catch-on', 'toggle-catch-off', () => toggleCatch.checked = false);
selectBallCatch.onchange = (_) => toggle(false, 'toggle-catch-on', 'toggle-catch-off', () => toggleCatch.checked = false);

export {
    toggleCatch,
}