import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './GroupPage.css'
import { useEffect } from "react";
function GroupPage(){
    const user = useSelector(state=>state.session.user)

    const navigate = useNavigate()

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
    },[user])
    return(
        <h1 className='group-page-header'>Group Page</h1>
    )
}

export default GroupPage
