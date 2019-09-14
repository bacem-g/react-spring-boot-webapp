import axios from 'axios'
import AuthenticationService from './AuthenticationService';

const configureAxiosInterceptors = () => {
    axios.interceptors.response.use((response) => {
      return response;
      },
      (error) => {
        console.log('window.location.pathname ' + window.location.pathname)
        if(error.response.status === 401 && window.location.pathname !== '/login') {
          AuthenticationService.logout()
          window.location.replace('/login')
        }
        return Promise.reject(error);
      }
    )
  }

  export default configureAxiosInterceptors