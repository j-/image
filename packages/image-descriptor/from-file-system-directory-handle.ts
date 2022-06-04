import { getImageDescriptorsFromFileSystemHandles } from './from-file-system-handles';
import { ImageDescriptor } from './types';

export const getImageDescriptorsFromFileSystemDirectoryHandle = async (directoryHandle: FileSystemDirectoryHandle): Promise<ImageDescriptor[]> => {
  const handles: FileSystemHandle[] = [];
  for await (const entry of directoryHandle.values()) {
    handles.push(entry);
  }
  return getImageDescriptorsFromFileSystemHandles(handles);
};
