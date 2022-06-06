import { assertNotEmpty } from './assert';
import { getImageDescriptorsFromFileSystemFileHandles } from './from-file-system-file-handles';
import { ImageDescriptor, ImageDescriptorFlags } from './types';

export const getImageDescriptorsFromFilePicker = async (options: OpenFilePickerOptions = {}, flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  let results: ImageDescriptor[] = [];
  try {
    const handles = await window.showOpenFilePicker(options);
    results = await getImageDescriptorsFromFileSystemFileHandles(handles);
  } catch (err) {
    if (err.name === 'AbortError') {
      // Use cancelled file picker. Return empty images array.
      return [];
    }
    throw err;
  }
  return assertNotEmpty(results, flags, 'Expected to get one or more image files from file picker');
};
