import { ImageDescriptor, ImageDescriptorFlags } from './types';
import { getImageDescriptorFromURL } from './from-url';
import { assertNotEmpty } from './assert';

/** Data set by VS Code when dragging out of the editor */
export const getImageDescriptorsFromResourceURLs = (resourceURLs: string, flags: ImageDescriptorFlags = 0): ImageDescriptor[] => {
  console.debug('getImageDescriptorsFromResourceURLs');
  let urls: string[];
  try {
    urls = JSON.parse(resourceURLs);
  } catch (err) {
    throw new Error('Error parsing resource URLs JSON');
  }
  if (!Array.isArray(urls)) {
    throw new Error('Expected resource URLs to be an array');
  }
  assertNotEmpty(urls, flags, 'Expected at least one URL in list');
  try {
    return urls.map(getImageDescriptorFromURL);
  } catch (err) {
    throw new Error('One or more resource URLs in list was not well formed');
  }
};
