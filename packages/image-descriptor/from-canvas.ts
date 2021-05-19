import { ImageDescriptor } from './types';
import { getImageDescriptorFromDataURI } from './from-data-uri';

export const getImageDescriptorFromCanvas = (canvas: HTMLCanvasElement): ImageDescriptor => {
  // `toDataURL()` takes a `type` param which can be any
  // supported MIME type. The default value is `image/png`.
  const dataURI = canvas.toDataURL();
  const id = getImageDescriptorFromDataURI(dataURI);
  const { width, height } = canvas;
  if (width > 0 && height > 0) {
    id.dimensions = { width, height };
  };
  return id;
};
