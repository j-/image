import { ImageDescriptor, ImageDescriptorFlags, THROW_IF_EMPTY } from './types';
import { getImageDescriptorFromURL } from './from-url';

/** Data set by VS Code when dragging out of the editor */
export const getImageDescriptorsFromResourceURLs = (resourceURLs: string, flags: ImageDescriptorFlags = 0): ImageDescriptor[] => {
  let urls: string[];
  try {
    urls = JSON.parse(resourceURLs);
  } catch (err) {
    throw new Error('Error parsing resource URLs JSON');
  }
  if (!Array.isArray(urls)) {
    throw new Error('Expected resource URLs to be an array');
  }
  if (flags & THROW_IF_EMPTY && urls.length === 0) {
    throw new Error('Expected at least one URL in list');
  }
  try {
    return urls.map(getImageDescriptorFromURL);
  } catch (err) {
    throw new Error('One or more resource URLs in list was not well formed');
  }
};
