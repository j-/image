import { assertNotEmpty } from './assert';
import { isFileSystemDirectoryHandle, isFileSystemFileHandle } from './file-system';
import { getImageDescriptorsFromFileSystemDirectoryHandle } from './from-file-system-directory-handle';
import { getImageDescriptorFromFileSystemFileHandle } from './from-file-system-file-handle';
import { ALLOW_ALL_TYPES, ImageDescriptor, ImageDescriptorFlags, THROW_IF_EMPTY } from './types';
import { isImageMediaType } from './utils';

export const getImageDescriptorsFromFileSystemHandle = async (handle: FileSystemHandle, flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  console.debug('getImageDescriptorsFromFileSystemHandle');
  let results: ImageDescriptor[] = [];
  if (isFileSystemFileHandle(handle)) {
    const image = await getImageDescriptorFromFileSystemFileHandle(handle);
    if (isImageMediaType(image.type) || flags & ALLOW_ALL_TYPES) {
      results = [image];
    }
  } else if (isFileSystemDirectoryHandle(handle)) {
    results = await getImageDescriptorsFromFileSystemDirectoryHandle(handle, flags & ~THROW_IF_EMPTY);
  } else {
    throw new Error('Did not recognise file system handle kind');
  }
  return assertNotEmpty(results, flags, 'Expected to get one or more image files from file system');
};
