import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTask, uploadImageTask, fetchTasks } from '../redux/actions/taskActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSave } from '@fortawesome/free-solid-svg-icons';
import '../styles/taskEdit.css';

const TaskEdit = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const task = tasks.find((t) => t.id.toString() === taskId);

  const [description, setDescription] = useState(task ? task.description : '');
  const [status, setStatus] = useState(task ? task.status : '');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    task && task.files ? `data:image/jpeg;base64,${task.files.data}` : null
  );
  const [originalImage, setOriginalImage] = useState(
    task && task.files ? `data:image/jpeg;base64,${task.files.data}` : null
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (task && task.files) {
      setOriginalImage(`data:image/jpeg;base64,${task.files.data}`);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (image && (task.files && task.files.id)) {
      const updatedTask = {
        id: taskId,
        description,
        status,
        image,
      };

      dispatch(updateTask(updatedTask));
      navigate('/');
      return 
    }
    if (image) {
      dispatch(uploadImageTask({ idTask: taskId, image }));
      navigate('/');
    }    
  };

  return (
    <div className="modern-table-container3">
      <div className="modern-table task-form-table3">
        <h2 className="table-title3">Editar tarefa</h2>
        {task && (
          <form className="form-container" onSubmit={handleSubmit}>
            <div className='form-info mb'>
              <label>
                Descrição:
              </label>
              <input
                type="text"
                className="form-input mb"
                placeholder="Digite a descrição..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label>
                Status:
              </label>
              <select className="form-input status mb" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="PENDING">Pendente</option>
                <option value="FINISHED">Finalizada</option>
              </select>
              <label className="custom-file-upload">
                <input
                  type="file"
                  className="file-input"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <FontAwesomeIcon icon={faDownload} size="2x" color="#3498db" />
                Imagem
              </label>
              <div className='btn-container'>
                <button className="edit-button" type="submit">
                  <FontAwesomeIcon icon={faSave} size="1x" color="#fff" />
                  Salvar
                </button>
                <button
                  className="cancel-button"
                  onClick={() => {
                    setPreviewImage(originalImage);
                    navigate('/');
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
            <div className='form-image'>
              {previewImage && (
                <div>
                  <h3>Imagem atual:</h3>
                  <img
                    src={previewImage}
                    alt="Preview Image"
                    style={{ maxWidth: '100%', maxHeight: '300px' }}
                  />
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TaskEdit;
