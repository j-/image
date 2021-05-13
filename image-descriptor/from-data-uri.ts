import { ImageDescriptor } from './types';
import { getImageDescriptorFromBlob } from './from-blob';
import { dataURIToBlob } from './utils';

export const getImageDescriptorFromDataURI = (dataURI: string): ImageDescriptor => {
  const blob = dataURIToBlob(dataURI);
  return getImageDescriptorFromBlob(blob);
};
