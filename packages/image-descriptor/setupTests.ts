export {};

beforeEach(() => {
  jest.spyOn(console, 'debug').mockImplementation(() => {});
});

beforeEach(() => {
  Object.defineProperty(URL, 'createObjectURL', {
    writable: true,
    value: jest.fn(),
  });
});
