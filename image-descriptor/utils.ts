export const cleanURL = (url: string): string => {
  return url.trim();
};

export const getDataURIMediaType = (dataURI: string): string => {
  const match = dataURI.match(/^data:(.+?)(?:;base64|,)/);
  // If <mediatype> is omitted, it defaults to text/plain;charset=US-ASCII.
  // https://datatracker.ietf.org/doc/html/rfc2397#section-2
  return match ? match[1] : 'text/plain;charset=US-ASCII';
};

export const isImageMediaType = (mediaType: string): boolean => {
  return /^image\/.*/.test(mediaType);
};

/** Adapted from https://stackoverflow.com/a/12300351 */
export const dataURIToBlob = (dataURI: string): Blob => {
  const byteString = atob(dataURI.split(',', 2)[1]);
  const type = getDataURIMediaType(dataURI);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([arrayBuffer], { type });
};
