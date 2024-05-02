import { useState } from "react"
import '../HomePage/HomePage.css'
import { completeTaskThunk } from "../../redux/task";
import TaskCard from "../TaskCard";
import { IoIosCheckbox } from "react-icons/io";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {sendRewardsThunk} from "../../redux/reward"

function TaskContainer({ groupTasks, personalTasks }) {
    const [categories, setCategories] = useState('active')
    const [sortedTask, setSortedTask] = useState(groupTasks ? [...groupTasks] : [...personalTasks])
    const [groupOpt, setGroupOpt] = useState('')
    const dispatch = useDispatch()
    const [activeTasks, setActiveTasks] = useState([]);
    const [scheduledTasks, setScheduledTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const groupArr = []
    groupTasks?.forEach(task => {
        if (!groupArr.includes(task.group_id)) groupArr.push(task.group_id)
    })



    useEffect(() => {

        if (groupTasks) {
            setActiveTasks(groupTasks.filter(task => (groupOpt === '' ? !task.completed : !task.completed && task.group_id == parseInt(groupOpt))))
            setScheduledTasks(groupTasks.filter(task => (groupOpt === '' ? task.deadline && !task.completed : task.deadline && !task.completed && task.group_id == parseInt(groupOpt))))
            setCompletedTasks(groupTasks.filter(task => (groupOpt === '' ? task.completed : task.completed && task.group_id == parseInt(groupOpt))))
        }
        if (personalTasks) {
            setActiveTasks(personalTasks.filter(task => !task.completed))
            setScheduledTasks(personalTasks.filter(task => (task.deadline && !task.completed)))
            setCompletedTasks(personalTasks.filter(task => (task.completed)))
        }
        console.log('first effect', activeTasks)
    }, [dispatch, groupTasks, personalTasks, groupOpt])


    useEffect(() => {
        if (categories === 'active') setSortedTask([...activeTasks])
        if (categories === 'scheduled') setSortedTask([...scheduledTasks])
        if (categories === 'complete') setSortedTask([...completedTasks])
        console.log('second effect', activeTasks)
    }, [categories, activeTasks, scheduledTasks, completedTasks, groupTasks, personalTasks])


    const checkBox = (task) => {
        if (!task.completed) {

            const rewardObj = {}

            rewardObj['task_id'] = task.id

            // reward amounts are based on difficulty of the task
            if(!task.difficulty || task.difficulty <=2 ) rewardObj['amount'] = 2
            if( task.difficulty === 3) rewardObj['amount'] = 4
            if(task.difficulty === 4) rewardObj['amount'] = 6
            if( task.difficulty === 5) rewardObj['amount'] = 8


            dispatch(completeTaskThunk(task.id, 'POST'))
            dispatch(sendRewardsThunk(task.user.id,rewardObj))

        } else {
            dispatch(completeTaskThunk(task.id, 'DELETE'))

        }
    }

    const boxName = (task) => {
        if (task.completed) return 'task-checkbox completed'
        else return 'task-checkbox'
    }
    const dueDateSort = (sortedTask) => {
        const sortedArr = sortedTask.sort((taskA, taskB) => {
            const dateA = Date.parse(taskA.deadline)
            const dateB = Date.parse(taskB.deadline)
            if (dateA - dateB < 0) return -1
            else if (dateA - dateB > 0) return 1
            else return 0
        })

        setSortedTask([...sortedArr])
    }

    const difficultySort = (sortedTask) => {

        const sortedArr = sortedTask.sort((taskA, taskB) => {

            if (taskA.difficulty - taskB.difficulty < 0) return 1
            if (taskA.difficulty - taskB.difficulty > 0) return -1
            else return 0
        })

        setSortedTask([...sortedArr])
    }

    const tagSort = (sortedTask) => {
        const sortedArr = sortedTask.sort((taskA, taskB) => taskA.tag - taskB.tag)
        setSortedTask([...sortedArr])
    }
    return (
        <div className='todo-window'>
            <div className='todo-window-cag'>


                <div className="categories">
                    <span onClick={() => { setCategories('active') }} className={categories === 'active' ? 'selected' : ''}>Active</span>
                    <span onClick={() => { setCategories('scheduled') }} className={categories === 'scheduled' ? 'selected' : ''}>Scheduled</span>
                    <span onClick={() => { setCategories('complete') }} className={categories === 'complete' ? 'selected' : ''}>Complete</span>
                </div>

            </div>
            <div className='tasks-window'>
                <div className="tasks-window-button">
                    {groupTasks &&
                            <select
                                value={groupOpt}
                                onChange={(e) => { setGroupOpt(e.target.value) }}
                                className="group-button"
                            >
                                <option value="">All groups</option>
                                {groupArr?.map(groupId => <option key={groupId} value={groupId}>{`Group ${groupId}`}</option>)}
                            </select>
                    }
                    <div className='sort-dropdown'>
                        <div className='sort-button'>Sort</div>
                        <div className='dropdown-options'>
                            <div onClick={() => { dueDateSort(sortedTask) }}>sort by date</div>
                            <div onClick={() => { difficultySort(sortedTask) }}>sort by difficulties</div>
                            <div onClick={() => { tagSort(sortedTask) }}>sort by tags</div>
                        </div>
                    </div>

                </div>

                <div
                    style={{ 'display': 'flex', 'flex-direction': 'column', 'gap': '7px' }}
                >
                    {sortedTask.length ? sortedTask.map(task => (
                        <div key={task.id} className='task-box'>
                            <IoIosCheckbox
                                // key={task.id}
                                className={boxName(task)}
                                onClick={() => { checkBox(task) }}
                            />
                            <TaskCard className='task-card' task={task} />
                        </div>
                    )) : <div className="task-box">
                        No tasks found!
                    </div>}

                </div>


            </div>

        </div>
    )
}

export default TaskContainer
