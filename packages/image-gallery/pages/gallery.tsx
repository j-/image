import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { ImageDescriptor, getImageDescriptorsFromDataTransfer } from 'image-descriptor';
import styles from '../styles/Home.module.css';

const Gallery: React.FC = () => {
  const [ids, setIDs] = useState<ImageDescriptor[]>([]);

  const handleDataTransfer = useCallback((dt: DataTransfer) => {
    const newIDs = getImageDescriptorsFromDataTransfer(dt);
    console.group('Handle data transfer');
    dt.types.forEach((type) => {
      console.log(type, JSON.stringify(dt.getData(type)));
    });
    console.info('New images', newIDs.length, newIDs);
    console.groupEnd();
    setIDs([
      ...ids,
      ...newIDs,
    ]);
  }, [ids]);

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
        {ids.map((id, i) => (
          <li key={`${i}-${id.url}`}>
            <img src={id.url} height="100" crossOrigin="anonymous" />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Gallery;
