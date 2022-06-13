import { getImageDescriptorFromBlob } from './from-blob';
import { ImageDescriptor } from './types';

export const getImageDescriptorFromFile = (file: File): ImageDescriptor => {
  console.debug('getImageDescriptorFromFile');
  const id = getImageDescriptorFromBlob(file);
  id.name = file.name;
  return id;
};
