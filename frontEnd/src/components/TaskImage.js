import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchTasks } from '../redux/actions/taskActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const TaskImage = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const task = tasks.find((t) => t.id.toString() === taskId);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div>
      {task && task.files && (
        <div>
          <img
            src={`data:image/jpeg;base64,${task.files.data}`}
            alt="Task Image"
            style={{
              maxWidth: '100%',
              maxHeight: '98vh',
              display: 'block',
              margin: 'auto',
            }}
          />
          <Link to="/" style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
            <FontAwesomeIcon icon={faArrowLeft} size="3x" /> 
          </Link>
        </div>
      )}
    </div>
  );
};

export default TaskImage;
