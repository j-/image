import { getImageDescriptorFromBlob } from './from-blob';
import { ImageDescriptor } from './types';

export const getImageDescriptorFromFile = (file: File): ImageDescriptor => {
  const id = getImageDescriptorFromBlob(file);
  id.name = file.name;
  return id;
};
