import { mockDataTransfer } from './__test__';
import { getImageDescriptorsFromDataTransfer } from './from-data-transfer';
import { THROW_IF_EMPTY } from './types';

it('returns empty array if given fresh data transfer object when flag is unset', () => {
  const dt = mockDataTransfer();
  const actual = getImageDescriptorsFromDataTransfer(dt);
  expect(actual).toEqual([]);
});

it('throws if given fresh data transfer object when flag is set', () => {
  const dt = mockDataTransfer();
  expect(() => {
    getImageDescriptorsFromDataTransfer(dt, THROW_IF_EMPTY);
  }).toThrow('Could not find any images in data transfer');
});

it('returns DT from HTML', () => {
  const dt = mockDataTransfer({
    types: ['text/html'],
  });
  dt.getData.mockImplementation(() => '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"><img style="-webkit-user-select: none;margin: auto;cursor: zoom-out;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Alexander_cuts_the_Gordian_Knot.jpg" width="2048" height="1601">');
  const actual = getImageDescriptorsFromDataTransfer(dt);
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

it('returns DT from URI list', () => {
  const dt = mockDataTransfer({
    types: ['text/uri-list'],
  });
  dt.getData.mockImplementation(() => 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Alexander_cuts_the_Gordian_Knot.jpg');
  const actual = getImageDescriptorsFromDataTransfer(dt);
  expect(actual).toEqual([
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Alexander_cuts_the_Gordian_Knot.jpg',
    },
  ]);
});
