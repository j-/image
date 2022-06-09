import { ImageDescriptor, ImageDescriptorFlags, THROW_IF_EMPTY } from './types';
import { getImageDescriptorsFromClipboardItems } from './from-clipboard-items';
import { assertNotEmpty } from './assert';

export const getImageDescriptorsFromClipboard = async (flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  const items = await navigator.clipboard.read();
  const results = await getImageDescriptorsFromClipboardItems(items, flags & ~THROW_IF_EMPTY);
  return assertNotEmpty(results, flags, 'Expected to get one or more image files from clipboard');
};
