// Saves options to chrome.storage
function save_options() {
    let data = {
        blockedUrl: document.getElementById('url').value
    };

    chrome.storage.sync.set(data, recordOptionsData);
}

function recordOptionsData() {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    
    // Clear status text after a moment
    setTimeout(() => status.textContent = '', 750);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Initialized options data record
    let data = {
        blockedUrl: ''
    };

    // Fetch options data record from storage
    chrome.storage.sync.get(data, showOptionsData);
}

function showOptionsData(result) {
    const status = document.getElementById('status');
    status.textContent = 'Retrieving Options...';

    setTimeout(() => {
        status.textContent = '';
        document.getElementById('url').value = result.blockedUrl;
    }, 750);    
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
