import { ALLOW_ALL_TYPES, ImageDescriptor, ImageDescriptorFlags } from './types';
import { getImageDescriptorFromFile } from './from-file';
import { isImageMediaType } from './utils';
import { assertNotEmpty } from './assert';

export const getImageDescriptorsFromFileList = (fileList: ArrayLike<File>, flags: ImageDescriptorFlags = 0): ImageDescriptor[] => {
  let results = Array.from(fileList).map(getImageDescriptorFromFile);
  if (flags & ~ALLOW_ALL_TYPES) {
    results = results.filter((image) => isImageMediaType(image.type));
  }
  return assertNotEmpty(results, flags, 'Expected to get one or more image files from file list');
};
