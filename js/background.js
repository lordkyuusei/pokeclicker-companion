chrome.runtime.onInstalled.addListener(() => {
    console.log("Pokéclicker Installed");

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
        console.log("Added Page Action")
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(tabId, changeInfo, tab)
    if (changeInfo.status === 'complete') {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['js/pokeclicker.js'],
        })
            .then(() => console.log('pokeclicker.js injected'))
            .catch(error => console.log(error));
    }
});