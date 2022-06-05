import { ImageDescriptor } from 'image-descriptor';
import { Reducer } from 'redux';
import { isActionAddImageDescriptors, isActionReset } from './actions';

export type RootReducerState = {
  descriptorsByUrl: {
    [url: string]: ImageDescriptor;
  };
};

export const INITIAL_STATE: RootReducerState = {
  descriptorsByUrl: {},
};

const reducer: Reducer<RootReducerState> = (state = INITIAL_STATE, action) => {
  if (isActionReset(action)) {
    return INITIAL_STATE;
  }

  if (isActionAddImageDescriptors(action)) {
    const descriptorsByUrl = { ...state.descriptorsByUrl };
    for (const id of action.payload.ids) {
      descriptorsByUrl[id.url] = {
        ...descriptorsByUrl[id.url],
        ...id,
      };
    }
    return {
      ...state,
      descriptorsByUrl,
    };
  }

  return state;
};

export default reducer;

export const getAllImageURLs = (state: RootReducerState) => (
  Object.keys(state.descriptorsByUrl)
);

export const getImageDescriptorForURL = (state: RootReducerState, url: string) => (
  getAllImageURLs(state)
    .map((url) => state.descriptorsByUrl[url])
    .find((id) => id.url === url)
);

export const getImageAttributes = (state: RootReducerState, url: string) => {
  const id = getImageDescriptorForURL(state, url);
  const attributes: Partial<HTMLImageElement> = {
    src: url,
  };
  if (!id) return attributes;
  if (id.dimensions) {
    attributes.width = id.dimensions.width;
    attributes.height = id.dimensions.height;
  }
  return attributes;
};
