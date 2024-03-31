import './RewardCard.css'
function RewardCard({reward}){
    return(
        <div className = 'reward-card'>
            <div style={{'fontSize':'large'}}><span className='reward-text'>{reward.receiver.first_name}</span> received <span className='reward-text'>{reward.amount}</span> points from <span className='reward-text'>{reward.sender.first_name}</span></div>
            <p>{reward.notes}</p>
        </div>
    )
}

export default RewardCard
