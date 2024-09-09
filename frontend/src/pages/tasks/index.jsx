import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../lib/api'
import './styles.css'
import { FiPlusSquare } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { TaskModal } from './modal/task-modal';
import { useAuth } from '../../contexts/auth/useAuth'
import moment from 'moment'

const defaultFormData = {
    title: "",
    description: "",
    startDate: "",
    endDate: ""
}

export function Tasks() {

    const auth = useAuth();
    const navigate = useNavigate();

    const [todo, setTodo] = useState([]);
    const [inprogress, setInprogress] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const [formData, setFormData] = useState(defaultFormData);

    const onHandle = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const openAddModal = () => {
        setAddModal(true)
    };

    const openEditModal = () => {
        setEditModal(true)
    };

    const closeAddModal = () => {
        setAddModal(false)
    };

    const closeEditModal = () => {
        setEditModal(false)
    };

    const addTask = () => {
        setFormData(defaultFormData);
        openAddModal();
    }

    const editTask = (task) => {
        setFormData({
            id: task.id,
            title: task.name,
            description: task.taskDetail.description,
            startDate: moment(task.taskDetail.expectedStartDate).format('YYYY-MM-DD HH:mm:ss'),
            endDate: moment(task.taskDetail.expectedEndDate).format('YYYY-MM-DD HH:mm:ss')
        });
        openEditModal();
    }

    const newTask = async () => {
        try{
            const { title: name, description, startDate, endDate } = formData
            
            await api.post(`/api/users/${auth.user.id}/tasks`, {
                name, 
                description, 
                startDate,
                endDate
            });

        }catch(error){
            const message = error.response?.data?.message || 'Erro desconhecido';
            alert(JSON.stringify(message));
        }
    }

    const updateTask = async () => {
        try{
            const { id, title, description, startDate, endDate } = formData

            await api.put(`api/users/${auth.user.id}/tasks/${id}`, {
                name: title,
                description: description, 
                taskDetail: {
                    expectedStartDate: moment(startDate).toISOString(),
                    expectedEndDate: moment(endDate).toISOString()
                }
            });

        }catch(error){
            const message = error.response?.data?.message || 'Erro desconhecido';
            alert(JSON.stringify(message));
        }
    }

    const deleteTask = async (taskId) => {
        try{
            await api.delete(`api/users/${auth.user.id}/tasks/${taskId}`);

            navigate(0);
        }catch(error){
            const message = error.response?.data?.message || 'Erro desconhecido';
            alert(JSON.stringify(message));
        }
    }

    const nextSteep = async (task) => {
        try{
            await api.put(`api/users/${auth.user.id}/tasks/${task.id}`, {
                stage: task.stage + 1
            });

            navigate(0);
        }catch(error){
            const message = error.response?.data?.message || 'Erro desconhecido';
            alert(JSON.stringify(message));
        }
    }

    const previousSteep = async (task) => {
        try{
            await api.put(`api/users/${auth.user.id}/tasks/${task.id}`,{
                stage: task.stage - 1              
            })

            navigate(0);
        }catch(error){
            const message = error.response?.data?.message || 'Erro desconhecido';
            alert(JSON.stringify(message));
        }
    }
    
    const fetchData = async () => {
        try {
            const response = await api.get(`/api/users/${auth.user.id}/tasks`);
            const tasks = response.data;

            const todoTasks = [];
            const inprogressTasks = [];
            const completedTasks = [];

            tasks.forEach((task) => {
                if (task.stage === 0) {
                    todoTasks.push(task);
                } else if (task.stage === 1) {
                    inprogressTasks.push(task);
                } else {
                    completedTasks.push(task);
                }
            });

            setTodo(todoTasks);
            setInprogress(inprogressTasks);
            setCompleted(completedTasks);

        } catch (error) {
            const message = error.response?.data?.message || 'Erro desconhecido';
            alert(JSON.stringify(message));
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <div className='container'>
            <header className='header-infos'>
                <h1>Olá, {auth.user.name}</h1>
                <button type='button' onClick={auth.signOut}>Sair</button>
            </header>

            <main>
                <div className='container-stages'>

                    <section>
                        <header>
                            <h2>A Fazer</h2>
                            <FiPlusSquare className='icons add' onClick={addTask}/>                
                        </header>

                        <ul>
                            { todo.map((task) => (
                                <li key={task.id}>
                                    <p className='task-name'>{task.name}</p>
                                    <div className='task-actions'>
                                        <button type='button' className='task-button' onClick={() => nextSteep(task)}>
                                            Próxima Etapa
                                        </button>
                                        <IoTrashOutline className='icons' onClick={() => deleteTask(task.id)} />
                                        <FaRegEdit className='icons' onClick={() => editTask(task)}/>
                                    </div>
                                    <p className="task-dates">
                                        {moment(task.taskDetail.expectedStartDate).format('DD/MM/YY - HH:mm')} até {moment(task.taskDetail.expectedEndDate).format('DD/MM/YY - HH:mm')}
                                    </p>
                                    <hr />
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <header>
                            <h2>Em Progresso</h2>
                        </header>

                        <ul>
                            { inprogress.map((task) => (
                                <li key={task.id}>
                                    <p className='task-name'>{task.name}</p>
                                    <div className='task-actions'>
                                        <button type='button' className='task-button' onClick={() => nextSteep(task)}>
                                            Próxima Etapa
                                        </button>
                                        <button type='button' className='task-button' onClick={() => previousSteep(task)}>
                                            Voltar Etapa
                                        </button>
                                        <IoTrashOutline className='icons' onClick={() => deleteTask(task.id)} />
                                        <FaRegEdit className='icons' onClick={() => editTask(task)}/>
                                    </div>
                                    <p className="task-dates">
                                        {moment(task.taskDetail.expectedStartDate).format('DD/MM/YY - HH:mm')} até {moment(task.taskDetail.expectedEndDate).format('DD/MM/YY - HH:mm')}
                                    </p>
                                    <hr />
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <header>
                            <h2>Concluido</h2>
                        </header>

                        <ul>
                            { completed.map((task) => (
                                <li key={task.id}>

                                    <p className='task-name'>{task.name}</p>

                                    <div className='task-actions'>
                                        <button type='button' className='task-button' onClick={() => previousSteep(task)}>
                                            Voltar Etapa
                                        </button>
                                        <IoTrashOutline className='icons' onClick={() => deleteTask(task.id)} />
                                        <FaRegEdit className='icons' onClick={() => editTask(task)}/>
                                    </div>

                                    <p className="task-dates">
                                        {moment(task.taskDetail.expectedStartDate).format('DD/MM/YY - HH:mm')} até {moment(task.taskDetail.expectedEndDate).format('DD/MM/YY - HH:mm')}
                                    </p>

                                    <hr />
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                { addModal && (
                    <TaskModal 
                        title={formData.title}
                        description={formData.description}
                        startDate={formData.startDate}
                        endDate={formData.endDate}
                        action={newTask}
                        closeModal={closeAddModal}
                        onChange={onHandle}
                    />
                )}

                { editModal && (
                    <TaskModal 
                        modalTitle="Editar Tarefa"
                        title={formData.title}
                        description={formData.description}
                        startDate={formData.startDate}
                        endDate={formData.endDate}
                        action={updateTask}
                        closeModal={closeEditModal}
                        onChange={onHandle}
                    />
                )}

            </main>
        </div>
    )
}