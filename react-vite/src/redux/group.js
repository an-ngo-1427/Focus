
// getting all groups of the current user
const GET_USER_GROUPS = '/groups/GET_USER_GROUPS'

const getUserGroups = (groups)=>{
    return {
        type:GET_USER_GROUPS,
        groups
    }
}

// creating a new group
const CREATE_GROUP = '/groups/CREATE_GROUP'
const createGroup = (group)=>{
    return {
        type: CREATE_GROUP,
        group
    }
}

export const createGroupThunk = (group)=>async (dispatch) => {
    const response = await fetch('/api/groups/new',{
        method:"POST",
        body: group
    })

    const data = await response.json()
    if(response.ok){
        dispatch(createGroup(data))
    }
    return data
}
// create task for a group
const CREATE_GROUP_TASK = '/groups/CREATE_GROUP_TASK'

const createGroupTask = (group)=>{
    return {
        type:CREATE_GROUP_TASK,
        group
    }
}

export const createGroupTaskThunk = (groupId,task)=>async (dispatch)=>{
    const response = await fetch(`/api/groups/${groupId}/tasks`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(task)
    })

    const data = await response.json()

    if(response.ok){
        dispatch(createGroupTask(data))
    }
    return data
}

export const getUserGroupsThunk = ()=>async (dispatch)=>{
    const response = await fetch('/api/groups/user')
    const data = await response.json()

    if(response.ok){
        dispatch(getUserGroups(data))
    }
    return data
}



// getting user own groups
const GET_USER_OWN_GROUPS = '/groups/GET_USER_OWN_GROUPS'

const getUserOwnGroups = (groups)=>{
    return{
        type:GET_USER_OWN_GROUPS,
        groups
    }
}

export const getUserOwnGroupsThunk = ()=>async (dispatch)=>{
    const response = await fetch('/api/groups/user/own')
    const data = await response.json()
    if(response.ok){
        dispatch(getUserOwnGroups(data))
    }
    return data
}

// deleting group
const DELETE_GROUP = '/groups/DELETE_GROUP'
const deleteGroup = (groupId)=>{
    return{
        type:DELETE_GROUP,
        groupId
    }
}

export const deleteGroupThunk = (groupId)=>async (dispatch)=>{
    const response = await fetch(`/api/groups/${groupId}`,{
        method:'DELETE'
    })
    const data = await response.json()
    if(response.ok){
        dispatch(deleteGroup(data))
    }
    return data
}

export const userOwnGroupReducer = (state=initialState,action)=>{
    switch(action.type){
        case(GET_USER_OWN_GROUPS):{
            let newObj = {}
            action.groups.Groups.forEach(group=>newObj[group.id] = group)
            return newObj
        }
        case(CREATE_GROUP):{
            let newObj={}
            newObj = {...state,[action.group.id]:action.group}
            return newObj
        }
        case(DELETE_GROUP):{
            let newObj = {}
            delete state[action.groupId.groupId]
            newObj = {...state}
            return newObj;
        }
        case(CREATE_GROUP_TASK):{
            let newObj={...state,[action.group.id]:action.group}
            return newObj
        }
    }
    return state
}

// update group task

const initialState = {}
function userGroupsReducer (state = initialState,action){
    switch(action.type){
        case(GET_USER_GROUPS):{
            let newObj = {}
            action.groups.Groups.forEach(group=>newObj[group.id] = group)
            return newObj
        }
        // case(CREATE_GROUP_TASK):{
        //     let newObj={...state,[action.group.id]:action.group}
        //     return newObj
        // }

    }
    return state
}

// update group task
const UPDATE_GROUP_TASK = '/groups/UPDATE_GROUP_TASK'

const updateGroupTask = (group)=>{
    return{
        type:UPDATE_GROUP_TASK,
        group
    }
}

export const updateGroupTaskThunk = (groupId,taskId,task)=> async(dispatch)=>{
    const response = await fetch(`/api/groups/${groupId}/tasks/${taskId}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(task)
    })
    const data = await response.json()
    if(response.ok){
        dispatch(updateGroupTask(data))
    }
    return data
}

// export const groupTaskReducer = (state=initialState,action)=>{
//     switch(action.type){
//         case(UPDATE_GROUP_TASK):{
//             return action.task
//         }
//     }
//     return state
// }

// getting curr Group
const GET_GROUP_DETAILS = '/groups/GET_GROUP_DETAILS'
const getGroupDetails = (group)=>{
    return{
        type:GET_GROUP_DETAILS,
        group
    }
}

export const getGroupDetailsThunk = (groupId) => async (dispatch)=>{
    const response = await fetch(`/api/groups/${groupId}`)
    const data = await response.json()

    if(response.ok){
        dispatch(getGroupDetails(data))
    }
    return data
}

// removing members from a group
const REMOVE_MEMBER = '/groups/REMOVE_MEMBER'
const removeMember = (group)=>{
    return{
        type:REMOVE_MEMBER,
        group
    }
}

export const removeMemberThunk = (groupId,userId)=>async (dispatch)=>{
    const response = await fetch(`/api/groups/${groupId}/user/${userId}`,{
        method:'DELETE'
    })

    const data = await response.json()

    if(response.ok){
        dispatch(removeMember(data))
    }
    return data
}

// adding members to a group
const ADD_MEMBER = '/groups/ADD_MEMBERS'
const addMember = (group)=>{
    return{
        type:ADD_MEMBER,
        group
    }
}

export const addMemberThunk = (groupId,userId) => async (dispatch)=>{
    const response = await fetch(`/api/groups/${groupId}/user/${userId}`,{
        method:'POST'
    })
    const data = await response.json()
    if(response.ok){
        dispatch(addMember(data))
    }
    return data
}

// updating group info
const UPDATE_GROUP = '/groups/UPDATE_GROUP'
const updateGroup = (group)=>{
    return{
        type:UPDATE_GROUP,
        group
    }
}

export const updateGroupThunk = (groupId,dataObj)=>async (dispatch)=>{
    const response = await fetch(`/api/groups/${groupId}`,{
        method:'PUT',
        body:dataObj
    })
    const data = await response.json()
    if(response.ok){
        dispatch(updateGroup(data))
    }
    return data
}
export const getCurrGroupReducer = (state=initialState,action)=>{
    switch(action.type){
        case(GET_GROUP_DETAILS):{
            return action.group
        }
        case(REMOVE_MEMBER):{
            return action.group
        }
        case(UPDATE_GROUP_TASK):{
            return action.group
        }
        case (CREATE_GROUP_TASK):{
            return action.group
        }
        case (UPDATE_GROUP):{
            return action.group
        }
        case (ADD_MEMBER):{
            return action.group
        }
    }

    return state
}
export default userGroupsReducer
