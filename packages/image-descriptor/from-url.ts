import isURL from 'is-url';
import { ImageDescriptor } from './types';
import { cleanURL, isBlobURI, isDataURI } from './utils';
import { getImageDescriptorFromDataURI } from './from-data-uri';

export const getImageDescriptorFromURL = (url: string): ImageDescriptor => {
  console.debug('getImageDescriptorFromURL');
  const clean = cleanURL(url);
  if (isBlobURI(clean) && isURL(clean.replace('blob:', ''))) {
    return {
      url: clean,
    };
  }
  if (isDataURI(clean)) {
    return getImageDescriptorFromDataURI(url);
  }
  if (isURL(clean)) {
    return {
      url: clean,
    };
  }
  throw new Error('Input was not a URL');
};
