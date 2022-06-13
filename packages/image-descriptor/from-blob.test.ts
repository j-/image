import { RAW_1_BY_1_TRANSPARENT_PIXEL_PNG } from './__test__';
import { getImageDescriptorFromBlob } from './from-blob';
import { dataURIToBlob } from './utils';

it('returns type and object URL', () => {
  jest.mocked(URL.createObjectURL).mockReturnValue('blob:http://localhost/33d9d39c-0987-4aaa-a3c8-326ba9b36d80');
  const blob = dataURIToBlob(RAW_1_BY_1_TRANSPARENT_PIXEL_PNG);
  const actual = getImageDescriptorFromBlob(blob);
  expect(actual).toEqual({
    url: 'blob:http://localhost/33d9d39c-0987-4aaa-a3c8-326ba9b36d80',
    type: 'image/png',
    size: 68,
  });
});
