import { useDispatch, useSelector } from "react-redux";

import TaskForm from "../TaskFormModal";
import {getUserTasksThunk } from "../../redux/task";
import { useEffect, useState } from "react";

import './HomePage.css'
import { getUserGroupsThunk } from "../../redux/group";

import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import TaskContainer from "../TaskContainer/TaskContainer";
function HomePage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const userTasks = useSelector(state => state.userTasks)
    // const userGroups = useSelector(state=>state.userGroups)
    // const [sortedTask, setSortedTask] = useState([])
    // const [categories, setCategories] = useState('active')
    // let activeTasks = Object.values(userTasks).filter(task => !task.completed)
    // let scheduledTasks = Object.values(userTasks).filter(task => (task.deadline && !task.completed))
    // let completedTasks = Object.values(userTasks).filter(task => task.completed)
    // let personalTasks = Object.values(userTasks).filter(task => !task.group_id)
    // let groupTasks = Object.values(userTasks).filter(task => task.group_id)

    const [personalTasks,setPersonalTasks] = useState()
    const [groupTasks,setGroupTasks] = useState()
    const [query, setQuery] = useState('')



    // useEffect(() => {
    //     // if (categories === 'active') setSortedTask(query.length ? activeTasks.filter(task => task.title.includes(query) || task.notes.includes(query)) : activeTasks)
    //     // if (categories === 'scheduled') setSortedTask(query.length ? scheduledTasks.filter(task => task.title.includes(query) || task.notes.includes(query)) : scheduledTasks)
    //     // if (categories === 'complete') setSortedTask(query.length ? completedTasks.filter(task => task.title.includes(query) || task.notes.includes(query)) : completedTasks)

    //     // filter user task using query input from user
    // }, [userTasks, query])
    console.log(personalTasks,groupTasks)
    useEffect(()=>{
        // if(!personalTasks?.length || !groupTasks?.length){
        //     setPersonalTasks(Object.values(userTasks).filter(task => !task.group_id))
        //     setGroupTasks(Object.values(userTasks).filter(task=>task.group_id))
        //     console.log('all tasks',personalTasks,groupTasks)
        // }
        setPersonalTasks(Object.values(userTasks).filter(task => !task.group_id))
        setGroupTasks(Object.values(userTasks).filter(task=>task.group_id))
        // if (query.length) {
        //     setPersonalTasks(personalTasks => personalTasks.filter(task=>task.title.includes(query)))
        //     setGroupTasks(groupTasks => groupTasks.filter(task => task.title.includes(query)))
        // }
        console.log('homepage effect',groupTasks)
    },[userTasks])

    useEffect(()=>{
        if (query.length) {
            // personalTasks = personalTasks.filter(task => task.title.includes(query))
            // groupTasks = groupTasks.filter(task => task.title.includes(query))
            setPersonalTasks(personalTasks => personalTasks.filter(task=>task.title.includes(query)))
            setGroupTasks(groupTasks => groupTasks.filter(task => task.title.includes(query)))
        }
    },[query])
    useEffect(() => {
        dispatch(getUserTasksThunk(user?.id))
        dispatch(getUserGroupsThunk())
    }, [dispatch])

    // const checkBox = (task) => {
    //     if (!task.completed) {
    //         dispatch(completeTaskThunk(task.id, 'POST'))
    //     } else {
    //         dispatch(completeTaskThunk(task.id, 'DELETE'))
    //     }
    // }

    // const boxName = (task) => {
    //     if (task.completed) return 'task-checkbox completed'
    //     else return 'task-checkbox'
    // }
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
            <div
                className="todo-container"
            >
                <div className='todo-window'>
                    <div>

                        {!user ? <div>login to manage your tasks!</div> : (
                            <div className="task-window">
                                <div>
                                    <h3>Your To Do&apos;s</h3>
                                    {personalTasks?.length ?
                                        <TaskContainer personalTasks={personalTasks}></TaskContainer>
                                        :
                                        <div>
                                            No tasks found!
                                        </div>
                                    }

                                </div>
                                <div>
                                    <h3>Group To Do&apos;s</h3>
                                    {groupTasks?.length ?
                                        <TaskContainer groupTasks={groupTasks} />
                                        :
                                        <div>No tasks found!</div>
                                    }
                                </div>

                            </div>
                        )
                        }
                    </div>

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
