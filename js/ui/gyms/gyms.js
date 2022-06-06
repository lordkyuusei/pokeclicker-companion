export const feedGymSelect = (gymsSelect, gyms) => {
    const uiOptions = gyms.map(option => {
        const elem = document.createElement('option');
        elem.value = option;
        elem.innerText = option;
        return elem;
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