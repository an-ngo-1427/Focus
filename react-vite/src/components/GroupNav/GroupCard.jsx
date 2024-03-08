
// import {useNavigate} from 'react-router-dom'
import { IoIosCheckbox } from "react-icons/io"
import TaskCard from "../TaskCard"
import './GroupCard.css'
function GroupCard({ group }) {

    const boxName = (task) => {
        if (task.completed) return 'task-checkbox completed'
        else return 'task-checkbox'
    }
    const groupTasks = group.tasks

    if (!Object.values(group).length) return null
    return (
        <div className='group-tasks'>
            {groupTasks?.map(task => (
                <div key={task.id}
                    className="task-box"
                >

                    <IoIosCheckbox
                        className={boxName(task)}
                    />
                    <TaskCard key={task.id} task={task} group={group} />

                </div>
            )
            )}

        </div>
    )
}
export default GroupCard
