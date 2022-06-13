import { assertNotEmpty } from './assert';
import { getImageDescriptorsFromFileSystemHandle } from './from-file-system-handle';
import { ALLOW_ALL_TYPES, ImageDescriptor, ImageDescriptorFlags, THROW_IF_EMPTY } from './types';
import { isImageMediaType } from './utils';

export const getImageDescriptorsFromFileSystemHandles = async (handles: FileSystemHandle[], flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  console.debug('getImageDescriptorsFromFileSystemHandles');
  let results: ImageDescriptor[] = [];
  for (const handle of handles) {
    const ids = await getImageDescriptorsFromFileSystemHandle(handle, flags & ~THROW_IF_EMPTY);
    results.push(...ids);
  }
  if (flags & ~ALLOW_ALL_TYPES) {
    results = results.filter((image) => isImageMediaType(image.type));
  }
  return assertNotEmpty(results, flags, 'Expected to get one or more image files from file system');
};
