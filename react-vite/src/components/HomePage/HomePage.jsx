import { useDispatch, useSelector} from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import TaskForm from "../TaskFormModal";
import { getUserTasksThunk } from "../../redux/task";
import { useEffect } from "react";
// import {useNavigate} from 'react-router-dom'
import TaskCard from "../TaskCard";
import './HomePage.css'
import { getUserGroupsThunk } from "../../redux/group";

function HomePage(){
    const dispatch = useDispatch()
    const user = useSelector(state=>state.session.user)
    const userTasks = useSelector(state=>state.userTasks)
    // const userGroups = useSelector(state=>state.userGroups)

    useEffect(()=>{
        dispatch(getUserTasksThunk(user?.id))
        dispatch(getUserGroupsThunk())
    },[dispatch])
    return(
        <div>
            <OpenModalMenuItem
                itemText={'+ Add Task'}
                modalComponent={<TaskForm/>}
            />
            <div className = 'todo-window'>
                <h3>Your To Do&apos;s</h3>
                <div className = 'tasks-window'>
                    {Object.values(userTasks).map(task => (<TaskCard key = {task.id} task={task}/>))}
                </div>
            </div>
            <div className = 'todo-window'>
                <h3>Group To Do&apos;s</h3>
            </div>
        </div>
    )
}

export default HomePage
