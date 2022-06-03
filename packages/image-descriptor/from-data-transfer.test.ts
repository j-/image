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
