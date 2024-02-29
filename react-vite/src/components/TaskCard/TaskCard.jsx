import './TaskCard.css'
import { SlCalender } from "react-icons/sl";
import { MdMenuOpen } from "react-icons/md";
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import TaskForm from '../TaskFormModal';
function TaskCard({ task }) {
    return (
        <>
            <div className="task-card">
                <div className='task-main'>

                    <div className='task-title'>
                        <span>{task.title}</span>
                    </div>
                    <div className='task-details'>
                        {task.notes}
                    </div>
                    {task.links &&
                        <div className='task-details'>
                            {task.links}
                        </div>}
                    {task.deadline &&
                        <div className='task-details'>
                            <SlCalender />
                            {task.deadline.substring(5, 16)}
                        </div>
                    }
                </div>
                <div>
                    {task.difficulty && <div>Difficulty: {task.difficulty}</div>}
                    {task.tag && <div>{task.tag}</div>}
                </div>
                <div className='task-edit'>
                    <OpenModalButton
                        modalComponent={<TaskForm task={task}/>}
                        buttonText={<MdMenuOpen />}
                    />

                </div>

            </div>

        </>

    )
}

export default TaskCard
