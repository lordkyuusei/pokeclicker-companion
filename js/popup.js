const toggleAutoclicker = document.getElementById('toggle-autoclicker');
const toggleHatchery = document.getElementById('toggle-hatchery');
const selectHatchery = document.getElementById('select-hatchery');
const toggleDungeon = document.getElementById('toggle-dungeon');
const toggleBattleFrontier = document.getElementById('toggle-battlefrontier');

const feedHatchSortOption = () => {
    const hatcherySortOptions = [
        { id: 0, label: 'Id' },
        { id: 1, label: 'Name' },
        { id: 2, label: 'Attack' },
        { id: 3, label: 'Level' },
        { id: 4, label: 'Shiny' },
        { id: 5, label: 'Base Attack' },
        { id: 6, label: 'Breeding Eff.' },
        { id: 7, label: 'Egg Steps' },
        { id: 8, label: 'Times hatched' },
        { id: 9, label: 'Category' },
        { id: 10, label: 'Proteins used' },
    ];

    hatcherySortOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.id;
        optionElement.innerText = option.label;
        selectHatchery.appendChild(optionElement);
    });

    selectHatchery.value = 6;
}

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

const toggle = (checked, idOn, idOff, ...params) => {
    const message = checked ? idOn : idOff;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            message,
            checked,
            params
        }, (response) => {
            console.log(response);
        });
    })
}

toggleAutoclicker.onchange = (event) => toggle(event.target.checked, 'toggle-autoclicker-on', 'toggle-autoclicker-off');
toggleDungeon.onchange = (event) => toggle(event.target.checked, 'toggle-dungeon-runner-on', 'toggle-dungeon-runner-off');
toggleHatchery.onchange = (event) => toggle(event.target.checked, 'toggle-optimized-hatchery-on', 'toggle-optimized-hatchery-off', {
    name: 'hatcherySortOption',
    value: selectHatchery.value
});
toggleBattleFrontier.onchange = (event) => toggle(event.target.checked, 'toggle-battlefrontier-on', 'toggle-battlefrontier-off');

selectHatchery.onchange = (event) => toggle(false, 'toggle-optimized-hatchery-on', 'toggle-optimized-hatchery-off')
toggle(true, 'toggle-main-on', 'toggle-main-off');
feedHatchSortOption();
updateToggles();