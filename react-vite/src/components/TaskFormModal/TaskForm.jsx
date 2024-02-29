import { useEffect, useState } from "react"
import { createUserTaskThunk, deleteUserTaskThunk, updateUserTaskThunk } from "../../redux/task"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { FaRegTrashAlt } from "react-icons/fa";

function TaskForm({ task }) {

    const [title, setTitle] = useState("")
    const [notes, setNotes] = useState("")
    const [links, setLinks] = useState("")
    const [deadline, setDeadline] = useState("")
    const [tag, setTag] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [err, setErr] = useState({})
    const [formErr, setFormerr] = useState(false)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const { closeModal } = useModal()


    // const date = new Date(deadline)
    // console.log(Date.toISOString(deadline))

    useEffect(() => {
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
            setNotes(task.notes)
            setLinks(task.links)
            let dateString = new Date(task.deadline)
            dateString = dateString.toISOString().substring(0, 10)
            setDeadline(dateString)
            setTag(task.tag)
            setDifficulty(task.difficulty)
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
            }else{
                const updateObj = {
                    title,
                    notes,
                    links,
                    deadline,
                    tag,
                    difficulty
                }
                dispatch(updateUserTaskThunk(updateObj,task.id))
                .then(result =>{
                    if(result.errors){
                        window.alert(result.errors)
                    }else{
                        closeModal()
                    }
                })
            }
        }

    }

    const handleDelete = (e) => {
        dispatch(deleteUserTaskThunk(task.id))
            .then(closeModal())
    }
    return (
        <div>
            <form
                className="user-auth"
                onSubmit={handleSubmit}
            >
                <div className='close-form' onClick={closeModal}>cancel</div>
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
                <div className='field-labels'>
                    notes
                </div>
                <textarea
                    placeholder="Notes"
                    name='notes'
                    value={notes}
                    onChange={(e) => { setNotes(e.target.value) }}
                />
                <div className='field-labels'>
                    links
                </div>
                <input
                    placeholder="links"
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
                    value={deadline}
                    onChange={(e) => { setDeadline(e.target.value) }}
                />
                {formErr && err.deadline && <div style={{ 'color': 'red' }}>{err.deadline}</div>}
                <div className='field-labels'>
                    tag
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
                    difficulty
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
                {task && <div
                    className='task-delete' style={{ 'color': 'red' }}
                    onClick={handleDelete}
                >
                    <FaRegTrashAlt />Delete Task
                </div>
                }
            </form>
        </div>
    )
}

export default TaskForm
