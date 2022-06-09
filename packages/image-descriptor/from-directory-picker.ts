import { getImageDescriptorsFromFileSystemDirectoryHandle } from './from-file-system-directory-handle';
import { ImageDescriptor, ImageDescriptorFlags } from './types';

export const getImageDescriptorsFromDirectoryPicker = async (options: DirectoryPickerOptions = {}, flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  try {
    const handle = await window.showDirectoryPicker(options);
    return getImageDescriptorsFromFileSystemDirectoryHandle(handle, flags);
  } catch (err) {
    throw new Error('Expected to get one or more image files from file picker');
  }
};
