import { useEffect, useState } from 'react';
import Head from 'next/head';
import { ImageDescriptor, getImageDescriptorsFromDataTransfer } from 'image-descriptor';
import styles from '../styles/Home.module.css';

const Gallery: React.FC = () => {
  const [ids, setIDs] = useState<ImageDescriptor[]>([]);

  useEffect(() => {
    const handleDragover = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      const newIDs = getImageDescriptorsFromDataTransfer(e.dataTransfer);
      console.group('Handle drop');
      e.dataTransfer.types.forEach((type) => {
        console.log(type, JSON.stringify(e.dataTransfer.getData(type)));
      });
      console.info('New images', newIDs.length, newIDs);
      console.groupEnd();
      setIDs([
        ...ids,
        ...newIDs,
      ]);
    };

    const handlePaste = (e: ClipboardEvent) => {
      const newIDs = getImageDescriptorsFromDataTransfer(e.clipboardData);
      console.group('Handle paste');
      e.clipboardData.types.forEach((type) => {
        console.log(type, JSON.stringify(e.clipboardData.getData(type)));
      });
      console.info('New images', newIDs.length, newIDs);
      console.groupEnd();
      setIDs([
        ...ids,
        ...newIDs,
      ]);
    };

    window.addEventListener('dragover', handleDragover);
    window.addEventListener('drop', handleDrop);
    document.addEventListener('paste', handlePaste);

    return () => {
      window.removeEventListener('dragover', handleDragover);
      window.removeEventListener('drop', handleDrop);
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ol>
        {ids.map((id, i) => (
          <li key={`${i}-${id.url}`}>
            <img src={id.url} height="100" />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Gallery;
