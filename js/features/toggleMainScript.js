const intervalMap = new Map();

const sendMessageToExtension = (params) => chrome.runtime.sendMessage("bgalpnokkiejlngajdmbficlldfedokn", params, (response) => {
    console.log("external message sent", response);
});

console.log('main script loaded');