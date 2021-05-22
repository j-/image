import { ImageDescriptor } from 'image-descriptor';
import { Reducer } from 'redux';
import { isActionAddImageDescriptors } from './actions';

export type RootReducerState = {
  descriptorsByUrl: {
    [url: string]: ImageDescriptor;
  };
};

export const INITIAL_STATE: RootReducerState = {
  descriptorsByUrl: {},
};

const reducer: Reducer<RootReducerState> = (state = INITIAL_STATE, action) => {
  if (isActionAddImageDescriptors(action)) {
    const descriptorsByUrl = { ...state.descriptorsByUrl };
    for (const id of action.payload.ids) {
      descriptorsByUrl[id.url] = id;
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
