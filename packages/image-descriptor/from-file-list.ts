import { ALLOW_ALL_TYPES, ImageDescriptor, ImageDescriptorFlags, isFlagSet } from './types';
import { getImageDescriptorFromFile } from './from-file';
import { isImageMediaType } from './utils';
import { assertNotEmpty } from './assert';

export const getImageDescriptorsFromFileList = (fileList: ArrayLike<File>, flags: ImageDescriptorFlags = 0): ImageDescriptor[] => {
  console.debug('getImageDescriptorsFromFileList');
  let results = Array.from(fileList).map(getImageDescriptorFromFile);
  if (!isFlagSet(flags, ALLOW_ALL_TYPES)) {
    results = results.filter((image) => isImageMediaType(image.type));
  }
  return assertNotEmpty(results, flags, 'Expected to get one or more image files from file list');
};
