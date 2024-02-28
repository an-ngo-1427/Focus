
// getting all task for a user
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
    }
    return state
}

export default userTasksReducer
