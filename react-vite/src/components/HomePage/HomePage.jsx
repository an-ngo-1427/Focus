import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import TaskForm from "../TaskFormModal";


function HomePage(){
    return(
        <div>
            <OpenModalMenuItem
                itemText={'+ Add Task'}
                modalComponent={<TaskForm/>}
            />
            <div className = 'todo-window'>
                <h3>Your To Do's</h3>
            </div>
            <div className = 'todo-window'>
                <h3>Group To Do's</h3>
            </div>
        </div>
    )
}

export default HomePage
