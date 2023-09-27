function toggleVideoPlayback() {
    const video = document.querySelector('video');
    if (video) {
        if (video.paused) {
            video.play(); //does this need to be async?
            togglePlayPauseImgState(); //<--i.e. this will happen too quickly?
        } else {
            video.pause();
            togglePlayPauseImgState();
        }
    }
}

function togglePlayPauseImgState() { //needs to be corrected whenever (1) button clicked; (2) context menu opened;
    const video = document.querySelector('video'); //...(3)* video finishes while context menu is open?
    const inputTarget = document.getElementById('play-pause-btn');
    if (video) {
        if (video.paused) inputTarget.src = "https://i.ibb.co/t4g09Mn/pause-btn.png";
        else if (video.played) inputTarget.src = "https://i.ibb.co/YhCh1tV/play-btn.png";
    }
}

function showCustomContextMenu(e) { //handles opening and closing context menu
    const overlay = document.createElement('div');
    overlay.id = "popup-container";
    overlay.style.left = `${e.clientX}px`;
    overlay.style.top = `${e.clientY}px`;

    //add overlay
    document.body.appendChild(overlay);
    togglePlayPauseImgState();

    overlay.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        document.body.removeChild(overlay);
    });

    closeContextMenuWithLeftClick();
}

function closeContextMenuWithLeftClick() {
    document.addEventListener("click", (event) => {
        const overlay = document.getElementById("popup-container");
        if (overlay && (!overlay.contains(event.target))) document.body.removeChild(overlay);
    });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'togglePlayback') toggleVideoPlayback();
});

//https://i.ibb.co/t4g09Mn/pause-btn.png
//https://i.ibb.co/YhCh1tV/play-btn.png

function pausePlayShortcut() {
    
    document.addEventListener("mousedown", function(e) {
        if (e.button === 2) {
            const currTime = new Date().getTime();
            if (currTime - lastRightClk < 500) {
                console.log("double right click");
                lastRightClk = 0; //<--right click action reset after double-click registered
            }
            lastRightClk = currTime;
        }
    });
}