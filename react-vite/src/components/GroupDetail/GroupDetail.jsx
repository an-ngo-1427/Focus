import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getGroupDetailsThunk, removeMemberThunk } from "../../redux/group"
import GroupCard from "../GroupNav/GroupCard"

function GroupDetail() {
    const { groupId } = useParams()
    const currGroup = useSelector(state => state.currGroup)
    const mainUser  = useSelector(state=>state.session.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGroupDetailsThunk(groupId))
    }, [dispatch])



    if (!Object.values(currGroup)) return null
    return (
        <div className="group-page">
            <h1>{currGroup.name}</h1>
            <h2>members</h2>
            {currGroup.users?.map(user =>
                <div className='user-card' key={user.id}>
                    <span>{user.first_name}</span>
                    <span>{user.last_name}</span>
                    <span>{user.email}</span>
                    {currGroup.organizer.id == mainUser.id && <button onClick={(e) => {
                        e.preventDefault()
                        const userId = user.id
                        dispatch(removeMemberThunk(groupId, userId))
                    }}>remove</button>}
                </div>)}
            <GroupCard group={currGroup}></GroupCard>

        </div>
    )
}

export default GroupDetail
