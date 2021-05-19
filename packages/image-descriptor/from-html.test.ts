import { getImageDescriptorsFromHTML } from './from-html';
import { THROW_IF_EMPTY } from './types';

it('gets ID from data transfer text/html zoomed out', () => {
  const textHTML = '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"><img style="-webkit-user-select: none;margin: auto;cursor: zoom-in;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Alexander_cuts_the_Gordian_Knot.jpg" width="1764" height="1379">';
  const actual = getImageDescriptorsFromHTML(textHTML);
  expect(actual).toEqual([
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Alexander_cuts_the_Gordian_Knot.jpg',
      dimensions: {
        width: 1764,
        height: 1379,
      },
    },
  ]);
});

it('gets ID from data transfer text/html zoomed in', () => {
  const textHTML = '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"><img style="-webkit-user-select: none;margin: auto;cursor: zoom-out;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Alexander_cuts_the_Gordian_Knot.jpg" width="2048" height="1601">';
  const actual = getImageDescriptorsFromHTML(textHTML);
  expect(actual).toEqual([
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Alexander_cuts_the_Gordian_Knot.jpg',
      dimensions: {
        width: 2048,
        height: 1601,
      },
    },
  ]);
});

it('throws if given an empty string when flag is set', () => {
  expect(() => {
    getImageDescriptorsFromHTML('', THROW_IF_EMPTY);
  }).toThrow('Expected to find one or more image elements');
});

it('returns empty array if given an empty string when flag is unset', () => {
  const actual = getImageDescriptorsFromHTML('');
  expect(actual).toEqual([]);
});
