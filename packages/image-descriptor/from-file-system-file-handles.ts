import { assertNotEmpty } from './assert';
import { getImageDescriptorFromFileSystemFileHandle } from './from-file-system-file-handle';
import { ALLOW_ALL_TYPES, ImageDescriptor, ImageDescriptorFlags, isFlagSet } from './types';
import { isImageMediaType } from './utils';

export const getImageDescriptorsFromFileSystemFileHandles = async (fileHandles: FileSystemFileHandle[], flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  console.debug('getImageDescriptorsFromFileSystemFileHandles');
  let results = await Promise.all(fileHandles.map(getImageDescriptorFromFileSystemFileHandle));
  if (!isFlagSet(flags, ALLOW_ALL_TYPES)) {
    results = results.filter((image) => isImageMediaType(image.type));
  }
  return assertNotEmpty(results, flags, 'Expected to get one or more image files from file system');
};
