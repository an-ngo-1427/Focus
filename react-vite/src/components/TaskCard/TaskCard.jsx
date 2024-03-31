import './TaskCard.css'
import { SlCalender } from "react-icons/sl";
import { MdMenuOpen } from "react-icons/md";
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import TaskForm from '../TaskFormModal';
import { MdOutlinePerson } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { assignUserTaskThunk } from '../../redux/task';
import { getGroupDetailsThunk } from '../../redux/group';
import { FaTag } from "react-icons/fa";
function TaskCard({ task, group }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const addTask = () => {
        dispatch(assignUserTaskThunk(task.id)).
            then(result => {
                if (result.message) {
                    window.alert(result.message)
                } else {
                    window.alert('task added')
                }
            }).
            then(() => { dispatch(getGroupDetailsThunk(group.id)) })
    }

    if (!user) return null
    const setButtonName = () => {
        if (group) {
            if (group.organizer.id == user.id) return 'show'
        }
        if (user.id == task.user?.id && !task.group_id) return 'show'
        return 'hidden'
    }

    return (
        <>
            <div className="task-card">
                <div className='task-main'>
                    <div className='task-title'>
                        <span>{task.title}</span>
                    </div>
                    <ul>
                        <li style={{ 'fontSize': 'small' }} className='task-details'>
                            {task.notes}
                        </li>
                        {task.links &&
                            <li className='task-details'>
                                <a rel="noreferrer noreferrer" href={task.links} target='_blank'>Link for {task.title}</a>
                            </li>}

                    </ul>
                    {task.deadline &&
                        <div className='task-details'
                            style={{ 'fontSize': 'small' }}
                        >
                            <SlCalender />
                            {task.deadline.substring(5, 16)}
                        </div>
                    }
                </div>
                <div className='extra-info'>
                    {task.difficulty && <div>Difficulty: {task.difficulty}</div>}
                    {task.tag && <div className='tag'><FaTag /> {task.tag}</div>}
                </div>
                <div className='task-edit'>
                    <div className='edit-button'>
                        {<OpenModalButton
                            className={`${setButtonName()}`}
                            modalComponent={<TaskForm task={task} group={group} />}
                            buttonText={<MdMenuOpen />}
                        />}
                        {!task.user && !task.completed && <div className='add-task' onClick={addTask}><IoMdAdd /></div>}

                    </div>

                    {task.user && task.group_id && <div className='user'><MdOutlinePerson /> {task.user.first_name} </div>}
                </div>
                {/* {group && <div>Group: {group.name}</div>} */}

            </div>

        </>

    )
}

export default TaskCard
