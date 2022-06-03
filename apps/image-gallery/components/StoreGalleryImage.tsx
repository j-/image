import { ImageDescriptor } from 'image-descriptor';
import { getImageDescriptorForURL } from 'image-store';
import { useSelector } from '../use-selector';
import GalleryImage from './GalleryImage';

type Props = Pick<ImageDescriptor, 'url'>;

const StoreGalleryImage: React.FC<Props> = ({ url }) => {
  const id = useSelector((state) => getImageDescriptorForURL(state, url));
  if (!id) return null;
  return <GalleryImage {...id} />;
};

export default StoreGalleryImage;
