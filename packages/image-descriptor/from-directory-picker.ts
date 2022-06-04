import { getImageDescriptorsFromFileSystemDirectoryHandle } from './from-file-system-directory-handle';
import { ImageDescriptor } from './types';

export const getImageDescriptorsFromDirectoryPicker = async (options: DirectoryPickerOptions = {}): Promise<ImageDescriptor[]> => {
  try {
    const handle = await window.showDirectoryPicker(options);
    return getImageDescriptorsFromFileSystemDirectoryHandle(handle);
  } catch (err) {
    throw new Error('Expected to get one or more image files from file picker');
  }
};
