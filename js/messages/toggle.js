export default (isChecked, toggleOn, toggleOff, callback, ...params) => {
    const message = isChecked ? toggleOn : toggleOff;
    try {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                message,
                isChecked,
                params
            }, callback);
        })
    } catch (err) {
        callback({});
    }
}