export default (isChecked, toggleOn, toggleOff, callback, ...params) => {
    const message = isChecked ? toggleOn : toggleOff;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            message,
            isChecked,
            params
        }, callback);
    })
}