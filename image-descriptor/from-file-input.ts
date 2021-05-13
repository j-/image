import { ImageDescriptor, ImageDescriptorFlags } from './types';
import { getImageDescriptorsFromFileList } from './from-file-list';

export const getImageDescriptorsFromFileInput = (input: HTMLInputElement, flags: ImageDescriptorFlags = 0): ImageDescriptor[] => {
  if (input.files === null) {
    throw new Error('Expected file list not to be null');
  }
  return getImageDescriptorsFromFileList(input.files, flags);
};
