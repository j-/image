import { ImageDescriptor, ImageDescriptorFlags, THROW_IF_EMPTY } from './types';
import { getImageDescriptorsFromDataTransferItem } from './from-data-transfer-item';

export const getImageDescriptorsFromDataTransferItemList = async (dataTransferItemList: DataTransferItemList, flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  console.debug('getImageDescriptorsFromDataTransferItemList()');
  const results: ImageDescriptor[] = [];
  for (let i = 0; i < dataTransferItemList.length; i++) {
    const item = dataTransferItemList[i];
    results.push(...await getImageDescriptorsFromDataTransferItem(item));
  }
  if (results.length === 0) {
    if (flags & THROW_IF_EMPTY) {
      throw new Error('Expected to get one or more image files from file picker');
    }
    return [];
  }
  return results;
};
