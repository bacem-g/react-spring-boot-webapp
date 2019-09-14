
import React, { useState } from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import AuthenticationService from './components/authentication/AuthenticationService';
import { AuthenticatedSubject } from './components/authentication/AuthenticatedSubject';

const Navbar = () => {

    const [isAuthenticated, setAuthenticated] = useState(AuthenticationService.isUserLoggedIn());
    const [user, setUser] = useState({username: AuthenticationService.getLoggedInUserName()});
    AuthenticatedSubject.subscribe(data => {
        setAuthenticated(true)
        setUser(data)
    })
    let navbar = null

    if(isAuthenticated) {
        navbar = 
            <nav id="myNavBar" className={classNames('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light')}>
                <button className={classNames('navbar-toggler')} type="button" data-toggle="collapse"
                    data-target="#myNavbar" aria-controls="myNavbar"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className={classNames('navbar-toggler-icon')}></span>
                </button>
                <div className={classNames('collapse', 'navbar-collapse')} id="myNavbar">
                    <div className={classNames('navbar-nav', 'navbar-center')} >
                        <NavLink to="/customers" activeClassName='is-active' className={classNames('nav-item', 'nav-link')}>Customers</NavLink>
                        <NavLink to="/orders" activeClassName='is-active' className={classNames('nav-item', 'nav-link')}>Orders</NavLink>
                        <NavLink to="/products" activeClassName='is-active' className={classNames('nav-item', 'nav-link')}>Products</NavLink>
                        <NavLink to="/logout" className={classNames('nav-item', 'nav-link', 'float-right')}
                                onClick={AuthenticationService.logout}>Logout</NavLink>
                    </div>
                </div>
                Welecome <b>&nbsp;{user.username}</b>
            </nav>
    }

    return (
        navbar
    )
}

export default Navbar