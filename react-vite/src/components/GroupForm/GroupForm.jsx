import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createGroupThunk, getUserOwnGroupsThunk, updateGroupThunk } from "../../redux/group"
import { useModal } from "../../context/Modal"
import { useNavigate } from "react-router-dom"
function GroupForm({ group }) {
    const [name, setName] = useState("")
    const [imageUrl, setImageurl] = useState("")
    const [err, setErr] = useState({})
    const [formErr, setFormerr] = useState(false)
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    useEffect(() => {
        if (!user) navigate('/login')
        let errObj = {}
        if (!name) errObj.name = 'Group name is required'
        const allowedFile = ['jpeg', 'png', 'gif', 'jpg']
        if (imageUrl.length) {
            let fileExt = imageUrl.substring(imageUrl.length - 3)
            if (!allowedFile.includes(fileExt)) errObj.imageUrl = 'Allowed file extenstions jpeg, png, gif, jpg'
        }

        setErr(errObj)
    }, [name, imageUrl])

    useEffect(() => {
        if (group) {
            console.log(group.name)
            setName(group.name)
            setImageurl(group.image_url)
        }
    },[group])
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (Object.values(err).length) return setFormerr(true)
        else {
            console.log('entered')
            const groupObj = {
                name,
                image_url: imageUrl
            }
            let currGroup;
            if (!group) {
                currGroup = await dispatch(createGroupThunk(groupObj))
            } else {
                currGroup = await dispatch(updateGroupThunk(group.id, groupObj))
            }
            await dispatch(getUserOwnGroupsThunk())
            navigate(`/groups/${currGroup.id}/edit`)
            closeModal()

        }
    }
    const handleCancel = (e) => {
        e.preventDefault()
        closeModal()
    }
    return (
        <>
            <span onClick={handleCancel}>cancel</span>
            <form
                className="user-auth"
                onSubmit={handleSubmit}
            >
                <div className="field-labels">
                    Group Name
                </div>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {formErr && <div style={{ 'color': 'red' }}>{err.name}</div>}
                <div className="field-labels">
                    Group Image
                </div>
                <input
                    placeholder="Image Url"
                    onChange={(e) => setImageurl(e.target.value)}
                    value={imageUrl}
                />
                {formErr && <div style={{ 'color': 'red' }}>{err.imageUrl}</div>}
                <button type="submit" >{group ? 'Update group' : 'Create Group'}</button>
            </form>

        </>
    )
}


export default GroupForm
