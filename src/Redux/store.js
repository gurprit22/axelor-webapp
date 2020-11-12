import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas/rootSaga';

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const middleWares = [sagaMiddleware,loggerMiddleware];

// if(process.env.NODE_ENV === 'development'){
//     middleWares.push(loggerMiddleware);
// }

const store = createStore(
    rootReducer,
    applyMiddleware(...middleWares)
);

sagaMiddleware.run(rootSaga);

export default store;