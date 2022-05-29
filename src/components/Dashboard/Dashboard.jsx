import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import TableRow from '../TableRow/TableRow'
import useFilterUser from '../../customHooks/useFilterUser'
import useDeleteUser from '../../customHooks/useDeleteUser'
import useSorting from '../../customHooks/useSorting'
import useObservers from '../../customHooks/useObservers'
import useUpdateUserInfo from '../../customHooks/useUpdateUserInfo'

const Dashboard = () => {

    const [error, setError] = useState(false)
    const [usersToDisplay, setUsersToDisplay] = useState([])  // usersToDisplay is an array of users being displayed without filters
    const [users, setUsers] = useState([]) //users is an array which contains all the fetched users
    const [userOffset, setUserOffset] = useState(0); // userOffset is a number which contains the offset of the users that are being rendered.
    const [loadingUsersToDisplay, setLoadingUsersToDisplay] = useState(false); // loadingUsersToDisplay is a boolean which determines if user are loading or loading is completed.
    const [editingUser, setEditingUser] = useState([]) // editingUser is an array of users whom are currently getting edited.
    const [selectedUsers, setSelectedUsers] = useState([]) // selectedUsers is an array which contains userID of the users that are selected.

    const {
        filterParam,
        setFilterParam,
        filteredUsers,
        setFilteredUsers,
        filteredUsersToDisplay,
        setFilteredUsersToDisplay,
        filteredUsersOffset,
        setFilteredUsersOffset,
        setMoreFilteredUsers,
        moreFilteredUsers
    } = useFilterUser(usersToDisplay) // useFilterUser hook contains the business logic related to filtering.


    // useDeleteUser hook contains the business logic related to deleting of users.
    const { deleteSelectedUser, deleteSingleUser } = useDeleteUser(  
        filteredUsers,
        setFilteredUsers,
        filteredUsersToDisplay,
        setFilteredUsersToDisplay,
        filteredUsersOffset,
        setFilteredUsersOffset,
        usersToDisplay,
        setUsersToDisplay,
        users,
        setUsers,
        setSelectedUsers,
        setUserOffset,
        selectedUsers
    )

    // useObserver hook contains the business logic related to intersection observer and how the states will update when there is an intersection.
    const { lastFilteredUserRef, lastUserRef } = useObservers(
        users,
        usersToDisplay,
        loadingUsersToDisplay,
        userOffset,
        setLoadingUsersToDisplay,
        setUsersToDisplay,
        setUserOffset,
        moreFilteredUsers,
        filteredUsers,
        filteredUsersToDisplay,
        setFilteredUsersToDisplay,
        filteredUsersOffset,
        setFilteredUsersOffset,
        setMoreFilteredUsers
    )

    // useUpdateUserInfo hook contains the business logic related to updating of user info
    const { updateUserInfo } = useUpdateUserInfo(usersToDisplay, users, setUsersToDisplay, setUsers, filteredUsers, filteredUsersToDisplay, setFilteredUsers, setFilteredUsersToDisplay)

    // useSorting hook contains the business logic related to sorting of users (ascending and descending)
    const { sortingResult } = useSorting(filteredUsersToDisplay, setFilteredUsersToDisplay, usersToDisplay, setUsersToDisplay)


    // fetchUsers is a function that contains logic to fetch users
    const fetchUsers = () => {
        setError(false)
        fetch(`https://storage.googleapis.com/thereviewindex-generalindex-views/tmp/users.json`)
        .then(response =>  response.json())
        .then(data => {
            setUsers(prev => data.data)
        }).catch(error => {
            setError(true)
            console.error(error);
        })
    }


    // fetches data when the page loads.
    useEffect(() => {
        fetchUsers();
    }, [])


    // this useEffect() hook runs when there is change in users array statea and sets usersToDisplay to initial 20 users and sets the offfset to 20.
    useEffect(() => {
        if (users.length > 0 && usersToDisplay.length === 0) {
            setUsersToDisplay(prev => users.slice(0, 20))
            setUserOffset(prev => 20)
        }
    }, [users])


    // Toggle edit toggles the inline input boxes in table to edit user info.
    const toggleEdit = (user) => {
        const userPresent = editingUser.filter(e => e === user.id);
        if (userPresent.length === 1) {
            setEditingUser(() => editingUser.filter(e => e !== user.id))
        } else if (userPresent.length === 0) {
            setEditingUser(prev => [...prev, user.id])
        }
    }

    // Toggle select selects and deselects the users via checkbox.
    const toggleSelect = (user, e) => {
        if (e.target.checked === true) {
            setSelectedUsers(prev => [...prev, user.id])
        } else if (e.target.checked === false) {
            setSelectedUsers(prev => selectedUsers.filter(userID => userID !== user.id))
        }
    }

    // selectAllUsers selects all those users which are currently getting rendered.
    const selectAllUsers = (event) => {
        if (event.target.checked === true) {
            if (filteredUsersToDisplay.length > 0) {
                setSelectedUsers(prev => filteredUsersToDisplay.map(user => user.id))
            } else if (filteredUsersToDisplay.length === 0 && filterParam.length > 0) {
                setSelectedUsers(prev => [])
            } else if (usersToDisplay.length > 0 && filterParam.length === 0) {
                setSelectedUsers(prev => usersToDisplay.map(user => user.id))
            }
        } else if (event.target.checked === false) {
            setSelectedUsers(prev => [])
        }
    }


    return (
        <div className='container'>
            <div className='header-container'>
                <div >
                    <input type="text" className='search_bar' value={filterParam} onChange={e => setFilterParam(e.target.value)} placeholder='Search by name or title' />
                </div>
                <div className='btn btn-danger'>
                    <div onClick={deleteSelectedUser}>Delete Selected</div>
                </div>
            </div>
            <div className='table-wrapper'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>
                                <div className='cursor-pointer'>
                                    <input type="checkbox" checked={(filteredUsersToDisplay.length > 0 && selectedUsers.length === filteredUsersToDisplay.length) || (usersToDisplay.length > 0 && selectedUsers.length === usersToDisplay.length) ? true :  false} onChange={e => selectAllUsers(e)} />
                                </div>
                            </th>
                            <th><div className='cursor-pointer'>Image</div></th>
                            <th><div className='cursor-pointer' onClick={() => sortingResult('title')}>Title</div></th>
                            <th><div className='cursor-pointer' onClick={() => sortingResult('firstName')}>First Name</div></th>
                            <th><div className='cursor-pointer' onClick={() => sortingResult('lastName')}>Last Name</div></th>
                            <th><div className='cursor-pointer'>Actions</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUsersToDisplay && filteredUsersToDisplay.length > 0 ?
                                filteredUsersToDisplay.map((user, index) => {
                                    if (index === filteredUsersToDisplay.length - 1) {
                                        return (
                                            <tr ref={lastFilteredUserRef} key={user.id} className={selectedUsers.includes(user.id) ? "background-color-grayish" : null}>
                                                <TableRow user={user} selectedUsers={selectedUsers} toggleSelect={toggleSelect} deleteSingleUser={deleteSingleUser} editingUser={editingUser} updateUserInfo={updateUserInfo} toggleEdit={toggleEdit} />
                                            </tr>
                                        )
                                    } else {
                                        return (
                                            <tr key={user.id} className={selectedUsers.includes(user.id) ? "background-color-grayish" : null}>
                                                <TableRow user={user} selectedUsers={selectedUsers} toggleSelect={toggleSelect} deleteSingleUser={deleteSingleUser} editingUser={editingUser} updateUserInfo={updateUserInfo} toggleEdit={toggleEdit} />
                                            </tr>
                                        )
                                    }
                                }) :
                                usersToDisplay && usersToDisplay.length > 0 && filterParam.length === 0 ?
                                    usersToDisplay.map((user, index) => {
                                        if (index === usersToDisplay.length - 1) {
                                            return (
                                                <tr ref={lastUserRef} key={user.id} className={selectedUsers.includes(user.id) ? "background-color-grayish" : null}>
                                                    <TableRow user={user} selectedUsers={selectedUsers} toggleSelect={toggleSelect} deleteSingleUser={deleteSingleUser} editingUser={editingUser} updateUserInfo={updateUserInfo} toggleEdit={toggleEdit} />
                                                </tr>
                                            )
                                        } else {
                                            return (
                                                <tr key={user.id} className={selectedUsers.includes(user.id) ? "background-color-grayish" : null}>
                                                    <TableRow user={user} selectedUsers={selectedUsers} toggleSelect={toggleSelect} deleteSingleUser={deleteSingleUser} editingUser={editingUser} updateUserInfo={updateUserInfo} toggleEdit={toggleEdit} />
                                                </tr>
                                            )
                                        }
                                    }) :
                                    null
                        }
                    </tbody>
                </table>
            </div>
            {
                loadingUsersToDisplay ? <h1 className='message'>Loading...</h1> : null
            }
            {
                filteredUsers && filteredUsers.length === 0 && filterParam.length !== 0 ? <h1 className='message'>No user found</h1> : null
            }
            {
                error? <><h1 className='message'>Unable to fetch Data.</h1> <div className='btn try-again-btn' onClick={fetchUsers}>Try again.</div></>: null
            }
        </div>
    )
}

export default Dashboard