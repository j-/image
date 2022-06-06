import { assertNotEmpty } from './assert';
import { getImageDescriptorsFromFileSystemHandle } from './from-file-system-handle';
import { ImageDescriptor, ImageDescriptorFlags } from './types';

export const getImageDescriptorsFromFileSystemHandles = async (handles: FileSystemHandle[], flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  const results: ImageDescriptor[] = [];
  for (const handle of handles) {
    const ids = await getImageDescriptorsFromFileSystemHandle(handle);
    results.push(...ids);
  }
  return assertNotEmpty(results, flags, 'Expected to get one or more image files from file system');
};
