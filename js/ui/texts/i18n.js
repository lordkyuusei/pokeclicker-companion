export default () => {
    const texts = [
        ...document.querySelectorAll('[id^="label"]'),
        ...document.querySelectorAll('[id^="details"]'),
        ...document.querySelectorAll('[id^="error"]'),
    ]

    texts.forEach(label => {
        label.innerHTML = chrome.i18n.getMessage(label.id);
    });
}