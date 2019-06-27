document.addEventListener('DOMContentLoaded', function() {
    init_function()
}, false);


function logTabs(tabs) {
  const TAB_NAME_WIDTH = 25
  for (let tab of tabs) {
    console.log(tab.url);
    console.log(tab.title);

    var containerDiv = document.getElementById("container");

    var tableRowDiv = document.createElement("div");
    var checkboxDiv = document.createElement("div");
    var checkboxInput = document.createElement("input");
    var labelDiv = document.createElement("div");
    var label = document.createElement("label");

    tableRowDiv.class = "table-row";
    checkboxDiv.class = "table-col";
    labelDiv.class = "table-col";
    label.class = "url-label";

    label.htmlFor = tab.id.toString(); //for is a js keyword. So it's named htmlFor instead.
    label.innerHTML = tab.title;
    checkboxInput.id = tab.id.toString();
    checkboxInput.type = "checkbox";

    labelDiv.appendChild(label);
    checkboxDiv.appendChild(checkboxInput);
    tableRowDiv.appendChild(checkboxDiv); 
    tableRowDiv.appendChild(labelDiv); 

    containerDiv.appendChild(tableRowDiv);
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
