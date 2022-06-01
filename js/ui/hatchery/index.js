import toggle from '../../messages/toggle.js';
import feedHatchSelect from './hatch.js';
import feedRegionsSelect from './regions.js';
import defaultCallback from '../common/index.js'

const toggleHatch = document.getElementById('toggle-hatch');
const selectHatch = feedHatchSelect(document.getElementById('select-hatch'), []);
const selectRegion = feedRegionsSelect(document.getElementById('select-hatch-region'), []);

toggleHatch.onchange = ({ target }) => toggle(target.checked, 'toggle-hatch-on', 'toggle-hatch-off', defaultCallback,
    { name: 'hatchOption', value: selectHatch.value },
    { name: 'regionOption', value: selectRegion.value }
);

selectHatch.onchange = (_) => toggle(false, 'toggle-hatch-on', 'toggle-hatch-off', () => toggleHatch.checked = false);
selectRegion.onchange = (_) => toggle(false, 'toggle-hatch-on', 'toggle-hatch-off', () => toggleHatch.checked = false);

const handleRegionUpdate = (regions) => feedRegionsSelect(selectRegion, regions);
export {
    toggleHatch,
    handleRegionUpdate
}