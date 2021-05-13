import { RAW_1_BY_1_TRANSPARENT_PIXEL_PNG } from './__test__';
import { getImageDescriptorFromBlob } from './from-blob';
import { dataURIToBlob } from './utils';

const createObjectURL = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  Object.defineProperty(URL, 'createObjectURL', {
    writable: true,
    value: createObjectURL,
  });
});

it('returns type and object URL', () => {
  createObjectURL.mockReturnValue('blob:http://localhost/33d9d39c-0987-4aaa-a3c8-326ba9b36d80');
  const blob = dataURIToBlob(RAW_1_BY_1_TRANSPARENT_PIXEL_PNG);
  const actual = getImageDescriptorFromBlob(blob);
  expect(actual).toEqual({
    url: 'blob:http://localhost/33d9d39c-0987-4aaa-a3c8-326ba9b36d80',
    type: 'image/png',
    size: 68,
  });
});
