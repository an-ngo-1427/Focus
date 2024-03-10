import { useEffect, useState } from "react"
import { createUserTaskThunk, updateUserTaskThunk } from "../../redux/task"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { FaRegTrashAlt } from "react-icons/fa";
import {getUserGroupsThunk, updateGroupTaskThunk } from "../../redux/group";
import { useNavigate } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteTask from "../DeleteTask/DeleteTask";
import './TaskForm.css'
function TaskForm({ task, group }) {

    const [title, setTitle] = useState("")
    const [notes, setNotes] = useState("")
    const [links, setLinks] = useState("")
    const [deadline, setDeadline] = useState("")
    const [tag, setTag] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [err, setErr] = useState({})
    const [formErr, setFormerr] = useState(false)
    const [userId, setUserId] = useState("")
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const navigate = useNavigate()


    // const date = new Date(deadline)
    // console.log(Date.toISOString(deadline))

    useEffect(() => {
        if (!user) {
            closeModal()
            return navigate('/login')
        }
        let errObj = {}
        if (title.length <= 0) errObj.title = 'title is required'
        if (deadline) {
            if (Date.parse(deadline) < Date.now()) {
                errObj.deadline = 'Due Date must be in the future'
            }
        }
        setErr(errObj)

    }, [title, deadline])

    useEffect(() => {
        if (task) {
            setTitle(task.title)
            setNotes(task.notes ? task.notes : "")
            setLinks(task.links ? task.links : "")
            let dateString = new Date(task.deadline)
            dateString = dateString.toISOString().substring(0, 10)
            setDeadline(dateString)
            setTag(task.tag ? task.tag : "")
            setDifficulty(task.difficulty ? task.difficulty : "")
            // setGroupId(task.group_id ? task.group_id : "")
            if (group) {
                if (task.user) {
                    setUserId(task.user?.id)
                }
            }
        }
    }, [task])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (Object.values(err).length) setFormerr(true)
        else {
            if (!task) {
                const form = new FormData()
                form.append("title", title)
                form.append("notes", notes)
                form.append("links", links)
                form.append("deadline", deadline)
                form.append("tag", tag)
                form.append("difficulty", difficulty)

                dispatch(createUserTaskThunk(form, user.id))
                    .then(result => {
                        if (result.errors) {
                            window.alert(result.errors)
                        } else {
                            closeModal()
                        }
                    }
                    )
            } else {
                const updateObj = {
                    title,
                    notes,
                    links,
                    deadline,
                    tag,
                    difficulty
                }
                if (group) {
                    updateObj.user_id = userId

                    dispatch(updateGroupTaskThunk(group.id, task.id, updateObj)).
                        then(() => dispatch(getUserGroupsThunk())).
                        then(result => {
                            if (result.errors) {
                                return window.alert(result.errors)
                            } else {
                                return closeModal()
                            }
                        })
                } else {
                    dispatch(updateUserTaskThunk(updateObj, task.id))
                        .then(result => {
                            if (result.errors) {
                                window.alert(result.errors)
                            } else {
                                closeModal()
                            }
                        })

                }

            }
        }

    }

    return (
        <div>
            <form
                className="user-auth"
                onSubmit={handleSubmit}
            >
                {group && <div>Group: {group.name}</div>}
                <div className='form-link' onClick={closeModal}>cancel</div>
                <div className='field-labels'>
                    Title*
                </div>
                <input
                    placeholder="Task title"
                    name="title"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                >
                </input>
                {formErr && err.title && <div style={{ 'color': 'red' }}>{err.title}</div>}
                <div>
                    Group members
                </div>
                <div>
                    <select
                        onChange={(e) => setUserId(e.target.value)}
                        value={userId}
                    >
                        <option value=''>Assign to a member</option>
                        {group && group.users.map(user => <option key={user.id} value={user.id}>{`${user.first_name}, ${user.last_name}`}</option>)}

                    </select>

                </div>
                <div className='field-labels'>
                    Notes
                </div>
                <textarea
                    placeholder="Notes"
                    name='notes'
                    value={notes}
                    onChange={(e) => { setNotes(e.target.value) }}
                />
                <div className='field-labels'>
                    Links
                </div>
                <input
                    placeholder="links"
                    type='url'
                    name='links'
                    value={links}
                    onChange={(e) => { setLinks(e.target.value) }}
                />
                <div className='field-labels'>
                    Due Date
                </div>
                <input
                    type='date'
                    name='deadline'
                    value={deadline ? deadline : ""}
                    onChange={(e) => { setDeadline(e.target.value) }}
                />
                {formErr && err.deadline && <div style={{ 'color': 'red' }}>{err.deadline}</div>}
                <div className='field-labels'>
                    Tag
                </div>
                <select
                    value={tag}
                    onChange={(e) => { setTag(e.target.value) }}
                    name='tag'
                >
                    <option value="">Add tag</option>
                    <option value="work">Word</option>
                    <option value="exercise">Exercise</option>
                    <option value="health + Wellness">Health + Wellness</option>
                    <option value="school">School</option>
                    <option value="teams">Teams</option>
                    <option value="chores">Chores</option>
                    <option value="creativity">Creativity</option>
                </select>
                <div className='field-labels'>
                    Difficulty
                </div>
                <select
                    name='difficulty'
                    value={difficulty}
                    onChange={(e) => { setDifficulty(e.target.value) }}
                >
                    <option value="">Choose Difficulty level</option>
                    <option value={1}>Trivial</option>
                    <option value={2}>Easy</option>
                    <option value={3}>Medium</option>
                    <option value={4}>Hard</option>
                </select>

                <button type='submit' >{task ? 'Update Task' : 'Create Task'}</button>
                {/* {task && <div
                    className='task-delete' style={{ 'color': 'red' }}
                    onClick={handleDelete}
                >
                    <FaRegTrashAlt />Delete Task
                </div>
                } */}
                {task && <div className = 'task-delete'>
                    <FaRegTrashAlt />
                    <OpenModalMenuItem
                        itemText='Delete Task'
                        modalComponent={<DeleteTask task={task} taskGroup={group}/>}
                    />

                </div>
                }
            </form>
        </div>
    )
}

export default TaskForm
