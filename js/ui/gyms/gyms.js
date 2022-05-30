export default (gymsSelect, gyms) => {
    const uiOptions = gyms.map(option => {
        const elem = document.createElement('option');
        elem.value = option;
        elem.innerText = option;
        return elem;
    })

    uiOptions.forEach(option => gymsSelect.appendChild(option));
    return gymsSelect;
}