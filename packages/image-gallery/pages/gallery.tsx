import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { getImageDescriptorsFromDataTransfer } from 'image-descriptor';
import StoreGalleryImage from '../components/StoreGalleryImage';
import styles from '../styles/Home.module.css';
import { getAllImageURLs } from 'image-store';
import { addImageDescriptors } from 'image-store/actions';

const Gallery: React.FC = () => {
  const urls = useSelector(getAllImageURLs);
  const dispatch = useDispatch();

  const handleDataTransfer = useCallback((dt: DataTransfer) => {
    const newIDs = getImageDescriptorsFromDataTransfer(dt);
    console.group('Handle data transfer');
    dt.types.forEach((type) => {
      console.log(type, JSON.stringify(dt.getData(type)));
    });
    console.info('New images', newIDs.length, newIDs);
    console.groupEnd();
    if (newIDs.length) {
      dispatch(addImageDescriptors(newIDs));
    }
  }, [urls]);

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
    <div className={styles.container}>
      <Head>
        <title>Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ol>
        {urls.map((url, i) => (
          <StoreGalleryImage key={`${i}-${url}`} url={url} />
        ))}
      </ol>
    </div>
  );
};

export default Gallery;
