import './styles.css';

export function TaskModal({
    modalTitle,
    title,
    description,
    startDate,
    endDate,
    action,
    closeModal,
    onChange
}) {
    return (
        <div className='modal-container'>
            <div className="modal">
                <div className='modal-header'>
                    <h2>{modalTitle || "Nova Tarefa"}</h2>
                    <button onClick={closeModal} className="modal-close-button">&times;</button>
                </div>
                <form onSubmit={action}>
                    <div className="modal-content">
                        <div>
                            <label htmlFor="title">Título:</label>
                            <input 
                                type="text" 
                                id="title" 
                                value={title}
                                onChange={onChange} 
                                name="title"
                                placeholder="Titulo da tarefa"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="description">Descrição:</label>
                            <textarea 
                                id="description" 
                                value={description} 
                                onChange={onChange} 
                                name="description"
                                rows="6"
                                placeholder="Descrição da tarefa"
                            ></textarea>
                        </div>
                        
                        <div>
                            <label htmlFor="startDate">Data inicial:</label>
                            <input 
                                type="datetime-local" 
                                id="startDate" 
                                value={startDate} 
                                onChange={onChange} 
                                name="startDate"
                            />
                        </div>

                        <div>
                            <label htmlFor="endDate">Data final:</label>
                            <input 
                                type="datetime-local" 
                                id="endDate" 
                                value={endDate} 
                                onChange={onChange} 
                                name="endDate"
                            />
                        </div>
                    </div>

                    <div className='modal-footer'>
                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}