import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import reducers from './reducers';

import App from './components/app/app';
import CheckAuth from './components/auth/checkAuth';
import Login from './components/passport/login';

import './styles/css/index.css';

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={CheckAuth(App)} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
