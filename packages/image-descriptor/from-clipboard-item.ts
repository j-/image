import { ImageDescriptor, ImageDescriptorFlags, THROW_IF_EMPTY } from './types';
import { getImageDescriptorsFromString } from './from-string';
import { getImageDescriptorFromBlob } from './from-blob';

export const getImageDescriptorsFromClipboardItem = async (clipboardItem: ClipboardItem, flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  const results: ImageDescriptor[] = [];
  for (const type of clipboardItem.types) {
    const blob = await clipboardItem.getType(type);
    if (/^text\//.test(type)) {
      const text = await blob.text();
      results.push(...getImageDescriptorsFromString(text));
    } else {
      results.push(getImageDescriptorFromBlob(blob));
    }
  }
  if (results.length === 0) {
    if (flags & THROW_IF_EMPTY) {
      throw new Error('Expected to get one or more image files from file picker');
    }
    return [];
  }
  return results;
};
