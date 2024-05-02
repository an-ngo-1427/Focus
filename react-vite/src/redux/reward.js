
// getting rewards of a specific group
const GET_GROUP_REWARDS = '/rewards/GET_GROUP_REWARDS'

const getGroupRewards = (rewards) =>{
    return {
        type:GET_GROUP_REWARDS,
        rewards
    }
}

export const getGroupRewardsThunk = (groupId) => async (dispatch)=>{
    const response = await fetch(`/api/rewards/groups/${groupId}`)
    const data = await response.json()

    if(response.ok){
        dispatch(getGroupRewards(data))
    }
    return data
}
// sending reward from a user to another
const SEND_REWARDS = '/rewards/SEND_REWARDS'

const sendRewards = (reward)=>{
    return{
        type:SEND_REWARDS,
        reward
    }
}

export const sendRewardsThunk = (userId,reward)=>async (dispatch)=>{
    const response = await fetch(`/api/rewards/user/${userId}/add`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(reward)
    })

    const data = await response.json()
    if(response.ok){
        dispatch(sendRewards(data))
    }
    return data
}



const initialState = {}

function groupRewardsReducer(state=initialState,action){
    switch(action.type){
        case(SEND_REWARDS):{
            let newObj = {}
            newObj = {...state,[action.reward.id]:action.reward}
            return newObj
        }
        case(GET_GROUP_REWARDS):{
            let newObj = {}
            action.rewards.Rewards.forEach(reward=>{newObj[reward.id] = reward})
            return newObj
        }
    }
    return state
}

export default groupRewardsReducer
