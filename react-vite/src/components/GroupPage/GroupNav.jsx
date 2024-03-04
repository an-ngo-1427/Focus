import { useDispatch, useSelector } from "react-redux"
import {getUserGroupsThunk, getUserOwnGroupsThunk} from "../../redux/group"
import { useEffect } from "react"
import GroupCard from "./GroupCard"

import OpenModalButton from "../OpenModalButton/OpenModalButton"
import GroupForm from "../GroupForm/GroupForm"
function GroupNav(){
    const dispatch = useDispatch()
    const userGroups = useSelector(state=>state.userGroups)
    const userOwnGroups = useSelector(state=>state.userOwnGroups)
    useEffect(()=>{
        dispatch(getUserGroupsThunk())
        dispatch(getUserOwnGroupsThunk())
    },[dispatch])
    return (
        <>
        <h1>Your Group</h1>
        <OpenModalButton
            modalComponent={<GroupForm/>}
            buttonText="Create a group"
        />

        <div>
            {Object.values(userGroups).map(group=><GroupCard key = {group.id} group={group}/>)}
        </div>

        </>
    )
}
export default GroupNav
