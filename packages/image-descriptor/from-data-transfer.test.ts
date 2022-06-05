import { mockDataTransfer } from './__test__';
import { getImageDescriptorsFromDataTransfer } from './from-data-transfer';
import { THROW_IF_EMPTY } from './types';

it('returns empty array if given fresh data transfer object when flag is unset', async () => {
  const dt = mockDataTransfer();
  const actual = await getImageDescriptorsFromDataTransfer(dt);
  expect(actual).toEqual([]);
});

it('throws if given fresh data transfer object when flag is set', async () => {
  const dt = mockDataTransfer();
  await expect(() => (
    getImageDescriptorsFromDataTransfer(dt, THROW_IF_EMPTY)
  )).rejects.toThrow('Could not find any images in data transfer');
});

it('returns DT from URI list', async () => {
  const dt = mockDataTransfer({
    types: ['text/uri-list'],
  });
  dt.getData.mockImplementation(() => 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Alexander_cuts_the_Gordian_Knot.jpg');
  const actual = await getImageDescriptorsFromDataTransfer(dt);
  expect(actual).toEqual([
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Alexander_cuts_the_Gordian_Knot.jpg',
    },
  ]);
});
