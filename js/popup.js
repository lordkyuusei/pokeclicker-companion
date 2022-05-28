const toggleAutoclicker = document.getElementById('toggle-autoclicker');

const toggleHatchery = document.getElementById('toggle-hatchery');
const selectHatchery = document.getElementById('select-hatchery');

const toggleDungeon = document.getElementById('toggle-dungeon');

const toggleBattleFrontier = document.getElementById('toggle-battlefrontier');

const toggleAutoCatchType = document.getElementById('toggle-autocatch-type');
const selectCatchType = document.getElementById('select-autocatch-type');

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

const feedCatchTypesOption = () => {
    const catchTypesOptions = [
        { id: 0, label: "Normal" },
        { id: 1, label: "Fire" },
        { id: 2, label: "Water" },
        { id: 3, label: "Electric" },
        { id: 4, label: "Grass" },
        { id: 5, label: "Ice" },
        { id: 6, label: "Fighting" },
        { id: 7, label: "Poison" },
        { id: 8, label: "Ground" },
        { id: 9, label: "Flying" },
        { id: 10, label: "Psychic" },
        { id: 11, label: "Bug" },
        { id: 12, label: "Rock" },
        { id: 13, label: "Ghost" },
        { id: 14, label: "Dragon" },
        { id: 15, label: "Dark" },
        { id: 16, label: "Steel" },
        { id: 17, label: "Fairy" },
    ]

    catchTypesOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.id;
        optionElement.innerText = option.label;
        selectCatchType.appendChild(optionElement);
    });

    selectCatchType.value = 0;

}

const updateToggles = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            message: 'update-toggles'
        }, (response) => {
            const { autoclicker, autohatch, dungeon, battleFrontier, autocatch } = response;
            toggleAutoclicker.checked = autoclicker;
            toggleHatchery.checked = autohatch;
            toggleDungeon.checked = dungeon;
            toggleBattleFrontier.checked = battleFrontier;
            toggleAutoCatchType.checked = autocatch;
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

toggleAutoCatchType.onchange = (event) => toggle(event.target.checked, 'toggle-autocatch-type-on', 'toggle-autocatch-type-off', {
    name: 'autocatchTypeOption',
    value: selectCatchType.value
});

toggleBattleFrontier.onchange = (event) => toggle(event.target.checked, 'toggle-battlefrontier-on', 'toggle-battlefrontier-off');

selectHatchery.onchange = (event) => {
    console.log('select hatch updated')
    return toggle(false, 'toggle-optimized-hatchery-on', 'toggle-optimized-hatchery-off');
}

selectCatchType.onchange = (event) => {
    console.log('select catch updated')
    return toggle(false, 'toggle-autocatch-type-on', 'toggle-autocatch-type-off');
}

toggle(true, 'toggle-main-on', 'toggle-main-off');
feedHatchSortOption();
feedCatchTypesOption();
updateToggles();