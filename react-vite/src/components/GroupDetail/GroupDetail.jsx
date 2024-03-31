import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getGroupDetailsThunk} from "../../redux/group"
import GroupCard from "../GroupNav/GroupCard"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"

import GroupForm from "../GroupForm/GroupForm"
import GroupTaskForm from "../GroupTaskForm/GroupTaskForm"
import './GroupDetail.css'
function GroupDetail() {
    const { groupId } = useParams()
    const currGroup = useSelector(state => state.currGroup)
    const mainUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGroupDetailsThunk(groupId))
    }, [dispatch])



    if (!Object.values(currGroup)) return null
    return (
        <div className="group-page">
            <div className='group-info'>
                <img className='group-image' src={currGroup.image_url} />
                <div className="group-manage">
                    <h1>{currGroup.name}</h1>
                    {mainUser.id == currGroup.organizer?.id &&
                        <OpenModalMenuItem
                            itemText={'Edit group'}
                            modalComponent={<GroupForm group={currGroup} />}
                        />
                    }
                    {/* {user.id == group.organizer.id && <button>Add members</button>} */}
                    {mainUser.id == currGroup.organizer?.id &&
                        <OpenModalMenuItem
                            itemText={'+ Add Task'}
                            modalComponent={<GroupTaskForm group={currGroup} />}
                        />
                    }
                </div>
            </div>

            <GroupCard group={currGroup}></GroupCard>
        </div>
    )
}

export default GroupDetail
