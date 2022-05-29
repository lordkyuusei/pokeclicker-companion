export default () => {
    const labels = document.querySelectorAll('[id^="label"]');
    const details = document.querySelectorAll('[id^="details"]');

    labels.forEach(label => {
        label.innerHTML = chrome.i18n.getMessage(label.id);
    });

    details.forEach(detail => {
        detail.innerHTML = chrome.i18n.getMessage(detail.id);
    });
}