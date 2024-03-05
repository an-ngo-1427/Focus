
// getting all task for a user
import Cookies from 'js-cookie';
const GET_USER_TASKS = '/tasks/user/GET_USER_TASKS'
const getUserTasks = (data)=>{
    return{
        type:GET_USER_TASKS,
        data
    }
}

export const getUserTasksThunk = (userId)=>async (dispatch)=>{
    const response = await fetch(`/api/tasks/user/${userId}`)
    const data = await response.json()
    if(response.ok){
        dispatch(getUserTasks(data))
    }
    return data
}

// creating a task for a user
const USER_CREATE_TASK = '/tasks/user/USER_CREATE_TASK'
const createUserTask = (task)=>{
    return{
        type:USER_CREATE_TASK,
        task
    }
}

export const createUserTaskThunk = (formdata,userId)=>async(dispatch)=>{
    const response = await fetch(`/api/tasks/user/${userId}/new`,{
        method:'POST',
        body:formdata
    })

    const data = await response.json()
    if(response.ok){
        dispatch(createUserTask(data))
    }
    return data
}

// updating a user task
const USER_UPDATE_TASK = '/tasks/USER_UPDATE_TASK'
const updateUserTask = (task)=>{
    return{
        type:USER_CREATE_TASK,
        task
    }
}

export const updateUserTaskThunk = (task,taskId)=>async (dispatch)=>{
    const response = await fetch(`/api/tasks/${taskId}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json','XSRF-Token':Cookies.get("XSRF-Token")},
        body:JSON.stringify(task)
    })
    const data = await response.json()
    if(response.ok){
        dispatch(updateUserTask(data))
    }
    return data
}

// deleting task
const USER_DELETE_TASK = '/tasks/USER_DELETE_TASK'
const deleteUserTask = (taskId)=>{
    return {
        type:USER_DELETE_TASK,
        taskId
    }
}

export const deleteUserTaskThunk = (taskId) => async (dispatch)=>{
    const response = await fetch(`/api/tasks/${taskId}`,{
        method:'DELETE'
    })

    const data = await response.json()
    if(response.ok){
        dispatch(deleteUserTask(data))
    }

    return data
}


// assigning group task to user
const ASSIGN_USER_TASK = '/tasks/ASSIGN_USER_TASK'
const assignUserTask = (task)=>{
    return {
        type:ASSIGN_USER_TASK,
        task
    }
}

export const assignUserTaskThunk = (taskId)=> async (dispatch)=>{
    const response = await fetch(`/api/groups/tasks/${taskId}`,{
        method:'POST'
    })

    const data = await response.json()
    if(response.ok){
        dispatch(assignUserTask(data))
    }
    return data
}



const initialState = {}
function userTasksReducer(state = initialState,action){
    switch (action.type){
        case (GET_USER_TASKS):{
            let newObj = {}
            action.data.Tasks.forEach(task => newObj[task.id] = task)
            return newObj
        }
        case (USER_CREATE_TASK):{
            let newObj={...state,[action.task.id]:action.task}
            return newObj
        }
        case (USER_UPDATE_TASK):{
            state[action.task.id] = action.task
            let newObj = {...state}
            return newObj
        }
        case (USER_DELETE_TASK):{
            delete state[action.taskId.taskId]
            let newObj = {...state}
            return newObj
        }
        case (ASSIGN_USER_TASK):{
            let newObj = {...state,[action.task.id]:action.task}
            return newObj
        }
    }
    return state
}

export default userTasksReducer
