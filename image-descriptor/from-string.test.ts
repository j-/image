import { ALEXANDER_CUTS_THE_GORDIAN_KNOT_JPG, ANDROID_CHROME_192_BY_192_PNG } from './__test__';
import { getImageDescriptorFromString } from './from-string';

it('returns an ID for HTTPS URL', () => {
  const url = ALEXANDER_CUTS_THE_GORDIAN_KNOT_JPG;
  const actual = getImageDescriptorFromString(url);
  expect(actual).toEqual({
    url,
  });
});

it('returns an ID for file URL', () => {
  const url = ANDROID_CHROME_192_BY_192_PNG;
  const actual = getImageDescriptorFromString(url);
  expect(actual).toEqual({
    url,
  });
});

it('throws if not given a recognized string', () => {
  expect(() => {
    getImageDescriptorFromString('FOOBAR');
  }).toThrow('Did not recognize string format');
});
