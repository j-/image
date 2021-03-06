import { ALEXANDER_CUTS_THE_GORDIAN_KNOT_JPG, ANDROID_CHROME_192_BY_192_PNG } from './__test__';
import { getImageDescriptorsFromString } from './from-string';

it('returns an ID for HTTPS URL', () => {
  const url = ALEXANDER_CUTS_THE_GORDIAN_KNOT_JPG;
  const actual = getImageDescriptorsFromString(url);
  expect(actual).toEqual([
    { url },
  ]);
});

// TODO: Handle file URLs
it.skip('returns an ID for file URL', () => {
  const url = ANDROID_CHROME_192_BY_192_PNG;
  const actual = getImageDescriptorsFromString(url);
  expect(actual).toEqual([
    { url },
  ]);
});

it('returns an empty array if not given a recognized string', () => {
  const actual = getImageDescriptorsFromString('FOOBAR');
  expect(actual).toEqual([]);
});
