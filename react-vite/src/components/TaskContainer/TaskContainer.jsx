import { useState } from "react"
import '../HomePage/HomePage.css'
import { completeTaskThunk} from "../../redux/task";
import TaskCard from "../TaskCard";
import { IoIosCheckbox } from "react-icons/io";
import { useEffect } from "react";
import { useDispatch} from "react-redux";
function TaskContainer({ groupTasks, personalTasks }) {
    const [categories, setCategories] = useState('active')
    const [sortedTask, setSortedTask] = useState(groupTasks? [...groupTasks] : [...personalTasks])

    const dispatch = useDispatch()
    const [ activeTasks,setActiveTasks] = useState([]);
    const [scheduledTasks,setScheduledTasks] = useState([]);
    const [completedTasks,setCompletedTasks] = useState([]);

    console.log('from task container',groupTasks)

    useEffect(()=>{

        if(groupTasks){
            setActiveTasks(groupTasks.filter(task => !task.completed))
            setScheduledTasks(groupTasks.filter(task => (task.deadline && !task.completed)))
            setCompletedTasks(groupTasks.filter(task => task.completed))
        }
        if(personalTasks){
            setActiveTasks(personalTasks.filter(task => !task.completed))
            setScheduledTasks(personalTasks.filter(task => (task.deadline && !task.completed)))
            setCompletedTasks(personalTasks.filter(task => (task.completed)))
        }
        console.log('first effect',activeTasks)
    },[dispatch,groupTasks,personalTasks])


    useEffect(() => {
        if (categories === 'active') setSortedTask([...activeTasks])
        if (categories === 'scheduled') setSortedTask([...scheduledTasks])
        if (categories === 'complete') setSortedTask([...completedTasks])
        console.log('second effect',activeTasks)
    }, [categories,activeTasks,scheduledTasks,completedTasks,groupTasks,personalTasks])


    const checkBox = (task) => {
        if (!task.completed) {
            dispatch(completeTaskThunk(task.id, 'POST'))

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
                <div className='sort-dropdown'>
                    <div className='sort-button'>Sort</div>
                    <div className='dropdown-options'>
                        <div onClick={() => { dueDateSort(sortedTask) }}>sort by date</div>
                        <div onClick={() => { difficultySort(sortedTask) }}>sort by difficulties</div>
                        <div onClick={() => { tagSort(sortedTask) }}>sort by tags</div>
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
