import { ImageDescriptor, ImageDescriptorFlags, THROW_IF_EMPTY } from './types';
import { getImageDescriptorFromURL } from './from-url';
import { cleanURL } from './utils';

/** Data set by Chrome when dragging out of the bookmarks */
export const getImageDescriptorsFromURIList = (uriList: string, flags: ImageDescriptorFlags = 0): ImageDescriptor[] => {
  const uris = uriList.split(/\n/g);
  if (uris.length <= 1) {
    if (cleanURL(uris[0]) === '') {
      if (flags & THROW_IF_EMPTY) {
        throw new Error('Expected at least one well formed URI in list');
      }
      return [];
    }
    try {
      return [getImageDescriptorFromURL(uris[0])];
    } catch (err) {
      throw new Error('Expected at least one well formed URI in list');
    }
  }
  try {
    return uris.map(getImageDescriptorFromURL);
  } catch (err) {
    throw new Error('One or more URIs in list was not well formed');
  }
};