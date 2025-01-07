// content.js

let previewContainer = null;
let currentMedia = null;
let previewTimer = null;
let closeTimer = null;
let lastMousePosition = { x: 0, y: 0 };

function startCloseTimer() {
  if (closeTimer) {
    clearTimeout(closeTimer);
  }
  closeTimer = setTimeout(() => {
    hidePreview();
  }, 2000);
}

function createPreviewContainer() {
  if (previewContainer) return;
  
  previewContainer = document.createElement('div');
  previewContainer.className = 'media-preview-container';
  
  // Add mouse enter/leave handlers for preview window
  previewContainer.addEventListener('mouseenter', () => {
    if (closeTimer) {
      clearTimeout(closeTimer);
    }
  });
  
  previewContainer.addEventListener('mouseleave', () => {
    startCloseTimer();
  });
  
  document.body.appendChild(previewContainer);
}

function calculateOptimalSize(media) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const mediaWidth = media.naturalWidth || media.videoWidth;
  const mediaHeight = media.naturalHeight || media.videoHeight;

  let width = mediaWidth;
  let height = mediaHeight;

  // Scale down if larger than 90% of viewport
  const maxWidth = windowWidth * 0.9;
  const maxHeight = windowHeight * 0.9;

  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    width *= ratio;
    height *= ratio;
  }

  return { width, height };
}

function updatePreviewPosition(event) {
  if (!previewContainer || !currentMedia) return;

  const rect = previewContainer.getBoundingClientRect();
  const margin = 20; // Safety margin from viewport edges
  
  // Get viewport dimensions
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Initial position (default to right and below cursor)
  let x = event.clientX + margin;
  let y = event.clientY + margin;

  // Adjust horizontally if would extend beyond right edge
  if (x + rect.width > viewportWidth - margin) {
    x = event.clientX - rect.width - margin; // Move to left of cursor
  }

  // Adjust horizontally if would extend beyond left edge
  if (x < margin) {
    x = margin;
  }

  // Adjust vertically if would extend beyond bottom edge
  if (y + rect.height > viewportHeight - margin) {
    y = event.clientY - rect.height - margin; // Move above cursor
  }

  // Adjust vertically if would extend beyond top edge
  if (y < margin) {
    y = margin;
  }

  // Apply the calculated position
  previewContainer.style.left = `${x}px`;
  previewContainer.style.top = `${y}px`;
}

function showPreview(media) {
  // Clear any existing timer
  if (previewTimer) {
    clearTimeout(previewTimer);
  }

  // Set new timer for 1 second delay
  previewTimer = setTimeout(() => {
    createPreviewContainer();
    
    // Clear existing content
    previewContainer.innerHTML = '';
    
    // Clone the media element
    const preview = media.cloneNode(true);
    preview.className = 'media-preview';
    
    // Set optimal size
    const { width, height } = calculateOptimalSize(media);
    preview.style.width = `${width}px`;
    preview.style.height = `${height}px`;
    
    previewContainer.appendChild(preview);
    previewContainer.style.display = 'block';
    
    // Initial position
    updatePreviewPosition({ clientX: lastMousePosition.x, clientY: lastMousePosition.y });
    startCloseTimer();
  }, 1000);
}

function hidePreview() {
  if (previewTimer) {
    clearTimeout(previewTimer);
    previewTimer = null;
  }
  if (closeTimer) {
    clearTimeout(closeTimer);
    closeTimer = null;
  }
  if (previewContainer) {
    previewContainer.style.display = 'none';
  }
  currentMedia = null;
}

function isImageUrl(url) {
  return url.match(/\.(jpeg|jpg|gif|png|webp)$/i) !== null;
}

function showImageFromUrl(url) {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    currentMedia = img;
    showPreview(img);
  };
}

// Event Listeners
document.addEventListener('mouseover', (e) => {
  const target = e.target;
  
  // Check for direct media elements
  if (target.tagName === 'IMG' || target.tagName === 'VIDEO') {
    currentMedia = target;
    showPreview(target);
    return;
  }
  
  // Check for links containing images
  if (target.tagName === 'A') {
    if (target.querySelector('img')) {
      currentMedia = target.querySelector('img');
      showPreview(currentMedia);
      return;
      
    }else if (isImageUrl(target.innerHTML)) {
      showImageFromUrl(target.innerHTML);
      return;
      
    }else{
      const href = target.href;
      if (isImageUrl(href)) {
        showImageFromUrl(href);
      }
    }
  }
});

document.addEventListener('mousemove', updatePreviewPosition);

document.addEventListener('mouseout', (e) => {
  const media = e.target;
  if (media === currentMedia) {
    hidePreview();
  }
});