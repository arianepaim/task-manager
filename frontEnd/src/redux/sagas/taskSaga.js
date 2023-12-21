import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchTasks,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTask,
  addTaskSuccess,
  addTaskFailure,
  updateTask,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTask,
  deleteTaskSuccess,
  deleteTaskFailure,
  uploadImageTaskSuccess,
  uploadImageTaskFailure,
  uploadImageTask
} from '../actions/taskActions';
import api from '../../services/api';


function* handleFetchTasks() {
  try {
    const response = yield call(api.get, '/api/tasks');
    yield put(fetchTasksSuccess(response.data));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

function* handleAddTask(action) {
  try {
    const response = yield call(api.post, '/api/tasks', action.payload);
    yield put(addTaskSuccess(response.data));

    if (action.payload.image) {
      const formData = new FormData();
      formData.append('file', action.payload.image);

      const uploadResponse = yield call(api.post, `/api/uploadFile/${response.data.id}`, formData);
      yield put(uploadImageTaskSuccess(uploadResponse.data));
    }
  } catch (error) {
    yield put(addTaskFailure(error.message));
    yield put(uploadImageTaskFailure(error.message));
  }
}


function* handleUpdateTask(action) {
  try {
    const response = yield call(api.put, `/api/tasks/${action.payload.id}`, action.payload);
    yield put(updateTaskSuccess(response.data));
    if (action.payload.image) {

      const formData = new FormData();
      formData.append('file', action.payload.image);

      const uploadResponse = yield call(api.put, `/api/uploadFile/${response.data.id}`, formData);
      yield put(uploadImageTaskSuccess(uploadResponse.data));
    }
  } catch (error) {
    yield put(updateTaskFailure(error.message));
    yield put(uploadImageTaskFailure(error.message));
  }
}

function* handleDeleteTask(action) {
  try {
    yield call(api.delete, `/api/tasks/${action.payload}`);
    yield put(deleteTaskSuccess(action.payload));
  } catch (error) {
    yield put(deleteTaskFailure(error.message));
  }
}

function* handleUploadImage(action) {
  try {
    const formData = new FormData();
    formData.append('file', action.payload.image);
    const response = yield call(api.post, `/api/uploadFile/${action.payload.idTask}`, formData);
    yield put(uploadImageTaskSuccess(response.data));
  } catch (error) {
    yield put(uploadImageTaskFailure(error.message));
  }
}

export default function* taskSaga() {
  yield takeLatest(fetchTasks, handleFetchTasks);
  yield takeLatest(addTask, handleAddTask);
  yield takeLatest(updateTask, handleUpdateTask);
  yield takeLatest(deleteTask, handleDeleteTask);
  yield takeLatest(uploadImageTask, handleUploadImage);
}
