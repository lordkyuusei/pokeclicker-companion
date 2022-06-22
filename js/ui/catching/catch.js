export default (select, options) => {
    const uiOptions = options.map(option => {
        const elem = document.createElement('option');
        elem.value = option.id;
        elem.innerText = chrome.i18n.getMessage(option.label);
        return elem;
    })

    uiOptions.forEach(option => select.appendChild(option));
    select.value = 2;
    return select;
}