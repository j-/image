export const getImage = async (url: string) => (
  new Promise<HTMLImageElement>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = url;
  })
);

export const isCanvasImageSourceOriginClean = (source: CanvasImageSource): boolean => {
  const canvas = new OffscreenCanvas(1, 1);
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) throw new Error('Could not get 2D rendering context');
  ctx.drawImage(source, 0, 0, 1, 1);
  try {
    ctx.getImageData(0, 0, 1, 1);
    return true;
  } catch (err) {
    return false;
  }
};

export const isSourceOriginClean = async (src: string): Promise<boolean> => {
  const image = await getImage(src);
  return isCanvasImageSourceOriginClean(image);
};
