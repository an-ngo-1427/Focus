import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getGroupDetailsThunk, removeMemberThunk } from "../../redux/group"
import GroupCard from "../GroupNav/GroupCard"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import MembersBoard from "../MemberBoard/MemberBoard"
import './GroupDetail.css'
function GroupDetail() {
    const { groupId } = useParams()
    const currGroup = useSelector(state => state.currGroup)
    const mainUser  = useSelector(state=>state.session.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGroupDetailsThunk(groupId))
    }, [dispatch])

    console.log('rerendering group detail',currGroup)

    if (!Object.values(currGroup)) return null
    return (
        <div className="group-page">
            <h1>{currGroup.name}</h1>
            <GroupCard group={currGroup}></GroupCard>
            <h2>members</h2>
            {currGroup.organizer.id == mainUser.id &&
            <OpenModalMenuItem
                itemText='Add members'
                modalComponent={<MembersBoard group={currGroup}/>}
            />}
            <div className='group-users'>
            {currGroup.users?.map(user =>
                <div className='user-card' key={user.id}>
                    <span>{`${user.first_name} ${user.last_name}`}</span>
                    <span>{user.email}</span>
                    {currGroup.organizer.id == mainUser.id && <button className = 'member-button' onClick={(e) => {
                        e.preventDefault()
                        const userId = user.id
                        dispatch(removeMemberThunk(groupId, userId))
                    }}>remove</button>}
                </div>)}

            </div>

        </div>
    )
}

export default GroupDetail
