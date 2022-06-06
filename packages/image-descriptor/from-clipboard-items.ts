import { ImageDescriptor, ImageDescriptorFlags } from './types';
import { getImageDescriptorsFromClipboardItem } from './from-clipboard-item';
import { assertNotEmpty } from './assert';

export const getImageDescriptorsFromClipboardItems = async (clipboardItems: ClipboardItems, flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  const results: ImageDescriptor[] = [];
  for (const item of clipboardItems) {
    results.push(...await getImageDescriptorsFromClipboardItem(item));
  }
  return assertNotEmpty(results, flags, 'Expected to get one or more image files from clipboard items');
};
