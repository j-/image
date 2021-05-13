import { getImageDescriptorsFromResourceURLs } from './from-resource-urls';
import { THROW_IF_EMPTY } from './types';

it('throws if not given JSON', () => {
  expect(() => {
    getImageDescriptorsFromResourceURLs('');
  }).toThrow('Error parsing resource URLs JSON');
});

it('throws if not given JSON array', () => {
  expect(() => {
    getImageDescriptorsFromResourceURLs('{}');
  }).toThrow('Expected resource URLs to be an array');
});

it('throws if not given an array of URLs', () => {
  expect(() => {
    getImageDescriptorsFromResourceURLs('[123]');
  }).toThrow('One or more resource URLs in list was not well formed');
});

it('throws if given an empty array when flag is set', () => {
  expect(() => {
    getImageDescriptorsFromResourceURLs('[]', THROW_IF_EMPTY);
  }).toThrow('Expected at least one URL in list');
});

it('does not throw if given an empty array when flag is unset', () => {
  const actual = getImageDescriptorsFromResourceURLs('[]');
  expect(actual).toEqual([]);
});

it('parses a JSON array and returns IDs', () => {
  const input = '["file:///Users/j/Projects/web/libs/storybook/static/android-chrome-512x512.png","file:///Users/j/Projects/web/libs/storybook/static/android-chrome-192x192.png"]';
  const actual = getImageDescriptorsFromResourceURLs(input);
  expect(actual).toEqual([
    { url: 'file:///Users/j/Projects/web/libs/storybook/static/android-chrome-512x512.png' },
    { url: 'file:///Users/j/Projects/web/libs/storybook/static/android-chrome-192x192.png' },
  ]);
});
