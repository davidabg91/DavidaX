export const initFaviconZoom = (imageSrc: string) => {
  const canvas = document.createElement('canvas');
  const size = 64;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  const img = new Image();
  img.src = imageSrc;
  img.onload = () => {
    // Zoom in on the center (assuming DavidaX text is there)
    // We take a center crop of the image
    const sourceSize = Math.min(img.width, img.height) * 0.5; // Zoom in by 2x
    const sx = (img.width - sourceSize) / 2;
    const sy = (img.height - sourceSize) / 2;

    ctx.clearRect(0, 0, size, size);
    
    // Create a circular clip for a modern look
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
    ctx.clip();

    ctx.drawImage(img, sx, sy, sourceSize, sourceSize, 0, 0, size, size);

    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = canvas.toDataURL('image/png');
    }
  };
};
