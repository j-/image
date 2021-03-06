import { AppProps } from 'next/app';
import { applyMiddleware, createStore, Middleware } from 'redux';
import rootReducer, { getAllImageURLs, RootReducerState } from 'image-store';
import { isActionAddImageDescriptors } from 'image-store/actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider as StoreProvider } from 'react-redux';
import '../styles/globals.css';

const middleware: Middleware<void, RootReducerState>[] = [
  /** Revoke object URLs whenever they are removed from the store. */
  (store) => (next) => (action) => {
    const before = getAllImageURLs(store.getState());
    next(action);
    const after = getAllImageURLs(store.getState());
    for (const url of before) {
      if (!after.includes(url)) {
        URL.revokeObjectURL(url);
      }
    }
  },
  /** Ignore ADD_IMAGE_DESCRIPTORS actions with no image descriptors. */
  () => (next) => (action) => {
    if (isActionAddImageDescriptors(action) && action.payload.ids.length === 0) {
      return;
    }
    next(action);
  },
];

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
);

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <StoreProvider store={store}>
    <Component {...pageProps} />
  </StoreProvider>
);

export default MyApp;
