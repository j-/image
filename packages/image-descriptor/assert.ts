import { ImageDescriptorFlags, THROW_IF_EMPTY } from './types';

export const assertNotEmpty = <T extends ArrayLike<unknown>>(
  results: T,
  flags: ImageDescriptorFlags = 0,
  message = 'Expected to get one or more image files'
) => {
  if (results.length === 0 && flags & THROW_IF_EMPTY) {
    throw new Error(message);
  }
  return results;
};
