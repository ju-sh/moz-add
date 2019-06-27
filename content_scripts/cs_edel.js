function logTabs(tabs) {
  for (let tab of tabs) {
    // tab.url requires the `tabs` permission
    console.log(tab.url);
  }
}

function onError(error) {
    console.log(`Error: ${error}`);
} 
function init_function() {
    console.log('init_called!');
    var querying = browser.tabs.query({});
    querying.then(logTabs, onError);
}

window.onload = init_function();
