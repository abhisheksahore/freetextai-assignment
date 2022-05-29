const useDeleteUser = (
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
) => {


    // deleteSingleUser function deletes the single user from filtered users list, filteredUsersToDisplay List, users list and usersToDisplay list and decrements the offset by 1.
    const deleteSingleUser = (user) => {
        if (filteredUsersToDisplay.length > 0) {
            setFilteredUsers(prev => filteredUsers.filter(e => e.id !== user.id))
            setFilteredUsersToDisplay(prev => filteredUsersToDisplay.filter(e => e.id !== user.id))
            setFilteredUsersOffset(prev => prev - 1)
        }
        setUsersToDisplay(prev => usersToDisplay.filter(e => e.id !== user.id))
        setUsers(prev => users.filter(e => e.id !== user.id))
        setUserOffset(prev => prev - 1)
    }


    // deleteSelectedUser function deletes all the users that are present in selectedUsers array and decrements the offset by length of selectedUsers array.
    const deleteSelectedUser = () => {
        if (filteredUsersToDisplay.length > 0) {
            setFilteredUsers(prev => filteredUsers.filter(e => !selectedUsers.includes(e.id)))
            setFilteredUsersToDisplay(prev => filteredUsersToDisplay.filter(e => !selectedUsers.includes(e.id)))
            setFilteredUsersOffset(prev => prev - selectedUsers.length)
        }
        setUsersToDisplay(prev => usersToDisplay.filter(e => !selectedUsers.includes(e.id)))
        setUsers(prev => users.filter(e => !selectedUsers.includes(e.id)))
        setUserOffset(prev => prev - selectedUsers.length)
        setSelectedUsers(prev => [])

    }


    return {
        deleteSelectedUser,
        deleteSingleUser
    }
}

export default useDeleteUser