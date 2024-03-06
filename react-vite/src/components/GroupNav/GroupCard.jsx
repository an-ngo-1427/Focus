import { useSelector} from "react-redux"
// import {useNavigate} from 'react-router-dom'
import TaskCard from "../TaskCard"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import GroupTaskForm from "../GroupTaskForm/GroupTaskForm"
import GroupForm from "../GroupForm/GroupForm"
import './GroupCard.css'
function GroupCard({ group }) {
    console.log(group)
    const groupTasks = group.tasks
    const user = useSelector(state => state.session.user)
    // const navigate = useNavigate()
    // const editGroup = (e)=>{
    //     e.preventDefault()
    //     navigate(`/groups/${group.id}/edit`)
    // }
    if(!Object.values(group).length) return null
    return (
        <div>
            <div  className="group-manage">
            {/* <h2>{group.name}</h2> */}
            {user.id == group.organizer?.id &&
                <OpenModalMenuItem
                    itemText={'Edit group'}
                    modalComponent={<GroupForm group={group}/>}
                />
            }
            {/* {user.id == group.organizer.id && <button>Add members</button>} */}
            {user.id == group.organizer?.id &&
                <OpenModalMenuItem
                    itemText={'+ Add Task'}
                    modalComponent={<GroupTaskForm group={group} />}
                />

            }

            </div>
            {groupTasks?.map(task => <TaskCard key={task.id} task={task} group={group} />)}

        </div>
    )
}
export default GroupCard
