import { Action } from 'redux';
import { ImageDescriptor } from 'image-descriptor';

export const ACTION_ADD_IMAGE_DESCRIPTORS = 'ADD_IMAGE_DESCRIPTORS';

export interface ActionAddImageDescriptors extends Action<typeof ACTION_ADD_IMAGE_DESCRIPTORS> {
  payload: {
    ids: ImageDescriptor[];
  };
}

export const isActionAddImageDescriptors = (action: Action): action is ActionAddImageDescriptors => (
  action.type === ACTION_ADD_IMAGE_DESCRIPTORS
);

export const addImageDescriptors = (ids: ImageDescriptor[]): ActionAddImageDescriptors => ({
  type: ACTION_ADD_IMAGE_DESCRIPTORS,
  payload: {
    ids,
  },
});
