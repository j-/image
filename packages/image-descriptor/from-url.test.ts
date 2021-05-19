import { ALEXANDER_CUTS_THE_GORDIAN_KNOT_JPG, ANDROID_CHROME_192_BY_192_PNG, LOCALHOST_BLOB_URL } from './__test__';
import { getImageDescriptorFromURL } from './from-url';

it('returns an ID for HTTPS URL', () => {
  const url = ALEXANDER_CUTS_THE_GORDIAN_KNOT_JPG;
  const actual = getImageDescriptorFromURL(url);
  expect(actual).toEqual({
    url,
  });
});

it('returns an ID for file URL', () => {
  const url = ANDROID_CHROME_192_BY_192_PNG;
  const actual = getImageDescriptorFromURL(url);
  expect(actual).toEqual({
    url,
  });
});

it('throws if not given a URL', () => {
  expect(() => {
    getImageDescriptorFromURL('FOOBAR');
  }).toThrow('Input was not a URL');
});

it('handles a blob URL', () => {
  const actual = getImageDescriptorFromURL(LOCALHOST_BLOB_URL);
  expect(actual).toEqual({
    url: LOCALHOST_BLOB_URL,
  });
});
