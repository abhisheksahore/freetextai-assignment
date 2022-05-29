const useSorting = (filteredUsersToDisplay, setFilteredUsersToDisplay, usersToDisplay, setUsersToDisplay) => {

    // sortingResult takes sorting param as an arguement and sorts the filteredUsersToDisplay and usersToDisplay in ascending and descending order depending upon the previous order.
    const sortingResult = (sortingParam) => {

        const sortingLogic = (x, y, tempUsers) => {
            if (x.toLowerCase() > y.toLowerCase()) {
                tempUsers.sort((a, b) => {
                    a = a[sortingParam] === undefined ? '-': a[sortingParam].toLowerCase()
                    b = b[sortingParam] === undefined ? '-': b[sortingParam].toLowerCase()
                    if (a > b) {
                        return 1
                    }
                    if (a < b) {
                        return -1
                    }
                    return 0
                })
            } else {
                tempUsers.sort((a, b) => {
                    a = a[sortingParam] === undefined ? '-': a[sortingParam].toLowerCase()
                    b = b[sortingParam] === undefined ? '-': b[sortingParam].toLowerCase()
                    if (a > b) {
                        return -1
                    }
                    if (a < b) {
                        return 1
                    }
                    return 0
                })
            }
            return tempUsers
        }
        if (filteredUsersToDisplay.length > 0) {
            const x = filteredUsersToDisplay[0][sortingParam] === undefined ? "-": filteredUsersToDisplay[0][sortingParam];
            const y = filteredUsersToDisplay[filteredUsersToDisplay.length - 1][sortingParam] === undefined ? "-": filteredUsersToDisplay[filteredUsersToDisplay.length - 1][sortingParam];
            const tempFilterUsersToDisplay = sortingLogic(x, y, [...filteredUsersToDisplay]) 
            setFilteredUsersToDisplay(prev => tempFilterUsersToDisplay)
        } else if (usersToDisplay.length > 0) {
            const x = usersToDisplay[0][sortingParam] === undefined ? "-": usersToDisplay[0][sortingParam];
            const y = usersToDisplay[usersToDisplay.length - 1][sortingParam] === undefined ? "-": usersToDisplay[usersToDisplay.length - 1][sortingParam];
            const tempUsersToDisplay = sortingLogic(x, y, [...usersToDisplay])
            setUsersToDisplay(prev => tempUsersToDisplay)
        }
    }

    return {
        sortingResult
    }
}

export default useSorting