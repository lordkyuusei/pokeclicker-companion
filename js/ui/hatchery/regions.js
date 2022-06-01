export default (regionsSelect, regions) => {
    const uiOptions = regions.map(option => {
        const elem = document.createElement('option');
        elem.value = option.id;
        elem.innerText = option.region;
        return elem;
    })

    uiOptions.forEach(option => regionsSelect.appendChild(option));
    return regionsSelect;
}