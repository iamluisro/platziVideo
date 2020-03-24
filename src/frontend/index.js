import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import reducer from './reducers';
import App from './routes/App';

if (typeof window !== 'undefined') {
  let composeEnhancers;
  if (process.env.NODE_ENV === 'production') composeEnhancers = compose;
  else composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const history = createBrowserHistory();
  const preloadedState = window.__PRELOADED_STATE__;
  const store = createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(thunk)));

  delete window.__PRELOADED_STATE__;

  ReactDOM.hydrate(
    <Provider store={store}>
      <Router history={history}>
        <App isLogged={(preloadedState.user.id)} />
      </Router>
    </Provider>,
    document.getElementById('app'),
  );
}
