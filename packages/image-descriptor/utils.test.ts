import { getDataURIMediaType } from './utils';

describe('getDataURIMediaType()', () => {
  test.each([
    // From https://en.wikipedia.org/wiki/Data_URI_scheme
    ['data:text/vnd-example+xyz;foo=bar;base64,R0lGODdh', 'text/vnd-example+xyz;foo=bar'],
    ['data:text/plain;charset=UTF-8;page=21,the%20data:1234,5678', 'text/plain;charset=UTF-8;page=21'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAA...', 'image/png'],
    ['data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2w...', 'image/jpeg'],
    ['data:text/html;charset=utf-8,', 'text/html;charset=utf-8'],
    ['data:,Hello world', 'text/plain;charset=US-ASCII'],
  ])('%p', (input, expected) => {
    const actual = getDataURIMediaType(input);
    expect(actual).toBe(expected);
  });
});
