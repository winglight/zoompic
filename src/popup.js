function createFloatingWindow(mediaUrl, mediaType) {
    const floatingWindow = document.createElement('div');
    floatingWindow.className = 'floating-window';
    document.body.appendChild(floatingWindow);

    const mediaElement = mediaType === 'video' 
        ? document.createElement('video') 
        : document.createElement('img');

    mediaElement.src = mediaUrl;
    mediaElement.style.maxWidth = '100%';
    mediaElement.style.maxHeight = '100%';
    mediaElement.controls = mediaType === 'video';

    floatingWindow.appendChild(mediaElement);

    const adjustSize = () => {
        const { width, height } = mediaElement.getBoundingClientRect();
        floatingWindow.style.width = `${width}px`;
        floatingWindow.style.height = `${height}px`;
        floatingWindow.style.position = 'fixed';
        floatingWindow.style.zIndex = '9999';
        floatingWindow.style.top = '50%';
        floatingWindow.style.left = '50%';
        floatingWindow.style.transform = 'translate(-50%, -50%)';
    };

    mediaElement.onload = adjustSize;
    mediaElement.onloadedmetadata = adjustSize;

    floatingWindow.addEventListener('click', () => {
        document.body.removeChild(floatingWindow);
    });
}

document.addEventListener('mouseover', (event) => {
    const target = event.target;
    if (target.tagName === 'IMG' || target.tagName === 'VIDEO') {
        const mediaUrl = target.src;
        const mediaType = target.tagName === 'VIDEO' ? 'video' : 'image';
        createFloatingWindow(mediaUrl, mediaType);
    }
});