import { ImageDescriptor } from './types';

export const getImageDescriptorFromBlob = (blob: Blob): ImageDescriptor => {
  return {
    url: URL.createObjectURL(blob),
    type: blob.type,
    size: blob.size,
  };
};
