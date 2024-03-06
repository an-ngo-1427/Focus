import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import TaskForm from "../TaskFormModal";
import { completeTaskThunk, getUserTasksThunk } from "../../redux/task";
import { useEffect } from "react";
// import {useNavigate} from 'react-router-dom'
import TaskCard from "../TaskCard";
import './HomePage.css'
import { getUserGroupsThunk } from "../../redux/group";
import { IoIosCheckbox } from "react-icons/io";

function HomePage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const userTasks = useSelector(state => state.userTasks)
    // const userGroups = useSelector(state=>state.userGroups)

    useEffect(() => {
        dispatch(getUserTasksThunk(user?.id))
        dispatch(getUserGroupsThunk())
    }, [dispatch, user])

    const checkBox = (task) => {
        if (!task.completed) {
            dispatch(completeTaskThunk(task.id, 'POST'))
        } else {
            dispatch(completeTaskThunk(task.id, 'DELETE'))
        }
    }

    const boxName = (task) => {
        if (task.completed) return 'task-checkbox completed'
        else return 'task-checkbox'
    }
    return (
        <div>
            <div className='todo-window'>
                <h3>Your To Do&apos;s</h3>
                <div className='tasks-window'>
                    <OpenModalMenuItem
                        itemText={'+ Add Task'}
                        modalComponent={<TaskForm />}
                    />
                    {Object.values(userTasks).map(task => (
                        <div key={task.id} className='task-box'>
                            <IoIosCheckbox
                                // key={task.id}
                                className={boxName(task)}
                                onClick={() => { checkBox(task) }}
                            />
                            <TaskCard className='task-card' task={task} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default HomePage
