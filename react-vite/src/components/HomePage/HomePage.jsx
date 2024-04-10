import { useDispatch, useSelector } from "react-redux";

import TaskForm from "../TaskFormModal";
import { completeTaskThunk,getUserTasksThunk } from "../../redux/task";
import { useEffect, useState } from "react";
import TaskCard from "../TaskCard";
import './HomePage.css'
import { getUserGroupsThunk } from "../../redux/group";
import { IoIosCheckbox } from "react-icons/io";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
function HomePage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const userTasks = useSelector(state => state.userTasks)
    // const userGroups = useSelector(state=>state.userGroups)
    const [sortedTask, setSortedTask] = useState([])
    const [categories, setCategories] = useState('active')
    let activeTasks = Object.values(userTasks).filter(task => !task.completed)
    let scheduledTasks = Object.values(userTasks).filter(task => (task.deadline && !task.completed))
    let completedTasks = Object.values(userTasks).filter(task => task.completed)


    const [query, setQuery] = useState('')

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
        if (categories === 'active') setSortedTask(query.length ? activeTasks.filter(task => task.title.includes(query) || task.notes.includes(query)) : activeTasks)
        if (categories === 'scheduled') setSortedTask(query.length ? scheduledTasks.filter(task => task.title.includes(query) || task.notes.includes(query)) : scheduledTasks)
        if (categories === 'complete') setSortedTask(query.length ? completedTasks.filter(task => task.title.includes(query) || task.notes.includes(query)) : completedTasks)

        // filter user task using query input from user
    }, [userTasks, categories, query])



    useEffect(() => {
        dispatch(getUserTasksThunk(user?.id))
        dispatch(getUserGroupsThunk())
        if (!sortedTask.length) setSortedTask([...Object.values(userTasks)])
        console.log('sortedTask', sortedTask)

    }, [dispatch])

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
        <div className="home-page">
            <div className="homepage-int">

                    <input
                        className="search-box"
                        placeholder="Search for task"
                        onChange={(e) => setQuery(e.target.value)}
                    ></input>

                <OpenModalButton
                    className='add-task-button'
                    buttonText='+ Add Task'
                    modalComponent={<TaskForm />}
                />

            </div>
            <div className='todo-window'>
                <div className='todo-window-cag'>
                    <h3>Your To Do&apos;s</h3>
                    <div className="categories">
                        <span onClick={() => { setCategories('active') }} className={categories === 'active' ? 'selected' : ''}>Active</span>
                        <span onClick={() => { setCategories('scheduled') }} className={categories === 'scheduled' ? 'selected' : ''}>Scheduled</span>
                        <span onClick={() => { setCategories('complete') }} className={categories === 'complete' ? 'selected' : ''}>Complete</span>
                    </div>

                </div>
                <div className='tasks-window'>
                    <div className='sort-dropdown'>
                        <div className='sort-button'>Sort</div>
                        <div className='dropdown-options'>
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
            <footer>
                <div className="footer-container">
                    <div className='footer-title'>Developer</div>
                    <div className="footer-link"><a href="https://an-ngo-1427.github.io/#one">An Ngo</a></div>
                    <div className="footer-link"><a href='https://github.com/an-ngo-1427/Focus'>GitHub</a></div>

                </div>
                <div className="footer-container">
                    <div className='footer-title'>Contact</div>

                    <div className='footer-detail'>
                        <MdEmail />
                        anng0149@gmail.com
                    </div>
                    <div className="footer-detail">
                        <a href='https://www.linkedin.com/in/an-ngo-79a07a122/'>
                            <FaLinkedin />
                        </a>

                    </div>

                </div>
            </footer>

        </div>
    )
}

export default HomePage
