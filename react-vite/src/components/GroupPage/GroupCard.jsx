import { useSelector} from "react-redux"
import {useNavigate} from 'react-router-dom'
import TaskCard from "../TaskCard"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import GroupTaskForm from "../GroupTaskForm/GroupTaskForm"
function GroupCard({ group }) {
    const groupTasks = group.tasks
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()
    const editGroup = (e)=>{
        e.preventDefault()
        navigate(`/groups/${group.id}/edit`)
    }

    return (
        <div>
            <h2>{group.name}</h2>
            {user.id == group.organizer.id && <button onClick={editGroup}>Edit Group</button>}
            {user.id == group.organizer.id && <button>Add members</button>}
            {user.id == group.organizer.id &&
                <OpenModalMenuItem
                    itemText={'+ Add Task'}
                    modalComponent={<GroupTaskForm group={group} />}
                />

            }
            {groupTasks.map(task => <TaskCard key={task.id} task={task} group={group} />)}

        </div>
    )
}
export default GroupCard
