import { isFileSystemDirectoryHandle, isFileSystemFileHandle } from './file-system';
import { getImageDescriptorsFromFileSystemDirectoryHandle } from './from-file-system-directory-handle';
import { getImageDescriptorFromFileSystemFileHandle } from './from-file-system-file-handle';
import { ImageDescriptor } from './types';

export const getImageDescriptorsFromFileSystemHandle = async (handle: FileSystemHandle): Promise<ImageDescriptor[]> => {
  if (isFileSystemFileHandle(handle)) {
    return [await getImageDescriptorFromFileSystemFileHandle(handle)];
  } else if (isFileSystemDirectoryHandle(handle)) {
    return getImageDescriptorsFromFileSystemDirectoryHandle(handle);
  } else {
    throw new Error('Did not recognise file system handle kind');
  }
};
