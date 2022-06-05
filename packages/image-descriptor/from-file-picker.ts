import { getImageDescriptorsFromFileSystemFileHandles } from './from-file-system-file-handles';
import { ImageDescriptor, ImageDescriptorFlags, THROW_IF_EMPTY } from './types';

export const getImageDescriptorsFromFilePicker = async (options: OpenFilePickerOptions = {}, flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  try {
    const handles = await window.showOpenFilePicker(options);
    const images = await getImageDescriptorsFromFileSystemFileHandles(handles);
    if (images.length === 0) {
      if (flags & THROW_IF_EMPTY) {
        throw new Error('Expected to get one or more image files from file picker');
      }
      return [];
    }
    return images;
  } catch (err) {
    if (flags & THROW_IF_EMPTY) {
      throw new Error('Expected to get one or more image files from file picker');
    }
    return [];
  }
};
