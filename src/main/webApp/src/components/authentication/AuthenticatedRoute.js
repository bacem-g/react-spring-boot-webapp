import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from './AuthenticationService';
import { AuthenticatedSubject } from './AuthenticatedSubject';

const AuthenticatedRoute = (props) =>  {
    const [isAuthenticated, setAuthenticated] = useState(AuthenticationService.isUserLoggedIn());
    AuthenticatedSubject.subscribe(data => {
        setAuthenticated(true)
    })

    let route = <Redirect to="/login" />
    if (isAuthenticated) {
        route = <Route {...props} />
    }

    return(
        route
    )
}

export default AuthenticatedRoute