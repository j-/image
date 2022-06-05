import { ImageDescriptor, ImageDescriptorFlags, THROW_IF_EMPTY } from './types';
import { getImageDescriptorsFromFileList } from './from-file-list';
import { getImageDescriptorsFromResourceURLs } from './from-resource-urls';
import { getImageDescriptorsFromURIList } from './from-uri-list';
import { getImageDescriptorsFromString } from './from-string';
import { getImageDescriptorsFromDataTransferItemList } from './from-data-transfer-item-list';

export const DATA_RESOURCE_URLS = 'resourceurls';
export const DATA_URI_LIST = 'text/uri-list';
export const DATA_TEXT = 'text/plain';

export const getImageDescriptorsFromDataTransfer = async (dataTransfer: DataTransfer, flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  if (dataTransfer.items.length > 0) {
    return getImageDescriptorsFromDataTransferItemList(dataTransfer.items);
  }
  if (dataTransfer.files.length > 0) {
    return getImageDescriptorsFromFileList(dataTransfer.files, flags);
  }
  if (dataTransfer.types.includes(DATA_RESOURCE_URLS)) {
    const item = dataTransfer.getData(DATA_RESOURCE_URLS);
    return getImageDescriptorsFromResourceURLs(item, flags);
  }
  if (dataTransfer.types.includes(DATA_URI_LIST)) {
    const item = dataTransfer.getData(DATA_URI_LIST);
    return getImageDescriptorsFromURIList(item, flags);
  }
  if (dataTransfer.types.includes(DATA_TEXT)) {
    const item = dataTransfer.getData(DATA_TEXT);
    return getImageDescriptorsFromString(item, flags);
  }
  if (flags & THROW_IF_EMPTY) {
    throw new Error('Could not find any images in data transfer');
  }
  return [];
};
