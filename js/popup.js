const toggleAutoclicker = document.getElementById('toggle-autoclicker');
const toggleHatchery = document.getElementById('toggle-hatchery');
const toggleDungeon = document.getElementById('toggle-dungeon');

const syncUp = () => {
    toggleAutoclicker.checked = document.getElementById('autoclickerScript') !== null;
    toggleHatchery.checked = document.getElementById('autohatchScript') !== null;
    toggleDungeon.checked = document.getElementById('autodungeonScript') !== null;
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

syncUp();