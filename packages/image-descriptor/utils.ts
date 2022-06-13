export const cleanURL = (url: string): string => {
  return url.trim();
};

export const getDataURIMediaType = (dataURI: string): string => {
  const match = dataURI.match(/^data:(.+?)(?:;base64|,)/);
  // If <mediatype> is omitted, it defaults to text/plain;charset=US-ASCII.
  // https://datatracker.ietf.org/doc/html/rfc2397#section-2
  return match ? match[1] : 'text/plain;charset=US-ASCII';
};

export const isImageMediaType = (mediaType: string): mediaType is `image/${string}` => {
  return mediaType.startsWith('image/');
};

export const isTextMediaType = (mediaType: string): mediaType is `text/${string}` => {
  return mediaType.startsWith('text/');
};

export const isBlobURI = (url: string): url is `blob:${string}` => {
  return url.startsWith('blob:');
};

export const isDataURI = (url: string): url is `data:${string}` => {
  return url.startsWith('data:');
};

const defaultExtensions = [
  '.apng',
  '.avif',
  '.gif',
  '.jfif',
  '.jpeg',
  '.jpg',
  '.pjp',
  '.pjpeg',
  '.png',
  '.svg',
  '.webp',
];

export const isImageURL = (url: string, extensions = defaultExtensions): boolean => {
  url = url.toLowerCase();
  for (const extension of extensions) {
    if (url.endsWith(extension)) {
      return true;
    }
  }
  return false;
};

/** Adapted from https://stackoverflow.com/a/12300351 */
export const dataURIToBlob = (dataURI: string): Blob => {
  const byteString = Buffer.from(dataURI.split(',', 2)[1], 'base64').toString();
  const type = getDataURIMediaType(dataURI);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([arrayBuffer], { type });
};

/** Adapted from https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem#writing_to_clipboard */
export const imageURLToBlob = async (imageURL: string): Promise<Blob> => {
  const data = await fetch(imageURL);
  const blob = await data.blob();
  return blob;
};
