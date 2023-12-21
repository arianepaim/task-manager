import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions/taskActions';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faDownload } from '@fortawesome/free-solid-svg-icons';
import '../styles/taskForm.css';

const TaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    description: '',
    status: 'PENDING',
  });

  const [imageName, setImageName] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setTask((prevTask) => ({ ...prevTask, image: file }));
    setImageName(file ? file.name : '');
  };

  const handleRemoveImage = () => {
    setTask((prevTask) => ({ ...prevTask, image: null }));
    setImageName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addTask(task));
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="modern-table-container3">
      <div className="modern-table task-form-table">
        <h2 className="table-title3">Nova Tarefa</h2>
        <form className="container-form" onSubmit={handleSubmit}>
          <div className="form-info info-task mb">
            <label>Descrição:</label>
            <input
              type="text"
              name="description"
              value={task.description}
              onChange={handleInputChange}
              placeholder="Digite a descrição..."
              className="form-input w400 mb"
              required
            />

            <label>Status:</label>
            <select
              name="status"
              value={task.status}
              onChange={handleInputChange}
              className="form-input w411 status mb"
            >
              <option value="PENDING">Pendente</option>
              <option value="FINISHED">Finalizada</option>
            </select>

            <div className="file-upload-container">
              <label className="custom-file-upload">
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="file-input"
                />
                <FontAwesomeIcon icon={faDownload} size="2x" color="#3498db" />
                {!imageName && 'Imagem'}
              </label>

              {imageName && (
                <div className="file-info">
                  <span className="file-name">{imageName}</span>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="remove-button"
                  >
                    <span role="img" aria-label="Remove">
                      ❌
                    </span>
                  </button>
                </div>
              )}
            </div>

            <div className="btn-container">
              <button type="submit" className="save-button">
                <FontAwesomeIcon icon={faSave} size="1x" color="#fff" />
                Salvar
              </button>
              <button type="button" onClick={handleCancel} className="cancel-button">
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;