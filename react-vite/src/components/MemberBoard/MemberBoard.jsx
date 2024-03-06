import { useEffect} from "react"
import { useModal } from "../../context/Modal"
import { useDispatch, useSelector } from "react-redux"
import { getUsersThunk } from "../../redux/session"
import { addMemberThunk} from "../../redux/group"
import './MemberBoard.css'
function MembersBoard({group}) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const allUsers = useSelector(state=>state.allUsers)
    const organizer = group.organizer
    const groupUsersId = []
    group.users.forEach(user=>groupUsersId.push(user.id))

    const newUsers = Object.values(allUsers).filter(user=>!groupUsersId.includes(user.id) && organizer.id != user.id)

    const addMembers = (e,userId)=>{
        e.preventDefault()
        dispatch(addMemberThunk(group.id,userId))
        .then(()=>{closeModal()})
    }
    useEffect(()=>{
        dispatch(getUsersThunk())

    },[dispatch,group])
    return (
        <>
            <h1>Add Members</h1>
            <div className="member-form">
                {newUsers.map(user=>(
                    <div key={user.id} className='user-board'>
                        <div>{`${user.first_name} ${user.last_name}`}</div>
                        <button className = 'member-button' onClick={(e)=>{addMembers(e,user.id)}}>Add Member</button>
                    </div>
                    ))}
            </div>
            <div onClick={closeModal} className='form-link'>cancel</div>
        </>
    )
}

export default MembersBoard
