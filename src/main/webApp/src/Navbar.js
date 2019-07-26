
import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className={classNames('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light')}>
            <button className={classNames('navbar-toggler')} type="button" data-toggle="collapse"
                data-target="#myNavbar" aria-controls="myNavbar"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className={classNames('navbar-toggler-icon')}></span>
            </button>
            <div className={classNames('collapse', 'navbar-collapse')} id="myNavbar">
                <div className={classNames('navbar-nav', 'navbar-center')} >
                    <Link to="/customers"><a className={classNames('nav-item', 'nav-link')}>Customers</a></Link>
                    <Link to="/orders"><a className={classNames('nav-item', 'nav-link')}>Orders</a></Link>
                    <Link to="/products"><a className={classNames('nav-item', 'nav-link')}>Products</a></Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar