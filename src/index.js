import { createRoot } from 'react-dom/client';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store } from 'store';

// style + assets
import 'assets/scss/style.scss';
import config from './config';

// firebase initialize
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCn2tSTHL6OuA81-nmSNBD_6UJ7vqfnmBI",
  authDomain: "kabbsuniversal-6efda.firebaseapp.com",
  databaseURL: "https://kabbsuniversal-6efda-default-rtdb.firebaseio.com",
  projectId: "kabbsuniversal-6efda",
  storageBucket: "kabbsuniversal-6efda.appspot.com",
  messagingSenderId: "149772945905",
  appId: "1:149772945905:web:b92b928062231bf263dc50",
  measurementId: "G-29JX5K8EVJ",
};

initializeApp(firebaseConfig);

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
