import toggle from './messages/toggle.js';

import feedClickSelect from "./ui/clicking/click.js";
import feedCatchSelect from "./ui/catching/catch.js";
import feedHatcherySelect from "./ui/hatchery/hatch.js";
import feedDungeonSelect from "./ui/dungeon/dungeon.js";
import feedGymsSelect from './ui/gyms/gyms.js';

import translateApp from './ui/texts/i18n.js';
import manifest from '../manifest.json' assert { type: "json" };

const toggleDungeon = document.getElementById('toggle-dungeon');
const toggleHatchery = document.getElementById('toggle-hatchery');
const toggleAutoclicker = document.getElementById('toggle-autoclicker');
const toggleAutoCatchType = document.getElementById('toggle-autocatch-type');
const toggleBattleFrontier = document.getElementById('toggle-battlefrontier');
const toggleGymBattle = document.getElementById('toggle-gym-battle');

const selectHatchery = feedHatcherySelect(document.getElementById('select-hatchery'));
const selectCatchType = feedCatchSelect(document.getElementById('select-autocatch-type'));
const selectClickDelay = feedClickSelect(document.getElementById('select-click-delay'));
const selectDungeonRuns = feedDungeonSelect(document.getElementById('select-dungeon-runs'));
const selectGymBattle = feedGymsSelect(document.getElementById('select-gym-battle'), []);

const links = document.getElementsByTagName('a');
const dCallback = (response) => console.log(response);

document.getElementById('version').innerHTML = manifest.version;

const updateToggles = () => {
    toggle(true, 'update-toggles', '', ({ autoclicker, autohatch, dungeon, battleFrontier, autocatch, autogym }) => {
        toggleAutoclicker.checked = autoclicker;
        toggleHatchery.checked = autohatch;
        toggleDungeon.checked = dungeon;
        toggleBattleFrontier.checked = battleFrontier;
        toggleAutoCatchType.checked = autocatch;
        toggleGymBattle.checked = autogym;
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

toggleAutoCatchType.onchange = ({ target }) => toggle(target.checked, 'toggle-autocatch-type-on', 'toggle-autocatch-type-off', dCallback, {
    name: 'autocatchTypeOption',
    value: selectCatchType.value
});

toggleGymBattle.onchange = ({ target }) => toggle(target.checked, 'toggle-gym-battle-on', 'toggle-gym-battle-off', dCallback, {
    name: 'autogymbattleOption',
    value: selectGymBattle.value
});

toggleBattleFrontier.onchange = ({ target }) => toggle(target.checked, 'toggle-battlefrontier-on', 'toggle-battlefrontier-off', dCallback);

selectCatchType.onchange = (_) => toggle(false, 'toggle-autocatch-type-on', 'toggle-autocatch-type-off', updateToggles);
selectHatchery.onchange = (_) => toggle(false, 'toggle-optimized-hatchery-on', 'toggle-optimized-hatchery-off', updateToggles);
selectDungeonRuns.onchange = (_) => toggle(false, 'toggle-dungeon-runner-on', 'toggle-dungeon-runner-off', updateToggles);
selectClickDelay.onchange = (_) => toggle(false, 'toggle-autoclicker-on', 'toggle-autoclicker-off', updateToggles);
selectGymBattle.onchange = (_) => toggle(false, 'toggle-gym-battle-on', 'toggle-gym-battle-off', updateToggles);

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    if (sender.url.includes('pokeclicker')) {
        const { gyms } = request;
        feedGymsSelect(selectGymBattle, gyms);
        sendResponse({ response: "ok" })
    }
});

translateApp();
updateToggles();
makeLinksClickable(links);
toggle(true, 'toggle-main-on', 'toggle-main-off', () => {
    toggle(true, 'feed-gyms-on', '', () => {
        toggle(false, 'feed-gyms-on', 'feed-gyms-off')
    });
});