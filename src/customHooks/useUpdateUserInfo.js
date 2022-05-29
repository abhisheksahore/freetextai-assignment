const useUpdateUserInfo = (usersToDisplay, users, setUsersToDisplay, setUsers, filteredUsers, filteredUsersToDisplay, setFilteredUsers, setFilteredUsersToDisplay) => {
    
    // Updates the user info in all the arrays containing user info based on the data filled by user in inline input fields.
    const updateUserInfo = (type, event, user) => {
        const updatedUserToDisplayList = usersToDisplay.map(e => {
            if (e.id === user.id) {
                e[type] = event.target.value
            }
            return e;
        })
        const updatedUserList = users.map(e => {
            if (e.id === user.id) {
                e[type] = event.target.value
            }
            return e;
        })
        setUsersToDisplay(prev => updatedUserToDisplayList)
        setUsers(prev => updatedUserList)


        if (filteredUsers.length > 0) {
            const updatedFilteredUserList = filteredUsers.map(e => {
                if (e.id === user.id) {
                    e[type] = event.target.value
                }
                return e;
            })
            const updatedFilteredUserToDisplayList = filteredUsersToDisplay.map(e => {
                if (e.id === user.id) {
                    e[type] = event.target.value
                }
                return e;
            })
            setFilteredUsers(prev => updatedFilteredUserList)
            setFilteredUsersToDisplay(prev => updatedFilteredUserToDisplayList)
        }
    }

    return {updateUserInfo}
}

export default useUpdateUserInfo