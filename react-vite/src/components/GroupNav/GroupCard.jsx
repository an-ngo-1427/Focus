
// import {useNavigate} from 'react-router-dom'
import TaskCard from "../TaskCard"
import './GroupCard.css'
function GroupCard({ group }) {
    console.log(group)
    const groupTasks = group.tasks
    // const navigate = useNavigate()
    // const editGroup = (e)=>{
    //     e.preventDefault()
    //     navigate(`/groups/${group.id}/edit`)
    // }
    if(!Object.values(group).length) return null
    return (
        <div>
            {groupTasks?.map(task => <TaskCard key={task.id} task={task} group={group} />)}

        </div>
    )
}
export default GroupCard
