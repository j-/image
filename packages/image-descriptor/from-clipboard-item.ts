import { ALLOW_ALL_TYPES, ImageDescriptor, ImageDescriptorFlags, THROW_IF_EMPTY } from './types';
import { getImageDescriptorsFromString } from './from-string';
import { getImageDescriptorFromBlob } from './from-blob';
import { assertNotEmpty } from './assert';
import { isImageMediaType } from './utils';

export const getImageDescriptorsFromClipboardItem = async (clipboardItem: ClipboardItem, flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  const results: ImageDescriptor[] = [];
  for (const type of clipboardItem.types) {
    const blob = await clipboardItem.getType(type);
    if (/^text\//.test(type)) {
      const text = await blob.text();
      results.push(...getImageDescriptorsFromString(text, flags & ~THROW_IF_EMPTY));
    } else if (isImageMediaType(type) || flags & ALLOW_ALL_TYPES) {
      results.push(getImageDescriptorFromBlob(blob));
    }
  }
  return assertNotEmpty(results, flags, 'Expected to get one or more image files from clipboard item');
};
