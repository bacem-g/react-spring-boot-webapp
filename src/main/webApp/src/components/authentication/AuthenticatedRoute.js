import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from './AuthenticationService';

const AuthenticatedRoute = (props) =>  {
    let route
    if (AuthenticationService.isUserLoggedIn()) {
        route = <Route {...props} />
    } else {
        route = <Redirect to="/login" />
    }

    return(
        route
    )
}

export default AuthenticatedRoute