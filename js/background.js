chrome.runtime.onInstalled.addListener(() => {

    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostEquals: 'www.pokeclicker.com'
                    }
                })],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url?.includes('pokeclicker')) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['js/pokeclicker.js'],
        })
            .then(() => {
                chrome.action.setIcon({ path: { "28": "../icons/icon28.png" } })
                return console.log('pokeclicker.js injected');
            })
            .catch(error => console.log(error));
    } else {
        chrome.action.setIcon({ path: { "28": "../icons/icon28-dark.png" } })
    }
});