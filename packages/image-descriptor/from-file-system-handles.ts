import { getImageDescriptorsFromFileSystemHandle } from './from-file-system-handle';
import { ImageDescriptor } from './types';

export const getImageDescriptorsFromFileSystemHandles = async (handles: FileSystemHandle[]): Promise<ImageDescriptor[]> => {
  const results: ImageDescriptor[] = [];
  for (const handle of handles) {
    const ids = await getImageDescriptorsFromFileSystemHandle(handle);
    results.push(...ids);
  }
  return results;
};
