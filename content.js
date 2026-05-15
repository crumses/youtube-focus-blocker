(function() {
    'use strict';

    const targetUrl = "https://exam-countdown-dgs.vercel.app/";
    const allowedChannel = "Benim Hocam";
    const allowedChannelHandle = "@BenimHocam";

    function checkVideos() {
        const items = document.querySelectorAll('ytd-rich-item-renderer, ytd-video-renderer, ytd-compact-video-renderer, ytd-grid-video-renderer, ytd-reel-item-renderer');

        items.forEach(item => {
            if (item.closest('ytd-playlist-panel-renderer') || item.dataset.processed) return;

            const channelLink = item.querySelector('#channel-name a, #byline a, ytd-channel-name a');

            if (channelLink) {
                const channelName = channelLink.textContent.trim();
                if (channelName && channelName !== allowedChannel) {
                    item.style.display = 'none';
                }
                item.dataset.processed = "true";
            }
        });
    }

    function checkWatchPage() {
        if (window.location.pathname === '/watch') {
            const channelEl = document.querySelector('#upload-info #channel-name a, ytd-video-owner-renderer #channel-name a');

            if (channelEl) {
                const channelName = channelEl.textContent.trim();
                if (channelName && channelName !== allowedChannel) {
                    const video = document.querySelector('video');
                    if (video) video.pause();
                    window.location.href = targetUrl;
                }
            }
        }
    }

    function checkHome() {
        if (['/', '/feed/explore'].includes(window.location.pathname)) {
            window.location.href = targetUrl;
        }
    }

    function checkSearch() {
        if (window.location.pathname === '/results') {
            window.location.href = targetUrl;
        }
    }

    function checkChannel() {
        const currentPath = window.location.pathname.toLowerCase();
        const allowedPath = '/' + allowedChannelHandle.toLowerCase();

        if (currentPath.startsWith('/@') && !currentPath.startsWith(allowedPath)) {
            window.location.href = targetUrl;
        }
    }

    function hideRecommendations() {
        const sidebar = document.querySelector('#secondary-inner');
        if (sidebar) {
            const playlist = sidebar.querySelector('ytd-playlist-panel-renderer');

            sidebar.childNodes.forEach(node => {
                if (playlist && node === playlist) return;
                if (node.querySelector && node.querySelector('ytd-playlist-panel-renderer')) return;
                
                if (node.style) node.style.display = 'none';
            });
        }

        const mobileRecs = document.querySelector('ytd-watch-next-secondary-results-renderer');
        if (mobileRecs) mobileRecs.style.display = 'none';
    }

    function hideComments() {
        const comments = document.querySelector('#comments');
        if (comments) comments.style.display = 'none';
    }

    function hideDescription() {
        const desc = document.querySelector('#description, #bottom-row');
        if (desc) desc.style.display = 'none';
    }

    function runGuard() {
        checkHome();
        checkSearch();
        checkChannel();
        checkVideos();
        checkWatchPage();
        hideRecommendations();
        hideComments();
        hideDescription();
    }

    const observer = new MutationObserver(runGuard);

    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
        runGuard();
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body, { childList: true, subtree: true });
            runGuard();
        });
    }

    window.addEventListener('yt-navigate-finish', runGuard);
})();