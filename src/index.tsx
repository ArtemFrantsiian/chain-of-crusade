import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
          <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
