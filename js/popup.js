import toggle from './messages/toggle.js';

import feedClickSelect from "./ui/clicking/click.js";
import feedCatchSelect from "./ui/catching/catch.js";
import feedHatcherySelect from "./ui/hatchery/hatch.js";
import feedDungeonSelect from "./ui/dungeon/dungeon.js";

const toggleDungeon = document.getElementById('toggle-dungeon');
const toggleHatchery = document.getElementById('toggle-hatchery');
const toggleAutoclicker = document.getElementById('toggle-autoclicker');
const toggleAutoCatchType = document.getElementById('toggle-autocatch-type');
const toggleBattleFrontier = document.getElementById('toggle-battlefrontier');

const selectHatchery = feedHatcherySelect(document.getElementById('select-hatchery'));
const selectCatchType = feedCatchSelect(document.getElementById('select-autocatch-type'));
const selectClickDelay = feedClickSelect(document.getElementById('select-click-delay'));
const selectDungeonRuns = feedDungeonSelect(document.getElementById('select-dungeon-runs'));

const links = document.getElementsByTagName('a');
const dCallback = (response) => console.log(response);

const updateToggles = () => {
    toggle(true, 'update-toggles', '', ({ autoclicker, autohatch, dungeon, battleFrontier, autocatch }) => {
        toggleAutoclicker.checked = autoclicker;
        toggleHatchery.checked = autohatch;
        toggleDungeon.checked = dungeon;
        toggleBattleFrontier.checked = battleFrontier;
        toggleAutoCatchType.checked = autocatch;
    });
};

const makeLinksClickable = (links) => {
    Array.from(links).forEach(link => {
        link.onclick = () => chrome.tabs.create({ url: link.href });
    });
}

toggleAutoclicker.onchange = ({ target }) => toggle(target.checked, 'toggle-autoclicker-on', 'toggle-autoclicker-off', dCallback, {
    name: 'clickDelayOption',
    value: selectClickDelay.value
});

toggleDungeon.onchange = ({ target }) => toggle(target.checked, 'toggle-dungeon-runner-on', 'toggle-dungeon-runner-off', dCallback, {
    name: 'dungeonRunsOption',
    value: selectDungeonRuns.value
});

toggleHatchery.onchange = ({ target }) => toggle(target.checked, 'toggle-optimized-hatchery-on', 'toggle-optimized-hatchery-off', dCallback, {
    name: 'hatcherySortOption',
    value: selectHatchery.value
});

toggleAutoCatchType.onchange = (event) => toggle(event.target.checked, 'toggle-autocatch-type-on', 'toggle-autocatch-type-off', dCallback, {
    name: 'autocatchTypeOption',
    value: selectCatchType.value
});

toggleBattleFrontier.onchange = (event) => toggle(event.target.checked, 'toggle-battlefrontier-on', 'toggle-battlefrontier-off');

selectCatchType.onchange = (event) => toggle(false, 'toggle-autocatch-type-on', 'toggle-autocatch-type-off', updateToggles);
selectHatchery.onchange = (event) => toggle(false, 'toggle-optimized-hatchery-on', 'toggle-optimized-hatchery-off', updateToggles);
selectDungeonRuns.onchange = (event) => toggle(false, 'toggle-dungeon-runner-on', 'toggle-dungeon-runner-off', updateToggles);
selectClickDelay.onchange = (event) => toggle(false, 'toggle-autoclicker-on', 'toggle-autoclicker-off', updateToggles);

toggle(true, 'toggle-main-on', 'toggle-main-off');
updateToggles();
makeLinksClickable(links);