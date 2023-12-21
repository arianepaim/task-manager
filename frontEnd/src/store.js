import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../src/redux/reducers/taskReducer';
import taskSaga from '../src/redux/sagas/taskSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['ADD_TASK', 'UPDATE_TASK', 'UPLOAD_IMAGE_TASK'],
    },
  }).concat(sagaMiddleware),
});

sagaMiddleware.run(taskSaga);

export default store;
