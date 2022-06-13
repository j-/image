import { getImageDescriptorFromFile } from './from-file';
import { ImageDescriptor } from './types';

export const getImageDescriptorFromFileSystemFileHandle = async (fileHandle: FileSystemFileHandle): Promise<ImageDescriptor> => {
  console.debug('getImageDescriptorFromFileSystemFileHandle');
  const file = await fileHandle.getFile();
  return getImageDescriptorFromFile(file);
};
