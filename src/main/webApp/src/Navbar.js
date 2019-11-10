
import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import AuthenticationService from './components/authentication/AuthenticationService';
import { AuthenticatedSubject } from './components/authentication/AuthenticatedSubject';
import { UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap/dist/reactstrap/'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import LocaleContext from './common/context/LocaleContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    const locale = useContext(LocaleContext)
    const switchLanguage = (e) => {
        locale.switchLanguage(e.target.value)
    }
    const [isAuthenticated, setAuthenticated] = useState(AuthenticationService.isUserLoggedIn());
    const [user, setUser] = useState({ username: AuthenticationService.getLoggedInUserName() });
    AuthenticatedSubject.subscribe(data => {
        setAuthenticated(true)
        setUser(data)
    })
    let navbar =
        <nav id="myNavBar" className={classNames('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light')}>
            <button className={classNames('navbar-toggler')} type="button" data-toggle="collapse"
                data-target="#myNavbar" aria-controls="myNavbar"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className={classNames('navbar-toggler-icon')}></span>
            </button>
            <div className={classNames('collapse', 'navbar-collapse')} id="myNavbar">
                <div className={classNames('navbar-nav', 'navbar-center')} >
                    <NavLink to="/home" activeClassName='is-active' className={classNames('nav-item', 'nav-link')}><FormattedMessage id='home' /></NavLink>
                    {isAuthenticated && <NavLink to="/customers" activeClassName='is-active' className={classNames('nav-item', 'nav-link')}><FormattedMessage id='customers' /></NavLink>}
                    {isAuthenticated && <NavLink to="/orders" activeClassName='is-active' className={classNames('nav-item', 'nav-link')}><FormattedMessage id='orders' /></NavLink>}
                    {isAuthenticated && <NavLink to="/products" activeClassName='is-active' className={classNames('nav-item', 'nav-link')}><FormattedMessage id='products' /></NavLink>}
                    {!isAuthenticated && <NavLink to="/login" activeClassName='is-active' className={classNames('nav-item', 'nav-link')}><FormattedMessage id='login' /></NavLink>}
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                                <FontAwesomeIcon icon={faGlobe} />
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem value='ar' onClick={switchLanguage}>عربي</DropdownItem>
                            <DropdownItem value='en' onClick={switchLanguage}>English</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    {isAuthenticated && <NavLink to="/logout" className={classNames('nav-item', 'nav-link', 'float-right')}
                        onClick={AuthenticationService.logout}><FormattedMessage id='logout' />
                        &nbsp;
                            <FontAwesomeIcon icon={faSignOutAlt} />
                    </NavLink>}
                </div>
            </div>
            {isAuthenticated && <FormattedHTMLMessage id="welcomeUser" values={{ user: user.firstName }} />}
        </nav>

    return (

        navbar
    )
}

export default Navbar