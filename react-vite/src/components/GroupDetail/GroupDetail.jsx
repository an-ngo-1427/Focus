import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getGroupDetailsThunk, removeMemberThunk } from "../../redux/group"

function GroupDetail() {
    const { groupId } = useParams()
    const currGroup = useSelector(state => state.currGroup)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGroupDetailsThunk(groupId))
    }, [dispatch])

    const removeMember = (e, user) => {
        e.preventDefault()
        console.log(user)
        const userId = user.id
        dispatch(removeMemberThunk(groupId, userId))
    }

    if (!Object.values(currGroup)) return null
    return (
        <>
            <h1>{currGroup.name}</h1>
            <h2>members</h2>
            {currGroup.users?.map(user =>
                <div className='user-card' key={user.id}>
                    <span>{user.first_name}</span>
                    <span>{user.last_name}</span>
                    <span>{user.email}</span>
                    <button onClick={(e) => {
                        e.preventDefault()
                        const userId = user.id
                        dispatch(removeMemberThunk(groupId, userId))
                    }}>remove</button>
                </div>)}


        </>
    )
}

export default GroupDetail
