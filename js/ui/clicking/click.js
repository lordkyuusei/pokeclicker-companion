import options from './options.json' assert { type: "json" };

export default (select) => {
    const uiOptions = options.map(option => {
        const elem = document.createElement('option');
        elem.value = option.id;
        elem.innerText = option.label;
        return elem;
    })

    uiOptions.forEach(option => select.appendChild(option));
    select.value = 100;
    return select;
}