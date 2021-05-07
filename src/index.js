let blockedList = [];

/**
 * Saves options to chrome.storage
 */
function save_options() {
  const url = document.getElementById('url').value;

  if (!blockedList.includes(url)) {
    blockedList.push(url);

    chrome.storage.sync.set(
      { blockedList },
      () => {
        displayStatus('Options saved.');
        renderEntries();
      });
  }
}

/**
 * Display provided text in status bar
 * @param {string} displayText
 * @param {function} callback (optional)
 */
function displayStatus(displayText, callback) {
  // Update status to let user know options were saved.
  const status = document.getElementById('status');
  status.textContent = displayText;

  const loader = document.getElementById('loader');
  loader.classList.remove('d-none');

  // Clear status text after a moment
  setTimeout(() => {
    loader.classList.add('d-none');
    status.textContent = '';
    callback?.call();
  }, 750);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  // Fetch options data record from storage
  chrome.storage.sync.get(
    { blockedList },
    (results) => {
      displayStatus('Retrieving Options...');
      blockedList = [...results.blockedList];
      renderEntries();
    }
  );
}

function renderEntries() {
  const template = (label) => `
    <div class="d-flex flex-row border">
      <div class="border p-1 icon flex-shrink-1">
        X
      </div>
      <div class="border p-1 align-center flex-grow-1">
        ${label}
      </div>
      <div class="border flex-shrink-1 d-flex">
        <div class="border p-1 icon">
          T
        </div>
        <div class="border p-1 icon">
          S
        </div>
        <div class="border p-1 icon">
          C
        </div>
      </div>
    </div>
    `;

  const listElm = document.getElementById('list');
  const alert = document.getElementById('alert');
  const count = document.getElementById('count');
  count.textContent = blockedList?.length || 0;

  if (blockedList?.length) {
    alert.classList.add('d-none');
    listElm.classList.remove('d-none');
    listElm.innerHTML = blockedList.map(x => template(x)).join('');
  } else {
    alert.classList.remove('d-none');
    listElm.classList.add('d-none');
  }
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', save_options);
