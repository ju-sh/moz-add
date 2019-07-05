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

function saveTabs() {
    console.log("save button!");
    //document.querySelectorAll('input[value][type="checkbox"]:not([value=""])');
    var selected_checkboxes = document.querySelectorAll(".url-checkbox:checked");
    var saved_tabs = [];
    for (let sel_checkbox of selected_checkboxes) {
        let t = browser.tabs.get(parseInt(sel_checkbox.id));
        saved_tabs.push(t);
    }
    //console.log(saved_tabs.length);
    //console.log(saved_tabs[0]);
    browser.storage.local.clear();
    browser.storage.local.set({
        'stabs': saved_tabs
    })
    .then(setItem, onError);
//    var rve = browser.storage.local.get('stabs');
//    console.log(rve);
}

function setItem() {
    console.log("local storage set. OK. saved_tabs: SET!");
}

function setItem() {
    console.log("Got object from local storage. OK. saved_tabs: GOT!");
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
    document.getElementById("save-button").addEventListener("click", saveTabs); //what if save-button is null????
    init_function()
}, false);
