import { ImageDescriptor, ImageDescriptorFlags, THROW_IF_EMPTY } from './types';
import { getImageDescriptorsFromFileList } from './from-file-list';
import { getImageDescriptorsFromResourceURLs } from './from-resource-urls';
import { getImageDescriptorsFromURIList } from './from-uri-list';
import { getImageDescriptorsFromString } from './from-string';
import { getImageDescriptorsFromDataTransferItemList } from './from-data-transfer-item-list';
import { assertNotEmpty } from './assert';

export const DATA_RESOURCE_URLS = 'resourceurls';
export const DATA_URI_LIST = 'text/uri-list';
export const DATA_TEXT = 'text/plain';

export const getImageDescriptorsFromDataTransfer = async (dataTransfer: DataTransfer, flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  console.debug('getImageDescriptorsFromDataTransfer');
  let results: ImageDescriptor[] = [];
  if (dataTransfer.items.length > 0) {
    results = await getImageDescriptorsFromDataTransferItemList(dataTransfer.items, flags & ~THROW_IF_EMPTY);
  } else if (dataTransfer.files.length > 0) {
    results = getImageDescriptorsFromFileList(dataTransfer.files, flags & ~THROW_IF_EMPTY);
  } else if (dataTransfer.types.includes(DATA_RESOURCE_URLS)) {
    const item = dataTransfer.getData(DATA_RESOURCE_URLS);
    results = getImageDescriptorsFromResourceURLs(item, flags & ~THROW_IF_EMPTY);
  } else if (dataTransfer.types.includes(DATA_URI_LIST)) {
    const item = dataTransfer.getData(DATA_URI_LIST);
    results = getImageDescriptorsFromURIList(item, flags & ~THROW_IF_EMPTY);
  } else if (dataTransfer.types.includes(DATA_TEXT)) {
    const item = dataTransfer.getData(DATA_TEXT);
    results = getImageDescriptorsFromString(item, flags & ~THROW_IF_EMPTY);
  } else if (flags & THROW_IF_EMPTY) {
    throw new Error('Could not find any images in data transfer');
  }
  return assertNotEmpty(results, flags, 'Expected to get one or more image files from data transfer');
};
