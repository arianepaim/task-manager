import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTasks, updateTask, deleteTask } from '../redux/actions/taskActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faImage, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import '../styles/taskList.css';

const statusMapping = {
  'PENDING': 'Pendente',
  'FINISHED': 'Finalizada',
};

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchTasks());
    }, 500);
  }, [dispatch]);

  const handleUpdateTask = (task) => {
    if (task.status !== 'FINISHED') {
      const updatedTask = { ...task, status: 'FINISHED' };
      dispatch(updateTask(updatedTask));
    }
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Tem certeza de que deseja excluir esta tarefa?')) {
      dispatch(deleteTask(taskId));
    }
  };

  return (
    <div className='container'>
      <div className="modern-table-container">
        <div className="modern-table">
          <h2 className="table-title">Tarefas</h2>
          <div className="button-container">
            <Link to="/add">
              <button className="new-task-button">Nova tarefa</button>
            </Link>
          </div>
          {tasks.length === 0 ? (
            <div className="no-tasks-message">
              <p>Nenhuma tarefa encontrada.</p>
              <FontAwesomeIcon icon={faClipboardList} size="3x" color="#3498db" />
            </div>
          ) : (
            <table className="task-table">
              <thead>
                <tr>
                  <th className="table-header">Tarefa</th>
                  <th className="table-header">Status</th>
                  <th className="table-header"></th>
                  <th className="table-header"></th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="task-row">
                    <td className="task-description">{task.description}</td>
                    <td className="task-status">{statusMapping[task.status]}</td>
                    <td className="task-files">
                      {task.files && (
                        <Link to={`/image/${task.id}`} className="image-link">
                          <FontAwesomeIcon icon={faImage} size="2x" color="#3498db" />
                        </Link>
                      )}
                    </td>
                    <td className="task-actions">
                      <div className="task-actions-container">
                        {task.status !== 'FINISHED' && (
                          <Link to={`/edit/${task.id}`} className="edit-link">
                            <FontAwesomeIcon icon={faEdit} size="2x" color="#2ecc71" />
                          </Link>
                        )}
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="delete-button"
                        >
                          <FontAwesomeIcon icon={faTrash} size="2x" color="#e74c3c" />
                        </button>
                        <button
                          onClick={() => handleUpdateTask(task)}
                          disabled={task.status === 'FINISHED'}
                          className="update-button"
                        >
                          {task.status === 'PENDING' ? 'Concluir' : 'Concluída'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
