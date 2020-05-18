import axios from 'axios';

// Constants
const URL = {
    BASE: 'http://192.168.0.108:8000/api',
    AUTH: '/token/',
    USER: '/users/',
    DATA: '',
    LOG: '',
}

const api = axios.create({
    baseURL: URL.BASE,
})

export function getJWT(loginData) {
    api({
        method: `post`,
        url: URL.AUTH,
        responseType: `json`,
        data: {
            username: loginData.user,
            password: loginData.password,
        }
    }).then (function (response) {
        console.log(response)
        // todo: send tokens to redux store
    }).catch(function (error) { 
        // todo: create auth error exception
    });
}

export function getUsers(){
}
