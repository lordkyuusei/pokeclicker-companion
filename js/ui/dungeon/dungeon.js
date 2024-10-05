import options from './options.json' with { type: "json" };

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
    const regions = [...new Set(dungeons.map(dungeon => dungeon.region))];

    const uiOptions = regions.map(region => {
        const group = document.createElement('optgroup');
        group.label = chrome.i18n.getMessage(`region_${region}`);
        dungeons.filter(dungeon => dungeon.region === region).forEach(option => {
            const elem = document.createElement('option');
            elem.value = option.dungeon;
            elem.innerText = option.dungeon;
            group.appendChild(elem);
        });
        return group;
    })

    uiOptions.forEach(option => dungeonsSelect.appendChild(option));
    return dungeonsSelect;
}