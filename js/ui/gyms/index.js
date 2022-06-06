import options from './options.json' assert { type: "json" };
import toggle from '../../messages/toggle.js';
import { feedGymSelect, feedGymRunsSelect } from './gyms.js';
import defaultCallback from '../common/index.js'

const toggleGym = document.getElementById('toggle-gym');
const selectGym = feedGymSelect(document.getElementById('select-gym'), []);
const selectGymRuns = feedGymRunsSelect(document.getElementById('select-gym-runs'), options);

toggleGym.onchange = ({ target }) => toggle(target.checked, 'toggle-gym-on', 'toggle-gym-off', defaultCallback, {
    name: 'gymOption',
    value: selectGym.value
}, {
    name: 'gymRunsOption',
    value: selectGymRuns.value
});

selectGym.onchange = (_) => toggle(false, 'toggle-gym-on', 'toggle-gym-off', () => toggleGym.checked = false);
selectGymRuns.onchange = (_) => toggle(false, 'toggle-gym-on', 'toggle-gym-off', () => toggleGym.checked = false);

const handleGymUpdate = (gyms) => {
    feedGymSelect(selectGym, gyms);
};

export {
    toggleGym,
    handleGymUpdate,
}