import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from "redux-thunk";

import {
    Button,
    Icon,
    Text
} from 'react-native-elements';

import StackRoot from './components/StackRootScreen'
import rootReducer from './redux/reducers'

/*
 * Starting point of the application
 * - Store initialization
 * - Middleware setup
 * - Redux Tools setup
*/

const actionLogger = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer, 
    // Preloaded state
    {
        request: {
            isFetching: false,
            didInvalidate: false,
            user_id: null,
            token: {
                access: null,
                refresh: null,
            },
        },
    }, 
    composeEnhancers(
        applyMiddleware(
            thunk,
            actionLogger,
        )
    ),
);

export default function App() {
    return (
        <Provider store={store}>
            <StackRoot/>
        </Provider>
  );
}
