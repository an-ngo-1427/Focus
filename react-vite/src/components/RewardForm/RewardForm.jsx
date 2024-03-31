import { useDispatch, useSelector } from "react-redux"
import { sendRewardsThunk } from "../../redux/reward"
import { useModal } from "../../context/Modal"
import { useState,useEffect} from "react"
function RewardForm({user,group}){
    const [amount,setAmount] = useState('')
    const [notes,setNotes] = useState('')
    const [formErr,setFormerr] = useState({})
    const [err,setErr] = useState(false)
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const mainUser = useSelector(state=>state.session.user)
    useEffect(()=>{
        let errObj = {}
        if (!amount.length) errObj.amount = 'Amount is required'

        setFormerr(errObj)
    },[amount])

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(Object.values(formErr).length) return setErr(true)

        const reward = {
            amount,
            notes,
            group_id:group.id,
            gifter_id : mainUser.id
        }
        dispatch(sendRewardsThunk(user.id,reward))
        .then((result)=>{window.alert(`gift sent to${result.receiver.first_name}`)})
        .then(closeModal)
    }
    return (
        <form onSubmit={handleSubmit} className="user-auth group-form">
            <h3>Sending gift to {user.first_name} {user.last_name}</h3>
            <div className="field-labels">Amount</div>
            <select onChange = {(e)=>{setAmount(e.target.value)}}>
                <option value=''>Select an amount</option>
                <option value={5} >5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
            </select>
            {err && <div>{formErr.amount}</div>}
            <div className="field-labels">Notes</div>
            <textarea placeholder='Leave a Thank You note for your friend'onChange = {(e)=>{setNotes(e.target.value)}}></textarea>
            <button type='submit'>Send Gift</button>
            <div onClick={closeModal} className="form-link">cancel</div>
        </form>

    )
}

export default RewardForm
