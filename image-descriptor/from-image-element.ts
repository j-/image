import { ImageDescriptor } from './types';
import { getImageDescriptorFromURL } from './from-url';
import { cleanURL } from './utils';

export const getImageDescriptorFromImageElement = (image: HTMLImageElement): ImageDescriptor => {
  const url = cleanURL(image.src);
  if (url !== '') {
    const id = getImageDescriptorFromURL(url);
    const { width, height } = image;
    if (width > 0 && height > 0) {
      id.dimensions = { width, height };
    }
    return id;
  }
  throw new Error('Image did not have a source');
};
