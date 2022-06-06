export default () => {
    const texts = [
        ...document.querySelectorAll('[id^="label"]'),
        ...document.querySelectorAll('[id^="details"]'),
        ...document.querySelectorAll('[id^="error"]'),
        ...document.querySelectorAll('[id^="info"]'),
    ]

    texts.forEach(text => {
        const translation = chrome.i18n.getMessage(text.id);
        text.innerHTML = translation;
        text.title = translation;
    });
}