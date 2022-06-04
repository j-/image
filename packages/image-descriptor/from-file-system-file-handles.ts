import { getImageDescriptorFromFileSystemFileHandle } from './from-file-system-file-handle';
import { ImageDescriptor } from './types';

export const getImageDescriptorsFromFileSystemFileHandles = async (fileHandles: FileSystemFileHandle[]): Promise<ImageDescriptor[]> => {
  return Promise.all(fileHandles.map(getImageDescriptorFromFileSystemFileHandle));
};
