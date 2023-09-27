chrome.runtime.onInstalled.addListener(() => {
    console.log("test");
});

chrome.contextMenus.create({
    id: "ytetPlayPause",
    title: "Control YT vid",
    contexts: ["tab"]
})

let lastRightClk = 0;
pausePlayShortcut();

chrome.contextMenus.create({
    title: "ytet cap",
    contexts: ["tab"],
    id: "ytetMenuItemId" //<--linked to...?
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
    if(info.menuItemId === "ytetMenuItemId") {
        return;
    }
});

function checkIfYT() {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        const regMatch = /(\.|\/)(youtube\.com)/g;
        //if (tab.url && tab.url.includes(".youtube.com")) {
        if (tab.url && tab.url.match(regMatch)) {
            chrome.contextMenus.update("ytetMenuItemId", {visible: true});
        } else {
            chrome.contextMenus.update("ytetMenuItemId", {visible: false});
        }
    });
}


