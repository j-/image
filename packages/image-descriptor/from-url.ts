import isURL from 'is-url';
import { ImageDescriptor } from './types';
import { cleanURL } from './utils';
import { getImageDescriptorFromDataURI } from './from-data-uri';

const blobExpr = /^blob:/;
const dataExpr = /^data:/;

export const getImageDescriptorFromURL = (url: string): ImageDescriptor => {
  console.debug('getImageDescriptorFromURL');
  const clean = cleanURL(url);
  const isBlobURL = blobExpr.test(clean);
  if (isBlobURL && isURL(clean.replace(blobExpr, ''))) {
    return {
      url: clean,
    };
  }
  const isDataURI = dataExpr.test(clean);
  if (isDataURI) {
    return getImageDescriptorFromDataURI(url);
  }
  if (isURL(clean)) {
    return {
      url: clean,
    };
  }
  throw new Error('Input was not a URL');
};
