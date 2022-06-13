import { ImageDescriptor, ImageDescriptorFlags, THROW_IF_EMPTY } from './types';
import { getImageDescriptorsFromClipboardItem } from './from-clipboard-item';
import { assertNotEmpty } from './assert';

export const getImageDescriptorsFromClipboardItems = async (clipboardItems: ClipboardItems, flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  console.debug('getImageDescriptorsFromClipboardItems');
  const results: ImageDescriptor[] = [];
  for (const item of clipboardItems) {
    results.push(...await getImageDescriptorsFromClipboardItem(item, flags & ~THROW_IF_EMPTY));
  }
  return assertNotEmpty(results, flags, 'Expected to get one or more image files from clipboard items');
};
