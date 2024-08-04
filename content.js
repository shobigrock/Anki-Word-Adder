document.addEventListener('mouseup', () => {
  const selection = window.getSelection().toString().trim();
  if (selection) {
    chrome.runtime.sendMessage({ word: selection });
  }
});