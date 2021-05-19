import isURL from 'is-url';
import { ImageDescriptor } from './types';
import { cleanURL } from './utils';

const blobExpr = /^blob:/;

export const getImageDescriptorFromURL = (url: string): ImageDescriptor => {
  const clean = cleanURL(url);
  const isBlobURL = blobExpr.test(clean);
  if (isBlobURL && isURL(clean.replace(blobExpr, ''))) {
    return {
      url: clean,
    };
  }
  if (isURL(clean)) {
    return {
      url: clean,
    };
  }
  throw new Error('Input was not a URL');
};
