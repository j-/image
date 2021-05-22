import { createStore, Store } from 'redux';
import { addImageDescriptors } from './actions';
import rootReducer, {
  getAllImageURLs,
  getImageDescriptorForURL,
  INITIAL_STATE,
  RootReducerState,
} from '.';

let store: Store<RootReducerState>;

beforeEach(() => {
  store = createStore(rootReducer);
});

describe('addImageDescriptors()', () => {
  it('ignores empty arrays', () => {
    const action = addImageDescriptors([]);
    store.dispatch(action);
    const state = store.getState();
    expect(state).toEqual(INITIAL_STATE);
    expect(getAllImageURLs(state)).toEqual([]);
  });

  it('adds a single image descriptor', () => {
    const action = addImageDescriptors([
      { url: 'http://localhost/image.png' },
    ]);
    store.dispatch(action);
    const state = store.getState();
    expect(getAllImageURLs(state)).toEqual([
      'http://localhost/image.png',
    ]);
  });

  it('adds multiple image descriptors', () => {
    const action = addImageDescriptors([
      { url: 'http://localhost/a.png' },
      { url: 'http://localhost/b.png' },
    ]);
    store.dispatch(action);
    const state = store.getState();
    expect(getAllImageURLs(state)).toEqual([
      'http://localhost/a.png',
      'http://localhost/b.png',
    ]);
  });

  it('does not add the same image descriptor twice', () => {
    const action = addImageDescriptors([
      { url: 'http://localhost/a.png' },
      { url: 'http://localhost/a.png' },
    ]);
    store.dispatch(action);
    const state = store.getState();
    expect(getAllImageURLs(state)).toHaveLength(1);
  });

  it('merges information from multiple descriptors', () => {
    const action = addImageDescriptors([
      { url: 'http://localhost/a.png', type: 'image/png' },
      { url: 'http://localhost/a.png', size: 1e6 },
    ]);
    store.dispatch(action);
    const state = store.getState();
    const id = getImageDescriptorForURL(state, 'http://localhost/a.png');
    expect(id).toEqual({
      url: 'http://localhost/a.png',
      type: 'image/png',
      size: 1e6,
    });
  });
});
