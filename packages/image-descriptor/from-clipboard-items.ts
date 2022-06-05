import { ImageDescriptor, ImageDescriptorFlags, THROW_IF_EMPTY } from './types';
import { getImageDescriptorsFromClipboardItem } from './from-clipboard-item';

export const getImageDescriptorsFromClipboardItems = async (clipboardItems: ClipboardItems, flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  const results: ImageDescriptor[] = [];
  for (const item of clipboardItems) {
    results.push(...await getImageDescriptorsFromClipboardItem(item));
  }
  if (results.length === 0) {
    if (flags & THROW_IF_EMPTY) {
      throw new Error('Expected to get one or more image files from file picker');
    }
    return [];
  }
  return results;
};
