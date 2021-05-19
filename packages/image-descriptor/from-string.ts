import isURL from 'is-url';
import { ImageDescriptor } from './types';
import { getImageDescriptorFromURL } from './from-url';

export const getImageDescriptorFromString = (input: string): ImageDescriptor => {
  if (isURL(input)) {
    return getImageDescriptorFromURL(input);
  }
  throw new Error('Did not recognize string format');
};
