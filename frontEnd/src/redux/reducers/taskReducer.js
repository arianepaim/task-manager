import { createReducer } from '@reduxjs/toolkit';
import {
  fetchTasksSuccess,
  updateTaskSuccess,
  deleteTaskSuccess,
} from '../actions/taskActions';

const initialState = {
  tasks: [],
  task: {
    taskId: null,
  },
};

const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchTasksSuccess, (state, action) => {
      state.tasks = action.payload;
    })
    .addCase(updateTaskSuccess, (state, action) => {
      const updatedTask = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
    })
    .addCase(deleteTaskSuccess, (state, action) => {
      const deletedTaskId = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== deletedTaskId);
    })

});

export default taskReducer;
