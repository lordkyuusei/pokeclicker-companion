const intervalMap = new Map();
const extensionId = document.currentScript.getAttribute('extensionId');
console.log(extensionId)
const sendMessageToExtension = (params) => chrome.runtime.sendMessage(extensionId, params, (response) => {
    console.log("external message sent", response);
});

console.log('main script loaded');