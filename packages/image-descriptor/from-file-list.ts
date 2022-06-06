import { ImageDescriptor, ImageDescriptorFlags } from './types';
import { getImageDescriptorFromFile } from './from-file';
import { isImageMediaType } from './utils';
import { assertNotEmpty } from './assert';

export const getImageDescriptorsFromFileList = (fileList: ArrayLike<File>, flags: ImageDescriptorFlags = 0): ImageDescriptor[] => {
  const images = Array.from(fileList).filter((file) => isImageMediaType(file.type));
  const results = images.map(getImageDescriptorFromFile);
  return assertNotEmpty(results, flags, 'Expected to get one or more image files from file list');
};
