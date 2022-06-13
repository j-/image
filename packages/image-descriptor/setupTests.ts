export {};

beforeEach(() => {
  jest.spyOn(console, 'debug').mockImplementation(() => {});
});
