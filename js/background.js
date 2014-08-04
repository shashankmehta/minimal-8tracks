chrome.browserAction.onClicked.addListener(function(tab) {
    if(document.getElementById('minimal') === null){
        chrome.tabs.insertCSS(null, {file: "styles/styles.css"});
        chrome.tabs.executeScript(null, {file: "js/jquery.min.js"});
        chrome.tabs.executeScript(null, {file: "js/multiline.js"});
        chrome.tabs.executeScript(null, {file: "js/script.js"});
    }
});