function logTabs(tabs) {
  const TAB_NAME_WIDTH = 25
  var containerDiv = document.getElementById("container");
/*
  if (tabs.length==0) {
    var noTabMsgDiv = document.createElement("div");
    noTabMsgDiv.className = "table-row"; //class is a js keyword. So it's named className instead.   
    noTabMsgDiv.innerHTML = "No tabs open.";
    noTabMsgDiv.appendChild(tableRowDiv);
  }
*/
  for (let tab of tabs) {
    var tableRowDiv = document.createElement("div");
    var checkboxDiv = document.createElement("div");
    var checkboxInput = document.createElement("input");
    var labelDiv = document.createElement("div");
    var label = document.createElement("label");
    var urlAnchor = document.createElement("a");

    tableRowDiv.className = "table-row"; //class is a js keyword. So it's named className instead.   
    checkboxDiv.className = "table-col";
    labelDiv.className = "table-col";
    label.className = "url-label";

    urlAnchor.href=tab.url;
    label.htmlFor = tab.id.toString(); //for is a js keyword. So it's named htmlFor instead.
    urlAnchor.innerHTML = tab.title;
    checkboxInput.className = "url-checkbox";
    checkboxInput.id = tab.id.toString();
    checkboxInput.type = "checkbox";

    label.appendChild(urlAnchor);
    labelDiv.appendChild(label);
    checkboxDiv.appendChild(checkboxInput);
    tableRowDiv.appendChild(checkboxDiv); 
    tableRowDiv.appendChild(labelDiv); 

    containerDiv.appendChild(tableRowDiv);
  }
}

function checkOrUncheckBoxes() {
    var allNoneCheckbox = document.getElementById("all-none-checkbox");
    var allNoneLabel = document.getElementById("all-none-label");
    if (allNoneCheckbox === null) {
        console.log("Error: allNoneCheckbox is null!");
        return;
    }
    if (allNoneLabel === null) {
        console.log("Error: allNoneLabel is null!");
        return;
    }

    if (allNoneCheckbox.checked) {
        allNoneLabel.innerHTML = "Clear";    
    } else {
        allNoneLabel.innerHTML = "Select all";    
    }
    var checkbox_array = document.getElementsByClassName("url-checkbox");
    for (let checkbox of checkbox_array) {
        console.log(checkbox);
        checkbox.checked = allNoneCheckbox.checked;
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

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("all-none-checkbox").addEventListener("click", checkOrUncheckBoxes); //what if all-none-checkbox is null????
    init_function()
}, false);
