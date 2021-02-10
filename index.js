import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise';

import rootReducer from './store/reducers/studentsReducer';

const composeEnhancer = compose;

const createStoreWithMiddleware = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(promiseMiddleware)),
);

console.disableYellowBox = true;
const appRedux = () => (
  <Provider store={createStoreWithMiddleware}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => appRedux);
