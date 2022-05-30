const intervalMap = new Map();

const sendMessageToExtension = (params) => chrome.runtime.sendMessage("bgalpnokkiejlngajdmbficlldfedokn", params, (response) => {
    console.log("ok", response, params);
});

console.log('main script loaded');