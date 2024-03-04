import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { createGroupThunk } from "../../redux/group"
import { useModal } from "../../context/Modal"
function GroupForm() {
    const [name, setName] = useState("")
    const [imageUrl, setImageurl] = useState("")
    const [err, setErr] = useState({})
    const [formErr, setFormerr] = useState(false)
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    useEffect(() => {
        let errObj = {}
        if (!name) errObj.name = 'Group name is required'
        const allowedFile = ['jpeg', 'png', 'gif', 'jpg']
        if (imageUrl.length) {
            let fileExt = imageUrl.substring(imageUrl.length - 3)
            if (!allowedFile.includes(fileExt)) errObj.imageUrl = 'Allowed file extenstions jpeg, png, gif, jpg'
        }

        setErr(errObj)
    }, [name, imageUrl])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name,imageUrl)
        if (Object.values(err).length) return setFormerr(true)
        else {
            console.log('entered')
            const groupObj = {
                name,
                image_url: imageUrl
            }
            dispatch(createGroupThunk(groupObj)).
                then(() => { closeModal() })
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
                    onChange={(e) => setName(e.target.value)}
                />
                {formErr && <div style={{ 'color': 'red' }}>{err.name}</div>}
                <div className="field-labels">
                    Group Image
                </div>
                <input
                    placeholder="Image Url"
                    onChange={(e) => setImageurl(e.target.value)}
                />
                {formErr && <div style={{ 'color': 'red' }}>{err.imageUrl}</div>}
                <button type="submit" >Create Group</button>
            </form>

        </>
    )
}

export default GroupForm
