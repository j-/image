import { ImageDescriptor, ImageDescriptorFlags, THROW_IF_EMPTY } from './types';
import { getImageDescriptorsFromDataTransferItem } from './from-data-transfer-item';
import { assertNotEmpty } from './assert';

export const getImageDescriptorsFromDataTransferItemList = async (dataTransferItemList: DataTransferItemList, flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  console.debug('getImageDescriptorsFromDataTransferItemList');
  const results: ImageDescriptor[] = [];
  for (let i = 0; i < dataTransferItemList.length; i++) {
    const item = dataTransferItemList[i];
    results.push(...await getImageDescriptorsFromDataTransferItem(item, flags & ~THROW_IF_EMPTY));
  }
  return assertNotEmpty(results, flags, 'Expected to get one or more image files from transfer item list');
};
