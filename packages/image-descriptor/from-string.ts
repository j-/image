import getURLs from 'get-urls';
import { ImageDescriptor, ImageDescriptorFlags } from './types';
import { getImageDescriptorFromURL } from './from-url';
import { assertNotEmpty } from './assert';

export const getImageDescriptorsFromString = (input: string, flags: ImageDescriptorFlags = 0): ImageDescriptor[] => {
  console.debug('getImageDescriptorsFromString');
  const ids = Array.from(getURLs(input), getImageDescriptorFromURL);
  return assertNotEmpty(ids, flags, 'Expected at least one well formed URI in list');
};
