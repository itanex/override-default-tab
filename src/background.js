
const newTab = "chrome://newtab";

async function closeTab(tab) {
    const url = tab.url || tab.pendingUrl;

    if (url && url == "https://javascript.info/coding-style") {
        await chrome.tabs.remove(tab.id);
    }
    else {
        tabs.push(tab.id);
    }
}

async function setTabAsNewTab(tab) {
    const url = tab.url || tab.pendingUrl;

    if (url && url == "https://javascript.info/coding-style") {
        await chrome.tabs.update(tab.id, { url: newTab });
    }
    else {
        tabs.push(tab.id);
    }
}

// (tab: Tab) => {...}
chrome.tabs.onCreated.addListener(setTabAsNewTab);
