import React from 'react'
import kakashi from '../../assets/kakashi.jpeg'
import '../Dashboard/Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

const TableRow = ({user, toggleEdit, deleteSingleUser, updateUserInfo, editingUser, toggleSelect, selectedUsers}) => {
    return (
        <>
                <td>
                    <input type="checkbox" className="cursor-pointer" value={user.id} checked={selectedUsers.includes(user.id)} onChange={(e) => toggleSelect(user, e)} />
                </td>
                <td>
                    <img className='profile-picture' src={user.picture === undefined? kakashi: user.picture} alt={user.picture} />
                </td>
                {
                    editingUser.includes(user.id) ?
                        <>
                            <td>
                                <input type="text" className='width-100' value={user.title} onChange={(e) => updateUserInfo('title', e, user)} />
                            </td>
                            <td>
                                <input type="text" className='width-100' value={user.firstName} onChange={(e) => updateUserInfo('firstName', e, user)} />
                            </td>
                            <td>
                                <input type="text" className='width-100' value={user.lastName} onChange={(e) => updateUserInfo('lastName', e, user)} />
                            </td>
                        </> :
                        <>
                            <td>{user.title?user.title: '-'}</td>
                            <td>{user.firstName? user.firstName: '-'}</td>
                            <td>{user.lastName? user.lastName: '-'}</td>
                        </>
                }
                <td>
                    <div className='d-flex action-btns' >
                        <div>
                            <FontAwesomeIcon icon={editingUser.includes(user.id) ? faCheck : faPen} className="cursor-pointer" onClick={() => toggleEdit(user)} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faTrash} className="cursor-pointer" onClick={() => deleteSingleUser(user)} />
                        </div>
                    </div>
                </td>
        </>
    )
}

export default TableRow