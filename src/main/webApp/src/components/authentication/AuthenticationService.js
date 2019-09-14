import Axios from "axios";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {
    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    }


    logout() {
        Axios.post('/logout')
            .then(() => {
                sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
                document.location.href = '/login'
            })
            .catch(error => {
                console.log('Unable to logout')
            })
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }
}

export default new AuthenticationService()