import { useDispatch, useSelector } from "react-redux"
import { getGroupDetailsThunk, getUserGroupsThunk, getUserOwnGroupsThunk } from "../../redux/group"
import { useEffect } from "react"
import './GroupNav.css'

import OpenModalButton from "../OpenModalButton/OpenModalButton"
import GroupForm from "../GroupForm/GroupForm"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
function GroupNav() {
    const dispatch = useDispatch()
    const userGroups = useSelector(state => state.userGroups)
    const userOwnGroups = useSelector(state => state.userOwnGroups)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getUserGroupsThunk())
        dispatch(getUserOwnGroupsThunk())
    }, [dispatch])

    const handleClick = (groupId)=>{
        navigate(`/groups/${groupId}/edit`)
        dispatch(getGroupDetailsThunk(groupId))
    }
    return (
        <>
            <div className="group-nav">
                <OpenModalButton
                    modalComponent={<GroupForm />}
                    buttonText="+ Create a group"
                />
                <div>YOUR GROUPS</div>
                <ul>
                    {Object.values(userOwnGroups).map(group => <li key={group.id}><NavLink to={`/groups/${group.id}/edit`} onClick={()=>{handleClick(group.id)}}>{group.name}</NavLink></li>)}
                </ul>
                <div>ALL GROUPS</div>
                <ul>
                    {Object.values(userGroups).map(group => <li key={group.id}><NavLink to={`/groups/${group.id}/edit`} onClick={()=>{handleClick(group.id)}}>{group.name}</NavLink></li>)}
                </ul>
            </div>
            <Outlet />

            {/* <div>
            {Object.values(userGroups).map(group=><GroupCard key = {group.id} group={group}/>)}
        </div> */}

        </>
    )
}
export default GroupNav
