import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskImage from './components/TaskImage';
import TaskEdit from './components/TaskEdit';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<TaskForm />} />
          <Route path="/image/:taskId" element={<TaskImage />} />
          <Route path="/edit/:taskId" element={<TaskEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


