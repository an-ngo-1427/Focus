import { createGroupTaskThunk} from "../../redux/group"
import { useState,useEffect} from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
function GroupTaskForm({group}){
    const [title, setTitle] = useState("")
    const [notes, setNotes] = useState("")
    const [links, setLinks] = useState("")
    const [deadline, setDeadline] = useState("")
    const [tag, setTag] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [err, setErr] = useState({})
    const [formErr, setFormerr] = useState(false)
    const [userId, setUserId] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state=>state.session.user)
    const { closeModal } = useModal()

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
    if(!user) return navigate('/login')



    const handleSubmit=(e)=>{
        e.preventDefault()


        if (Object.values(err).length) return setFormerr(true)
        else{
            const updateObj = {
                title,
                notes,
                links,
                deadline,
                tag,
                difficulty,
                user_id:userId
            }
            dispatch(createGroupTaskThunk(group.id,updateObj)).
            then(result=>{
                if(result.message){
                    window.alert(result.message)
                }else{
                    closeModal()
                }
            })
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

                <button type='submit' >{'Create Task'}</button>

            </form>
        </div>
    )
}

export default GroupTaskForm
