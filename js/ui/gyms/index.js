import toggle from '../../messages/toggle.js';
import feedGymSelect from './gyms.js';
import defaultCallback from '../common/index.js'

const toggleGym = document.getElementById('toggle-gym');
const selectGym = feedGymSelect(document.getElementById('select-gym'), []);

toggleGym.onchange = ({ target }) => toggle(target.checked, 'toggle-gym-on', 'toggle-gym-off', defaultCallback, {
    name: 'gymOption',
    value: selectGym.value
});

selectGym.onchange = (_) => toggle(false, 'toggle-gym-on', 'toggle-gym-off', () => toggleGym.checked = false);

const handleGymUpdate = (gyms) => {
    feedGymSelect(selectGym, gyms);
};

export {
    toggleGym,
    handleGymUpdate,
}