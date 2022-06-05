import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import {
  getImageDescriptorsFromClipboard,
  getImageDescriptorsFromDataTransfer,
  getImageDescriptorsFromDirectoryPicker,
  getImageDescriptorsFromFileInput,
  getImageDescriptorsFromFilePicker,
} from 'image-descriptor';
import StoreGalleryImage from '../components/StoreGalleryImage';
import { getAllImageURLs } from 'image-store';
import { addImageDescriptors, reset } from 'image-store/actions';

const Gallery: React.FC = () => {
  const urls = useSelector(getAllImageURLs);
  const dispatch = useDispatch();

  const handleDataTransfer = useCallback((dt: DataTransfer) => {
    try {
      const newIDs = getImageDescriptorsFromDataTransfer(dt);
      if (newIDs.length) {
        dispatch(addImageDescriptors(newIDs));
      }
    } catch (err) {
      console.error(err);
    }
  }, [urls]);

  const handleChangeFiles = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newIDs = getImageDescriptorsFromFileInput(e.currentTarget);
      if (newIDs.length) {
        dispatch(addImageDescriptors(newIDs));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleClickPasteFiles = useCallback(async () => {
    try {
      const newIDs = await getImageDescriptorsFromClipboard();
      if (newIDs.length) {
        dispatch(addImageDescriptors(newIDs));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleClickSelectFiles = useCallback(async () => {
    try {
      const newIDs = await getImageDescriptorsFromFilePicker({ multiple: true });
      if (newIDs.length) {
        dispatch(addImageDescriptors(newIDs));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleClickSelectDirectory = useCallback(async () => {
    try {
      const newIDs = await getImageDescriptorsFromDirectoryPicker();
      if (newIDs.length) {
        dispatch(addImageDescriptors(newIDs));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleClickClear = useCallback(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    const handleDragover = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      handleDataTransfer(e.dataTransfer);
    };

    const handlePaste = (e: ClipboardEvent) => {
      handleDataTransfer(e.clipboardData);
    };

    window.addEventListener('dragover', handleDragover);
    window.addEventListener('drop', handleDrop);
    document.addEventListener('paste', handlePaste);

    return () => {
      window.removeEventListener('dragover', handleDragover);
      window.removeEventListener('drop', handleDrop);
      document.removeEventListener('paste', handlePaste);
    };
  }, [handleDataTransfer]);

  return (
    <>
      <Head>
        <title>Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <input type="file" onChange={handleChangeFiles} multiple /><br />
      <button type="button" onClick={handleClickPasteFiles}>Paste files</button>
      <button type="button" onClick={handleClickSelectFiles}>Select files</button>
      <button type="button" onClick={handleClickSelectDirectory}>Select directory</button><br />
      <button type="button" onClick={handleClickClear}>Clear files</button>

      <ol>
        {urls.map((url, i) => (
          <StoreGalleryImage key={`${i}-${url}`} url={url} />
        ))}
      </ol>
    </>
  );
};

export default Gallery;
