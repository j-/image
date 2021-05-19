export const ALEXANDER_CUTS_THE_GORDIAN_KNOT_JPG = 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Alexander_cuts_the_Gordian_Knot.jpg';
export const ANDROID_CHROME_192_BY_192_PNG = 'file:///Users/j/Projects/web/libs/storybook/static/android-chrome-512x512.png';
export const LOCALHOST_BLOB_URL = 'blob:http://localhost:3000/457d5bd3-ccfd-44e3-8008-79d2f39b4563';
export const RAW_1_BY_1_TRANSPARENT_PIXEL_PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
export const RAW_1_BY_1_TRANSPARENT_PIXEL_GIF = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

export class MockFileList implements FileList {
  [index: number]: File;
  [Symbol.iterator] = jest.fn();
  length = 0;
  item = jest.fn();
}

export const mockFileList = (defaults: Partial<MockFileList> = {}): MockFileList => (
  Object.assign(new MockFileList(), defaults)
);

export class MockDataTransferItemList implements DataTransferItemList {
  [index: number]: DataTransferItem;
  [Symbol.iterator] = jest.fn();
  length = 0;
  add = jest.fn();
  clear = jest.fn();
  item = jest.fn();
  remove = jest.fn();
}

export const mockDataTransferItemList = (defaults: Partial<MockDataTransferItemList> = {}): MockDataTransferItemList => (
  Object.assign(new MockDataTransferItemList(), defaults)
);

export class MockDataTransfer implements DataTransfer {
  dropEffect: DataTransfer['dropEffect'] = 'none';
  effectAllowed: DataTransfer['effectAllowed'] = 'uninitialized';
  files = new MockFileList();
  items = new MockDataTransferItemList();
  types: string[] = [];
  clearData = jest.fn();
  getData = jest.fn();
  setData = jest.fn();
  setDragImage = jest.fn();
}

export const mockDataTransfer = (defaults: Partial<MockDataTransfer> = {}): MockDataTransfer => (
  Object.assign(new MockDataTransfer(), defaults)
);
