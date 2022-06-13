import { ImageDescriptor } from './types';

export const getImageDescriptorFromBlob = (blob: Blob): ImageDescriptor => {
  console.debug('getImageDescriptorFromBlob');
  return {
    url: URL.createObjectURL(blob),
    type: blob.type,
    size: blob.size,
  };
};
