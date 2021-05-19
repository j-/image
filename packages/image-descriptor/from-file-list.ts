import { ImageDescriptor, ImageDescriptorFlags, THROW_IF_EMPTY } from './types';
import { getImageDescriptorFromFile } from './from-file';
import { isImageMediaType } from './utils';

export const getImageDescriptorsFromFileList = (fileList: ArrayLike<File>, flags: ImageDescriptorFlags = 0): ImageDescriptor[] => {
  let images = Array.from(fileList).filter((file) => isImageMediaType(file.type));
  if (images.length === 0) {
    if (flags & THROW_IF_EMPTY) {
      throw new Error('Expected to find one or more image files in list');
    }
    return [];
  }
  return images.map(getImageDescriptorFromFile);
};
