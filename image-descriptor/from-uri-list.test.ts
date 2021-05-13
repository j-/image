import { getImageDescriptorsFromURIList } from './from-uri-list';
import { THROW_IF_EMPTY } from './types';

it('throws if given empty string when flag is set', () => {
  expect(() => {
    getImageDescriptorsFromURIList('', THROW_IF_EMPTY);
  }).toThrow('Expected at least one well formed URI in list');
});

it('does not throw if given empty string when flag is unset', () => {
  const actual = getImageDescriptorsFromURIList('');
  expect(actual).toEqual([]);
});

it('throws if not given a URL', () => {
  expect(() => {
    getImageDescriptorsFromURIList('FOOBAR');
  }).toThrow('Expected at least one well formed URI in list');
});

it('throws if given one or more invalid URLs', () => {
  expect(() => {
    getImageDescriptorsFromURIList('http://www.example.com/a.jpg\nFOOBAR\nhttp://www.example.com/b.png');
  }).toThrow('One or more URIs in list was not well formed');
});

it('returns an array of IDs if given URIs', () => {
  const actual = getImageDescriptorsFromURIList('http://www.example.com/a.jpg\nhttp://www.example.com/b.png');
  expect(actual).toEqual([
    { url: 'http://www.example.com/a.jpg' },
    { url: 'http://www.example.com/b.png' },
  ]);
});
