import { useCallback, useState } from 'react';
import { ImageDescriptor } from 'image-descriptor';
import { isSourceOriginClean } from 'image-origin-clean';

type Props = ImageDescriptor;

const GalleryImage: React.FC<Props> = ({ url }) => {
  const [isClean, setIsClean] = useState<boolean | null>(null);

  const checkIsClean = useCallback(() => {
    let mounted = true;
    isSourceOriginClean(url).then((isClean) => {
      if (!mounted) return;
      setIsClean(isClean);
    }).catch(() => {
      if (!mounted) return;
      setIsClean(false);
    });
    return () => {
      mounted = false;
    };
  }, [url]);

  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} height="100" /><br />
      <button type="button" onClick={checkIsClean}>Check if image origin is clean</button><br />
      {
        isClean === null ? <em>Not checked</em> :
          isClean ? <strong style={{ color: 'green' }}>Image origin is clean</strong> :
            <strong style={{ color: 'red' }}>Image origin is NOT clean</strong>
      }
    </div>
  );
};

export default GalleryImage;
