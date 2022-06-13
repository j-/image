import { ALLOW_ALL_TYPES, ImageDescriptor, ImageDescriptorFlags, isFlagSet, THROW_IF_EMPTY } from './types';
import { getImageDescriptorsFromString } from './from-string';
import { getImageDescriptorsFromFileSystemHandle } from './from-file-system-handle';
import { getImageDescriptorFromFile } from './from-file';
import { assertNotEmpty } from './assert';
import { isImageMediaType } from './utils';

export const getImageDescriptorsFromDataTransferItem = async (dataTransferItem: DataTransferItem, flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  console.debug('getImageDescriptorsFromDataTransferItem');
  let results: ImageDescriptor[] = [];

  (async () => {
    if (typeof dataTransferItem.getAsFileSystemHandle === 'function') {
      const handle = await dataTransferItem.getAsFileSystemHandle();
      if (handle) {
        results = await getImageDescriptorsFromFileSystemHandle(handle, flags & ~THROW_IF_EMPTY);
        return;
      }
    }

    if (typeof dataTransferItem.getAsFile === 'function') {
      const file = dataTransferItem.getAsFile();
      if (file && isImageMediaType(file.type) || isFlagSet(flags, ALLOW_ALL_TYPES)) {
        results = [getImageDescriptorFromFile(file)];
        return;
      }
    }

    if (typeof dataTransferItem.getAsString === 'function') {
      const string = await new Promise<string>((resolve) => dataTransferItem.getAsString(resolve));
      if (string) {
        results = getImageDescriptorsFromString(string, flags & ~THROW_IF_EMPTY);
        return;
      }
    }
  })();

  return assertNotEmpty(results, flags, 'Expected to get one or more image files from transfer item');
};
