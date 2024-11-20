document.addEventListener("DOMContentLoaded", () => {
    const videoGrid = document.getElementById("videoGrid");
    const playBtn = document.getElementById("playBtn");
    const stopBtn = document.getElementById("stopBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const resumeBtn = document.getElementById("resumeBtn");
    const muteBtn = document.getElementById("muteBtn");
    const unmuteBtn = document.getElementById("unmuteBtn");
    const youtubeLinkInput = document.getElementById("youtubeLink");

    const iframeCount = 12;
    let videoURL = "";
    let videoIframes = [];

    // Helper to extract YouTube video ID from URL
    const extractYouTubeID = (url) => {
        const regExp = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^&]+)/;
        const match = url.match(regExp);
        return match ? match[1] || match[2] : null;
    };

    // Initialize Iframes
    const initializeIframes = () => {
        videoGrid.innerHTML = "";
        videoIframes = [];
        for (let i = 0; i < iframeCount; i++) {
            const iframe = document.createElement("iframe");
            iframe.setAttribute("allow", "autoplay; encrypted-media");
            iframe.setAttribute("allowfullscreen", "");
            iframe.setAttribute("src", "");
            videoGrid.appendChild(iframe);
            videoIframes.push(iframe);
        }
    };

    // Play videos in all frames
    const playVideos = () => {
        const videoID = extractYouTubeID(videoURL);
        if (!videoID) {
            alert("Invalid YouTube link!");
            return;
        }
        const embedURL = `https://www.youtube.com/embed/${videoID}?autoplay=1&loop=1&playlist=${videoID}&controls=0&enablejsapi=1`;
        videoIframes.forEach((iframe) => {
            iframe.src = embedURL;
        });
    };

    // Stop videos
    const stopVideos = () => {
        videoIframes.forEach((iframe) => {
            iframe.src = "";
        });
    };

    // Pause videos
    const pauseVideos = () => {
        videoIframes.forEach((iframe) => {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        });
    };

    // Resume videos
    const resumeVideos = () => {
        videoIframes.forEach((iframe) => {
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        });
    };

    // Mute videos
    const muteVideos = () => {
        videoIframes.forEach((iframe) => {
            iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
        });
    };

    // Unmute videos
    const unmuteVideos = () => {
        videoIframes.forEach((iframe) => {
            iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
        });
    };

    // Event Listeners
    playBtn.addEventListener("click", () => {
        videoURL = youtubeLinkInput.value;
        playVideos();
    });

    stopBtn.addEventListener("click", stopVideos);
    pauseBtn.addEventListener("click", pauseVideos);
    resumeBtn.addEventListener("click", resumeVideos);
    muteBtn.addEventListener("click", muteVideos);
    unmuteBtn.addEventListener("click", unmuteVideos);

    // Initialize on load
    initializeIframes();
});

