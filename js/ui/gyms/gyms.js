export const feedGymSelect = (gymsSelect, gyms) => {
    const regions = [...new Set(gyms.map(gym => gym.region))];
    const uiOptions = regions.map(region => {
        const group = document.createElement('optgroup');
        group.label = chrome.i18n.getMessage(`region_${region}`);
        gyms.filter(gym => gym.region === region).forEach(option => {
            const elem = document.createElement('option');
            elem.value = option.gym;
            elem.innerText = option.gym;
            group.appendChild(elem);
        });
        return group;
    })

    uiOptions.forEach(option => gymsSelect.appendChild(option));
    return gymsSelect;
}

export const feedGymRunsSelect = (gymRunsSelect, gymRuns) => {
    const uiOptions = gymRuns.map(option => {
        const elem = document.createElement('option');
        elem.value = option.id;
        elem.innerText = option.label;
        return elem;
    })

    uiOptions.forEach(option => gymRunsSelect.appendChild(option));
    gymRunsSelect.value = 5;
    return gymRunsSelect;
}