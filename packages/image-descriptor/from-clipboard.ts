import { ImageDescriptor, ImageDescriptorFlags, THROW_IF_EMPTY } from './types';
import { getImageDescriptorsFromClipboardItems } from './from-clipboard-items';

export const getImageDescriptorsFromClipboard = async (flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  const items = await navigator.clipboard.read();
  const results = await getImageDescriptorsFromClipboardItems(items);
  if (results.length === 0) {
    if (flags & THROW_IF_EMPTY) {
      throw new Error('Expected to get one or more image files from file picker');
    }
    return [];
  }
  return results;
};
