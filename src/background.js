
const newTab = "chrome://newtab";
const data = {
    blockedUrl: ''
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {

    // Fetch options data record from storage
    chrome.storage.sync.get(data, (results) => console.log('background::', results));
}

function updateOptions(changes, area) {
    console.log('data was updated', {changes, area});
    data.blockedUrl = changes.blockedUrl.newValue;
}


async function closeTab(tab) {
    const url = tab.url || tab.pendingUrl;

    if (url && url == data.blockedUrl) {
        await chrome.tabs.remove(tab.id);
    }
    else {
        tabs.push(tab.id);
    }
}

async function setTabAsNewTab(tab) {
    const url = tab.url || tab.pendingUrl;

    if (url && url == data.blockedUrl) {
        await chrome.tabs.update(tab.id, { url: newTab });
    }
}

// document.addEventListener('DOMContentLoaded', );
restoreOptions()
// (tab: Tab) => {...}
chrome.storage.onChanged.addListener(updateOptions)
chrome.tabs.onCreated.addListener(setTabAsNewTab);
