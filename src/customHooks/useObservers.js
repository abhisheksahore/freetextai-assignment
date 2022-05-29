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
        console.log("callback running")
        if (userObserver.current) {
            userObserver.current.disconnect()
        }
        userObserver.current = new IntersectionObserver(entries => {
            console.log(users.length)
            console.log(usersToDisplay.length)
            console.log(' i n t e r s e c t i n g   -    ',entries[0].isIntersecting)
            if (entries[0].isIntersecting && users.length > usersToDisplay.length && loadingUsersToDisplay === false) {
                console.log('fetching more users')
                console.log('userOffset -- ', usersToDisplay.length)
                console.log('userOffset + 10 -- ', usersToDisplay.length + 10)
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


    useEffect(() => {
      console.log(filteredUsersToDisplay)
    }, [filteredUsersToDisplay])
    


    const filteredUserObserver = useRef();

    // lastFilteredUserRef is a callback which depends on filteredUsers and filteredUsersToDisplay and sets an intersection observer on the last element of the filteredUsersToDisplay array and updates the state when conditions are met.
    const lastFilteredUserRef = useCallback((el) => {
        console.log('calback running')
        if (filteredUserObserver.current) {
            filteredUserObserver.current.disconnect()
        }
        filteredUserObserver.current = new IntersectionObserver(entries => {
            console.log(entries)
            console.log(' i n t e r s e c t i n g   -    ',entries[0].isIntersecting)
            if (entries[0].isIntersecting && moreFilteredUsers && filteredUsers.length > filteredUsersToDisplay.length) {
                if (filteredUsers.length - filteredUsersToDisplay.length >= 10 && loadingUsersToDisplay === false) {
                    console.log("off set added by 10")
                    setLoadingUsersToDisplay(true);
                    setTimeout(() => {
                        setFilteredUsersToDisplay(prev => [...prev, ...filteredUsers.slice(filteredUsersOffset, filteredUsersOffset + 10)])
                        setFilteredUsersOffset(prev => filteredUsersOffset + 10)
                        setLoadingUsersToDisplay(false);
                    }, 1000);
                } else if (loadingUsersToDisplay === false) {
                    setLoadingUsersToDisplay(true);
                    setTimeout(() => {
                        setMoreFilteredUsers(false);
                        setFilteredUsersToDisplay(prev => [...prev, ...filteredUsers.slice(filteredUsersOffset, filteredUsers.length)])
                        setFilteredUsersOffset(prev => filteredUsers.length)
                        setLoadingUsersToDisplay(false);
                        console.log('last fetching')    
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