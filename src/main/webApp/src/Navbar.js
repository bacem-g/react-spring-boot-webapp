
import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
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
                </div>
            </div>
        </nav>
    )
}

export default Navbar