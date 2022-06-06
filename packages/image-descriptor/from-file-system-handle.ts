import { assertNotEmpty } from './assert';
import { isFileSystemDirectoryHandle, isFileSystemFileHandle } from './file-system';
import { getImageDescriptorsFromFileSystemDirectoryHandle } from './from-file-system-directory-handle';
import { getImageDescriptorFromFileSystemFileHandle } from './from-file-system-file-handle';
import { ImageDescriptor, ImageDescriptorFlags } from './types';

export const getImageDescriptorsFromFileSystemHandle = async (handle: FileSystemHandle, flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  let results: ImageDescriptor[] = [];
  if (isFileSystemFileHandle(handle)) {
    results = [await getImageDescriptorFromFileSystemFileHandle(handle)];
  } else if (isFileSystemDirectoryHandle(handle)) {
    results = await getImageDescriptorsFromFileSystemDirectoryHandle(handle);
  } else {
    throw new Error('Did not recognise file system handle kind');
  }
  return assertNotEmpty(results, flags, 'Expected to get one or more image files from file system');
};
