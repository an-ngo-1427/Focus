import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createGroupThunk, getUserOwnGroupsThunk, updateGroupThunk } from "../../redux/group"
import { useModal } from "../../context/Modal"
import { useNavigate } from "react-router-dom"
import { FaRegTrashAlt } from "react-icons/fa";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import DeleteTask from "../DeleteTask/DeleteTask"
import './GroupForm.css'
function GroupForm({ group }) {
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [err, setErr] = useState({})
    const [formErr, setFormerr] = useState(false)
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        if (!user) {
            closeModal()
            navigate('/login')

        }
        let errObj = {}
        if (!name) errObj.name = 'Group name is required'

        setErr(errObj)
    }, [name, image])

    useEffect(() => {
        if (group) {
            setName(group.name)
        }
    }, [group])
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (Object.values(err).length) return setFormerr(true)
        else {
            const formData = new FormData()

            formData.append('name', name)
            formData.append('image', image)
            let currGroup;
            if (!group) {
                currGroup = await dispatch(createGroupThunk(formData))
            } else {
                currGroup = await dispatch(updateGroupThunk(group.id, formData))
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

    ('this is group', group)
    return (
        <div className="form-container">
            <form
                className="user-auth group-form"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <span onClick={handleCancel} className="form-link">cancel</span>
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
                    type='file'
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                {formErr && <div style={{ 'color': 'red' }}>{err.imageUrl}</div>}
                <button type="submit" >{group ? 'Update group' : 'Create Group'}</button>
                {group && <div className='task-delete'>
                    <FaRegTrashAlt />
                    <OpenModalMenuItem
                        itemText='Delete Group'
                        modalComponent={<DeleteTask group={group} />}
                    />

                </div>}
            </form>
        </div>
    )
}


export default GroupForm
