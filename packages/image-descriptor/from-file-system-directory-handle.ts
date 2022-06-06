import { assertNotEmpty } from './assert';
import { getImageDescriptorsFromFileSystemHandles } from './from-file-system-handles';
import { ImageDescriptor, ImageDescriptorFlags } from './types';

export const getImageDescriptorsFromFileSystemDirectoryHandle = async (directoryHandle: FileSystemDirectoryHandle, flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  const handles: FileSystemHandle[] = [];
  for await (const entry of directoryHandle.values()) {
    handles.push(entry);
  }
  const results = await getImageDescriptorsFromFileSystemHandles(handles);
  return assertNotEmpty(results, flags, 'Expected to get one or more image files from directory');
};
