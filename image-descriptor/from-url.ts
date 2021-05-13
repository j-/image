import isURL from 'is-url';
import { ImageDescriptor } from './types';
import { cleanURL } from './utils';

export const getImageDescriptorFromURL = (url: string): ImageDescriptor => {
  const clean = cleanURL(url);
  if (isURL(clean)) {
    return {
      url: clean,
    };
  }
  throw new Error('Input was not a URL');
};
