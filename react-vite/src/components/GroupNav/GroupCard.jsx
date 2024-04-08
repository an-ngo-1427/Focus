
// import {useNavigate} from 'react-router-dom'
import { IoIosCheckbox } from "react-icons/io"
import TaskCard from "../TaskCard"
import './GroupCard.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import MembersBoard from "../MemberBoard/MemberBoard"
import { removeMemberThunk } from "../../redux/group"
import { MdMenuOpen } from "react-icons/md"
import RewardForm from "../RewardForm"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import { getGroupRewardsThunk } from "../../redux/reward"
import RewardCard from "../RewardCard"

function GroupCard({ group }) {
    const [show, setShow] = useState('tasks')
    const [showMenu, setShowMenu] = useState(false)
    const mainUser = useSelector(state => state.session.user)
    const groupRewards = useSelector(state => state.groupRewards)
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getGroupRewardsThunk(group.id))
        document.addEventListener('click',()=>setShowMenu(false))
    }, [dispatch, group, showMenu])

    const boxName = (task) => {
        if (task.completed) return 'task-checkbox completed'
        else return 'task-checkbox'
    }
    const groupTasks = group.tasks

    if (!Object.values(group).length) return null

    const showTasks = () => {
        setShow('tasks')
    }

    const showMems = () => {
        setShow('members')
    }

    const showRewards = () => {
        setShow('rewards')
    }

    const openMenu = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!showMenu) setShowMenu(e.currentTarget.classList[1])
        else setShowMenu(false)

    }
    return (
        <div>
            <div className='group-tabs'>
                <button href='#tasks' className={`task-button ${show === 'tasks' ? 'clicked' : ''}`} onClick={showTasks}>Tasks</button>
                <button className={`member-button ${show === 'members' ? 'clicked' : ''}`} onClick={showMems}>Members</button>
                <button className={`reward-button ${show === 'rewards' ? 'clicked' : ''}`} onClick={showRewards}>Rewards</button>

            </div>
            {show === 'tasks' &&
                <div id='tasks' className='group-tasks'>
                    {groupTasks?.map(task => (
                        <div
                            key={task.id}
                            className="task-box"
                        >

                            <IoIosCheckbox
                                className={boxName(task)}
                            />
                            <TaskCard key={task.id} task={task} group={group} />

                        </div>
                    )
                    )}

                </div>
            }

            {show === 'members' &&
                <div className='member-window'>
                    {group.organizer?.id == mainUser.id &&
                        <OpenModalButton
                            className={'add-member'}
                            buttonText='Add members'
                            modalComponent={<MembersBoard group={group} />}
                        />
                    }
                    <div className='group-users'>
                        {group.users?.map(user =>
                            <div className='user-card' key={user.id}>
                                <span>{`${user.first_name} ${user.last_name}`}</span>
                                <span>{user.email}</span>
                                <div className={`user-dropdown ${user.id}`} onClick={(e) => { openMenu(e) }}>
                                    <MdMenuOpen />
                                    <div className={`user-options ${showMenu && showMenu == user.id ? 'show' : ''}`}>
                                        {group.organizer.id == mainUser.id && <button className='member-buttons' onClick={(e) => {
                                            e.preventDefault()
                                            const userId = user.id
                                            dispatch(removeMemberThunk(group.id, userId))
                                        }}>remove</button>}
                                        {<OpenModalButton
                                            className={'member-buttons'}
                                            modalComponent={<RewardForm user={user} group={group} />}
                                            buttonText='Send Gifts'
                                        />}
                                    </div>
                                </div>
                            </div>)}

                    </div>
                </div>
            }

            {show === 'rewards' &&
                <div>
                    {Object.values(groupRewards).map((reward) => <RewardCard reward={reward} />)}
                </div>
            }


        </div>
    )
}
export default GroupCard
