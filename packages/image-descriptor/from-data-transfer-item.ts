import { ImageDescriptor, ImageDescriptorFlags } from './types';
import { getImageDescriptorsFromString } from './from-string';
import { getImageDescriptorsFromFileSystemHandle } from './from-file-system-handle';
import { getImageDescriptorFromFile } from './from-file';

export const getImageDescriptorsFromDataTransferItem = async (dataTransferItem: DataTransferItem, flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  if (typeof dataTransferItem.getAsFileSystemHandle === 'function') {
    const handle = await dataTransferItem.getAsFileSystemHandle();
    return getImageDescriptorsFromFileSystemHandle(handle);
  }
  if (typeof dataTransferItem.getAsFile === 'function') {
    return [getImageDescriptorFromFile(dataTransferItem.getAsFile())];
  }
  if (typeof dataTransferItem.getAsString === 'function') {
    const string = await new Promise<string>((resolve) => dataTransferItem.getAsString(resolve));
    return getImageDescriptorsFromString(string);
  }
  return [];
};
