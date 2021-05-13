export interface ImageDescriptor {
  url: string;
  /** File name if known */
  name?: string;
  /** MIME type if known */
  type?: string;
  /** Size in bytes if known */
  size?: number;
  /** Width and height if known */
  dimensions?: Dimensions;
}

export interface Dimensions {
  width: number;
  height: number;
}

export type ImageDescriptorFlags = number;

export enum ImageDescriptorFlag {
  THROW_IF_EMPTY = 1 << 0,
}

export const THROW_IF_EMPTY = ImageDescriptorFlag.THROW_IF_EMPTY;
