import { useEffect, useState } from 'react'

// This useFilterUser hook takes initialState as an arguement and returns an object which contains filtered list of users and the 
const useFilterUser = (usersToDisplay) => {

    const [filterParam, setFilterParam] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])
    const [filteredUsersToDisplay, setFilteredUsersToDisplay] = useState([])
    const [filteredUsersOffset, setFilteredUsersOffset] = useState(0)
    const [moreFilteredUsers, setMoreFilteredUsers] = useState(true)


    // filters the users  of the basis of filter params and set it to filter users
    const filterUsers = () => {
        const filteredUsersTemp = usersToDisplay.reduce((filteredUsersAcc, user) => {
            const filterParamArray = filterParam.split(' ').filter(e => e !== '');
            if (
                (user.title && (user.title.toLowerCase().includes(filterParam.toLowerCase()) || filterParamArray.filter(e => user.title.toLowerCase().includes(e.toLowerCase())).length > 0)) ||
                (user.firstName && (user.firstName.toLowerCase().includes(filterParam.toLowerCase()) || filterParamArray.filter(e => user.firstName.toLowerCase().includes(e.toLowerCase())).length > 0)) ||
                (user.lastName && (user.lastName.toLowerCase().includes(filterParam.toLowerCase()) || filterParamArray.filter(e => user.lastName.toLowerCase().includes(e.toLowerCase())).length > 0))
            ) {
                filteredUsersAcc.push(user)
            }
            return filteredUsersAcc;
        }, [])
        setFilteredUsers(prev => filteredUsersTemp);
    }


    // this hook runs when then there is any change in filteredUsers and sets the filteredUsersToDisplay array to initial 20 users in filteredUsers and set the offset to 20 or the length of the filteredUser array if it's length is less then 20.
    useEffect(() => {
        if (filteredUsers.length > 0 && filteredUsersToDisplay.length === 0) {
            if (filteredUsers.length >= 20) {
                setFilteredUsersToDisplay(prev => filteredUsers.slice(0, 20))
                setFilteredUsersOffset(prev => 20)
            } else {
                setFilteredUsersToDisplay(prev => filteredUsers.slice(0, filteredUsers.length))
                setFilteredUsersOffset(prev => filteredUsers.length)
            }
        } else if (filteredUsers.length === 0) {
            setFilteredUsersToDisplay(prev => [])
            setFilteredUsersOffset(prev => 0)
        }
    }, [filteredUsers])

    
    // runs the filterUser function if the length of gfilterr params in greater than 0 and set the filteredUsers and filteredUsersToDisplay to an empty array when the length of filter params is 0. 
    useEffect(() => {
        if (filterParam.length > 0) {
            setFilteredUsersToDisplay(prev => [])
            filterUsers();
            setMoreFilteredUsers(true)
        } else {
            setFilteredUsers(prev => [])
            setFilteredUsersToDisplay(prev => [])
        }
    }, [filterParam])

    return {
        filterParam,
        setFilterParam,
        filteredUsers,
        setFilteredUsers,
        filteredUsersToDisplay,
        setFilteredUsersToDisplay,
        filterUsers,
        filteredUsersOffset,
        setFilteredUsersOffset,
        setMoreFilteredUsers,
        moreFilteredUsers
    }
}

export default useFilterUser