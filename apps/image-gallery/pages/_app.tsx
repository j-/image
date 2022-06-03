import { AppProps } from 'next/app';
import { createStore } from 'redux';
import rootReducer from 'image-store';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider as StoreProvider } from 'react-redux';
import '../styles/globals.css';

const store = createStore(rootReducer, composeWithDevTools());

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <StoreProvider store={store}>
    <Component {...pageProps} />
  </StoreProvider>
);

export default MyApp;
