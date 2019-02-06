import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';

const store = createStore(
    rootReducer
);

ReactDOM.render(
  <Provider store={store}>
          <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
