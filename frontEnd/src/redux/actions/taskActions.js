import { createAction } from '@reduxjs/toolkit';

export const fetchTasks = createAction('FETCH_TASKS');
export const fetchTasksSuccess = createAction('FETCH_TASKS_SUCCESS');
export const fetchTasksFailure = createAction('FETCH_TASKS_FAILURE');

export const addTask = createAction('ADD_TASK');
export const addTaskSuccess = createAction('ADD_TASK_SUCCESS');
export const addTaskFailure = createAction('ADD_TASK_FAILURE');

export const updateTask = createAction('UPDATE_TASK');
export const updateTaskSuccess = createAction('UPDATE_TASK_SUCCESS');
export const updateTaskFailure = createAction('UPDATE_TASK_FAILURE');

export const deleteTask = createAction('DELETE_TASK');
export const deleteTaskSuccess = createAction('DELETE_TASK_SUCCESS');
export const deleteTaskFailure = createAction('DELETE_TASK_FAILURE');

export const uploadImageTask = createAction('UPLOAD_IMAGE_TASK');
export const uploadImageTaskSuccess = createAction('UPLOAD_IMAGE_TASK_SUCCESS');
export const uploadImageTaskFailure = createAction('UPLOAD_IMAGE_TASK_FAILURE');
