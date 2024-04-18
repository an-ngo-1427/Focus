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


    const [personalTasks,setPersonalTasks] = useState()
    const [groupTasks,setGroupTasks] = useState()
    const [query, setQuery] = useState('')




    console.log(personalTasks,groupTasks)
    useEffect(()=>{
        setPersonalTasks(Object.values(userTasks).filter(task => !task.group_id))
        setGroupTasks(Object.values(userTasks).filter(task=>task.group_id))
    },[userTasks])

    useEffect(()=>{
        if (query.length) {
            setPersonalTasks(Object.values(userTasks).filter(task=>task.title.includes(query) && !task.group_id))
            setGroupTasks(Object.values(userTasks).filter(task => task.title.includes(query) && task.group_id))
        }else{
            setPersonalTasks(Object.values(userTasks).filter(task => !task.group_id))
            setGroupTasks(Object.values(userTasks).filter(task=>task.group_id))
        }
    },[query])

    useEffect(() => {
        dispatch(getUserTasksThunk(user?.id))
        dispatch(getUserGroupsThunk())
    }, [dispatch])

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
