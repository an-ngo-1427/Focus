import './TaskCard.css'
import { SlCalender } from "react-icons/sl";
import { MdMenuOpen } from "react-icons/md";
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import TaskForm from '../TaskFormModal';
import { MdOutlinePerson } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { assignUserTaskThunk } from '../../redux/task';
import { getUserGroupsThunk } from '../../redux/group';

function TaskCard({ task,group}) {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.session.user)
    const addTask = ()=>{
        dispatch(assignUserTaskThunk(task.id)).
        then(result=>{
            if(result.message){
                window.alert(result.message)
            }else{
                window.alert('task added')
            }
        }).
        then(()=>{dispatch(getUserGroupsThunk())})
    }

    const setButtonName = ()=>{
        if(group){
            if(group.organizer.id == user.id) return 'show'
        }
        if(user.id == task.user?.id && !task.group_id) return 'show'
        return 'hidden'
    }
    return (
        <>
            <div className="task-card">
                <div className='task-main'>

                    <div className='task-title'>
                        <span>{task.title}</span>
                    </div>
                    <div className='task-details'>
                        {task.notes}
                    </div>
                    {task.links &&
                        <div className='task-details'>
                            {task.links}
                        </div>}
                    {task.deadline &&
                        <div className='task-details'>
                            <SlCalender />
                            {task.deadline.substring(5, 16)}
                        </div>
                    }
                </div>
                <div>
                    {task.difficulty && <div>Difficulty: {task.difficulty}</div>}
                    {task.tag && <div>{task.tag}</div>}
                </div>
                <div className='task-edit'>
                    <OpenModalButton
                        className = {setButtonName()}
                        modalComponent={<TaskForm task={task} group={group}/>}
                        buttonText={<MdMenuOpen />}
                    />
                    {/* {group && <div>{task.completed? 'completed':'not completed'}</div>} */}
                    <div>{task.completed? 'completed':""}</div>
                    {task.user && task.group_id && <div><MdOutlinePerson/> {task.user.first_name} </div>}
                    {!task.user && !task.completed && <div onClick={addTask}><IoMdAdd/></div>}
                </div>
                {group && <div>Group: {group.name}</div>}

            </div>

        </>

    )
}

export default TaskCard
