import React, { useState } from 'react'
import UserContext from '../context/UserContext'

const UserProvider = (props) => {

    const [user, setUser] = useState({})

    return (
        <UserContext.Provider
            value={{user: user, setUser: setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider