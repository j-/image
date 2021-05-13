import { JSDOM } from 'jsdom';
import { ImageDescriptor, ImageDescriptorFlags, THROW_IF_EMPTY } from './types';
import { getImageDescriptorFromImageElement } from './from-image-element';

export const getImageDescriptorsFromHTML = (html: string, flags: ImageDescriptorFlags = 0): ImageDescriptor[] => {
  const frag = JSDOM.fragment(html);
  const images = frag.querySelectorAll('img');
  if (images.length === 0) {
    if (flags & THROW_IF_EMPTY) {
      throw new Error('Expected to find one or more image elements');
    }
    return [];
  }
  return Array.from(images, getImageDescriptorFromImageElement);
};
