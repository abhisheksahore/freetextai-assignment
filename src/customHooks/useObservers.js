import { useCallback, useEffect, useRef } from 'react'

const useObservers = (
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
) => {


    const userObserver = useRef();

    // lastUserRef is a callback which depends on users and usersToDisplay and sets an intersection observer on the last element of the usersToDisplay array and updates the state when conditions are met.
    const lastUserRef = useCallback((el) => {
        if (userObserver.current) {
            userObserver.current.disconnect()
        }
        userObserver.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && users.length > usersToDisplay.length && loadingUsersToDisplay === false) {
                setLoadingUsersToDisplay(true);
                setTimeout(() => {
                    setUsersToDisplay(prev => [...prev, ...users.slice(userOffset, userOffset + 10)])
                    setUserOffset(prev => userOffset + 10)
                    setLoadingUsersToDisplay(false);
                }, 1000);
            }
        })
        if (el) {
            userObserver.current.observe(el)
        }
    }, [users, usersToDisplay])


    const filteredUserObserver = useRef();

    // lastFilteredUserRef is a callback which depends on filteredUsers and filteredUsersToDisplay and sets an intersection observer on the last element of the filteredUsersToDisplay array and updates the state when conditions are met.
    const lastFilteredUserRef = useCallback((el) => {
        if (filteredUserObserver.current) {
            filteredUserObserver.current.disconnect()
        }
        filteredUserObserver.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && moreFilteredUsers && filteredUsers.length > filteredUsersToDisplay.length) {
                if (filteredUsers.length - filteredUsersToDisplay.length >= 10 && loadingUsersToDisplay === false) {
                    setLoadingUsersToDisplay(true);
                    setTimeout(() => {
                        setFilteredUsersToDisplay(prev => [...prev, ...filteredUsers.slice(filteredUsersOffset, filteredUsersOffset + 10)])
                        setFilteredUsersOffset(prev => filteredUsersOffset + 10)
                        setLoadingUsersToDisplay(false);
                    }, 1000);
                } else if (loadingUsersToDisplay === false) {
                    setLoadingUsersToDisplay(true);
                    setMoreFilteredUsers(false);
                    setTimeout(() => {
                        setFilteredUsersToDisplay(prev => [...prev, ...filteredUsers.slice(filteredUsersOffset, filteredUsers.length)])
                        setFilteredUsersOffset(prev => filteredUsers.length)
                        setLoadingUsersToDisplay(false);   
                    }, 1000);
                }
            }
        })
        if (el) {
            filteredUserObserver.current.observe(el)
        }
    }, [filteredUsers, filteredUsersToDisplay])


    return { lastUserRef, lastFilteredUserRef }
}

export default useObservers