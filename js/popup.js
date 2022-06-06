import toggle from './messages/toggle.js';
import translateApp from './ui/texts/i18n.js';
import makeLinksClickable from './ui/texts/links.js';
import manifest from '../manifest.json' assert { type: "json" };

import { toggleCatch } from './ui/catching/index.js';
import { toggleClick } from './ui/clicking/index.js';
import { toggleDungeon, handleDungeonUpdate } from './ui/dungeon/index.js';
import { toggleGym, handleGymUpdate } from './ui/gyms/index.js';
import { toggleBattleFrontier } from './ui/battle-frontier/index.js';
import { toggleHatch, handleRegionUpdate } from './ui/hatchery/index.js';
import defaultCallback from './ui/common/index.js';

document.getElementById('version').innerHTML = manifest.version;

const updateToggles = () => {
    toggle(true, 'update-toggles', '', ({ click, hatch, dungeon, battleFrontier, catch_, gym } = {}) => {
        toggleGym.checked = gym;
        toggleHatch.checked = hatch;
        toggleClick.checked = click;
        toggleCatch.checked = catch_;
        toggleDungeon.checked = dungeon;
        toggleBattleFrontier.checked = battleFrontier;
    });
};

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    if (sender.url.includes('pokeclicker')) {
        const { gyms, regions, dungeons } = request;
        if (gyms) {
            handleGymUpdate(gyms);
            sendResponse({ response: 'gyms updated' });
        } else if (regions) {
            handleRegionUpdate(regions);
            sendResponse({ response: 'regions updated' });
        } else if (dungeons) {
            handleDungeonUpdate(dungeons)
            sendResponse({ response: 'dungeons updated' });
        }
    }
});

translateApp();
makeLinksClickable();

chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    const { url } = tabs[0] || {};
    if (url?.includes("www.pokeclicker.com")) {
        document.querySelector('.error').classList.add('hide');
        toggle(true, 'toggle-main-on', 'toggle-main-off', (res) => {
            updateToggles();
            toggle(true, 'select-gyms-on', '', () => toggle(false, '', 'select-gyms-off', defaultCallback));
            toggle(true, 'select-dungeons-on', '', () => toggle(false, '', 'select-dungeons-off', defaultCallback))
            toggle(true, 'select-regions-on', '', () => toggle(false, '', 'select-regions-off', defaultCallback));
        }, {
            name: 'extensionID',
            value: chrome.runtime.id
        });
    } else {
        document.querySelector('.toggles').classList.add('hide');
        document.querySelector('.error').classList.add('show');
    }
});