export const isFileSystemFileHandle = (handle: FileSystemHandle): handle is FileSystemFileHandle => (
  handle.kind === 'file'
);

export const isFileSystemDirectoryHandle = (handle: FileSystemHandle): handle is FileSystemDirectoryHandle => (
  handle.kind === 'directory'
);
