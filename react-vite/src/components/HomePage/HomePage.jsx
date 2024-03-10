import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import TaskForm from "../TaskFormModal";
import { completeTaskThunk, getUserTasksThunk } from "../../redux/task";
import { useEffect, useState } from "react";
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
    const [sortedTask, setSortedTask] = useState([...Object.values(userTasks)])

    console.log('not sorted', sortedTask)
    const dueDateSort = (sortedTask) => {
        const sortedArr = sortedTask.sort((taskA, taskB) => {
            const dateA = Date.parse(taskA.deadline)
            const dateB = Date.parse(taskB.deadline)
            if (dateA - dateB < 0) return -1
            else if (dateA - dateB > 0) return 1
            else return 0
        })

        setSortedTask([...sortedArr])
    }

    const difficultySort = (sortedTask) => {

        const sortedArr = sortedTask.sort((taskA, taskB) => {

            if (taskA.difficulty - taskB.difficulty < 0) return 1
            if (taskA.difficulty - taskB.difficulty > 0) return -1
            else return 0
        })

        setSortedTask([...sortedArr])
    }

    const tagSort = (sortedTask) => {
        const sortedArr = sortedTask.sort((taskA, taskB) => taskA.tag - taskB.tag)
        setSortedTask([...sortedArr])
    }

    useEffect(() => {
        dispatch(getUserTasksThunk(user?.id))
        dispatch(getUserGroupsThunk())
        if (!sortedTask.length) {
            setSortedTask([...Object.values(userTasks)])

        }

        console.log('entered sorted', Object.values(userTasks))
    }, [dispatch, sortedTask])

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
                <OpenModalMenuItem
                    className='member-button'
                    itemText={'+ Add Task'}
                    modalComponent={<TaskForm />}
                />
                <div className='tasks-window'>
                    <div className='sort-dropdown'>
                        <div className='sort-button'>Sort</div>
                        <div className = 'dropdown-options'>
                            <div onClick={() => { dueDateSort(sortedTask) }}>sort by date</div>
                            <div onClick={() => { difficultySort(sortedTask) }}>sort by difficulties</div>
                            <div onClick={() => { tagSort(sortedTask) }}>sort by tags</div>
                        </div>

                    </div>
                    {!user ? <div>login to manage your tasks!</div> : (
                        <div
                            style={{ 'display': 'flex', 'flex-direction': 'column', 'gap': '7px' }}
                        >
                            {sortedTask.map(task => (
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
                    )
                    }
                </div>
            </div>

        </div>
    )
}

export default HomePage
