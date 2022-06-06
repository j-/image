import { assertNotEmpty } from './assert';
import { getImageDescriptorFromFileSystemFileHandle } from './from-file-system-file-handle';
import { ImageDescriptor, ImageDescriptorFlags } from './types';

export const getImageDescriptorsFromFileSystemFileHandles = async (fileHandles: FileSystemFileHandle[], flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  const results = await Promise.all(fileHandles.map(getImageDescriptorFromFileSystemFileHandle));
  return assertNotEmpty(results, flags, 'Expected to get one or more image files from file system');
};
