import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteUserTaskThunk } from "../../redux/task"
import { getGroupDetailsThunk } from "../../redux/group"
import { deleteGroupThunk } from "../../redux/group"
import './DeleteTask.css'
import { useNavigate } from "react-router-dom"
function DeleteTask({ task, taskGroup, group }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleDelete = async (e) => {
        if (task) {
            e.preventDefault()
            await dispatch(deleteUserTaskThunk(task.id))
            if (taskGroup) {

                await dispatch(getGroupDetailsThunk(taskGroup.id))
            }

            return closeModal()
        }
        if (group) {
            e.preventDefault()
            dispatch(deleteGroupThunk(group.id)).
                then(() => { navigate('/groups') })
            closeModal()
        }
    }
    return (
        <div className='delete-task-modal'>
            <div>Please confirm or cancel delete</div>
            <div className='delete-task-buttons'>
                <button style={{ 'backgroundColor': 'red' }} onClick={handleDelete}>{task ? 'Delete Task' : 'Delete Group'}</button>
                <button onClick={closeModal}>Cancel</button>

            </div>
        </div>
    )
}

export default DeleteTask
