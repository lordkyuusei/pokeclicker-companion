import options from './options.json' assert { type: "json" };

export const feedDungeonRunsSelect = (select) => {
    const uiOptions = options.map(option => {
        const elem = document.createElement('option');
        elem.value = option.id;
        elem.innerText = option.label;
        return elem;
    })

    uiOptions.forEach(option => select.appendChild(option));
    select.value = 5;
    return select;
}

export const feedDungeonsSelect = (dungeonsSelect, dungeons) => {
    const uiOptions = dungeons.map(option => {
        const elem = document.createElement('option');
        elem.value = option;
        elem.innerText = option;
        return elem;
    })

    uiOptions.forEach(option => dungeonsSelect.appendChild(option));
    return dungeonsSelect;
}