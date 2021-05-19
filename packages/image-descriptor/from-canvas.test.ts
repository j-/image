import { RAW_1_BY_1_TRANSPARENT_PIXEL_PNG } from './__test__';
import { getImageDescriptorFromCanvas } from './from-canvas';

const toDataURL = jest.fn();
const createObjectURL = jest.fn();
const mockCanvas = ({
  toDataURL,
  width: 320,
  height: 240,
} as unknown) as HTMLCanvasElement;

beforeEach(() => {
  jest.clearAllMocks();
  Object.defineProperty(URL, 'createObjectURL', {
    writable: true,
    value: createObjectURL,
  });
});

it('returns type and object URL', () => {
  createObjectURL.mockReturnValue('blob:http://localhost/33d9d39c-0987-4aaa-a3c8-326ba9b36d80');
  toDataURL.mockReturnValue(RAW_1_BY_1_TRANSPARENT_PIXEL_PNG);
  const actual = getImageDescriptorFromCanvas(mockCanvas);
  expect(actual).toEqual({
    url: 'blob:http://localhost/33d9d39c-0987-4aaa-a3c8-326ba9b36d80',
    type: 'image/png',
    size: 68,
    dimensions: {
      width: 320,
      height: 240,
    },
  });
});
