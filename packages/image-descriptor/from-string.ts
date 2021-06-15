import getURLs from 'get-urls';
import { ImageDescriptor, ImageDescriptorFlags, THROW_IF_EMPTY } from './types';
import { getImageDescriptorFromURL } from './from-url';

export const getImageDescriptorsFromString = (input: string, flags: ImageDescriptorFlags = 0): ImageDescriptor[] => {
  const ids = Array.from(getURLs(input), getImageDescriptorFromURL);
  if (ids.length <= 0 && flags & THROW_IF_EMPTY) {
    throw new Error('Expected at least one well formed URI in list');
  }
  return ids;
};
