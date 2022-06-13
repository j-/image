import { assertNotEmpty } from './assert';
import { getImageDescriptorsFromFileSystemHandles } from './from-file-system-handles';
import { ImageDescriptor, ImageDescriptorFlags, THROW_IF_EMPTY } from './types';

export const getImageDescriptorsFromFileSystemDirectoryHandle = async (directoryHandle: FileSystemDirectoryHandle, flags: ImageDescriptorFlags = 0): Promise<ImageDescriptor[]> => {
  console.debug('getImageDescriptorsFromFileSystemDirectoryHandle');
  const handles: FileSystemHandle[] = [];
  for await (const entry of directoryHandle.values()) {
    handles.push(entry);
  }
  const results = await getImageDescriptorsFromFileSystemHandles(handles, flags & ~THROW_IF_EMPTY);
  return assertNotEmpty(results, flags, 'Expected to get one or more image files from directory');
};
