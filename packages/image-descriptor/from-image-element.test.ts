import { ALEXANDER_CUTS_THE_GORDIAN_KNOT_JPG } from './__test__';
import { getImageDescriptorFromImageElement } from './from-image-element';

it('throws for an uninitialized image', () => {
  const image = new Image();
  expect(() => {
    getImageDescriptorFromImageElement(image);
  }).toThrow('Image did not have a source');
});

it('returns an ID for initialized image', () => {
  const url = ALEXANDER_CUTS_THE_GORDIAN_KNOT_JPG + '?t=' + Date.now();
  const image = new Image();
  image.src = url;
  const actual = getImageDescriptorFromImageElement(image);
  expect(actual).toEqual({
    url,
  });
});

it('returns an ID width dimensions for initialized image with dimensions', () => {
  const url = ALEXANDER_CUTS_THE_GORDIAN_KNOT_JPG;
  const image = new Image(2048, 1601);
  image.src = url;
  const actual = getImageDescriptorFromImageElement(image);
  expect(actual).toEqual({
    url,
    dimensions: {
      width: 2048,
      height: 1601,
    },
  });
});
