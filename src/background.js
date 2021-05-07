
const newTab = "chrome://newtab";
/** List of sites to block */
let blockedList = [];

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
    // Fetch options data record from storage
    chrome.storage.sync.get({ blockedList }, (results) => {
        blockedList = results.blockedList;
        console.log('restoreOptions::', results, blockedList);
    });
}

function updateOptions(changes, area) {
    console.log('updateOptions::', { changes, area });
    restoreOptions();
}

async function closeTab(tab) {
    const url = tab.url || tab.pendingUrl;

    if (url && blockedList.includes(url)) {
        await chrome.tabs.remove(tab.id);
    }
    else {
        tabs.push(tab.id);
    }
}

async function setTabAsNewTab(tab) {
    const url = tab.url || tab.pendingUrl;

    if (url && blockedList.includes(url)) {
        await chrome.tabs.update(tab.id, { url: newTab });
    }
}

restoreOptions();

// (tab: Tab) => {...}
chrome.storage.onChanged.addListener(updateOptions);
chrome.tabs.onCreated.addListener(setTabAsNewTab);
