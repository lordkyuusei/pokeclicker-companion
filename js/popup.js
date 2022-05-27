const toggleAutoclicker = document.getElementById('toggle-autoclicker');
const toggleHatchery = document.getElementById('toggle-hatchery');
const toggleDungeon = document.getElementById('toggle-dungeon');
const toggleBattleFrontier = document.getElementById('toggle-battlefrontier');

const updateToggles = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            message: 'update-toggles'
        }, (response) => {
            const { autoclicker, hatchery, dungeon, battlefrontier } = response;
            toggleAutoclicker.checked = autoclicker;
            toggleHatchery.checked = hatchery;
            toggleDungeon.checked = dungeon;
            toggleBattleFrontier.checked = battlefrontier;
        });
    });
}

const toggle = (checked, idOn, idOff) => {
    if (checked) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                message: idOn,
                checked
            }, (response) => {
                console.log(response);
            });
        })
    } else {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                message: idOff,
                checked
            }, (response) => {
                console.log(response);
            });
        })
    }
}

toggleAutoclicker.onchange = (event) => toggle(event.target.checked, 'toggle-autoclicker-on', 'toggle-autoclicker-off');
toggleDungeon.onchange = (event) => toggle(event.target.checked, 'toggle-dungeon-runner-on', 'toggle-dungeon-runner-off');
toggleHatchery.onchange = (event) => toggle(event.target.checked, 'toggle-optimized-hatchery-on', 'toggle-optimized-hatchery-off');
toggleBattleFrontier.onchange = (event) => toggle(event.target.checked, 'toggle-battlefrontier-on', 'toggle-battlefrontier-off');

toggle(true, 'toggle-main-on', 'toggle-main-off');
updateToggles();