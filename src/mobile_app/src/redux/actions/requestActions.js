import axios from 'axios';

export const GET_TOKEN = "GET_TOKEN"
export const RECEIVE_TOKEN = "RECEIVE_TOKEN"
export const INVALIDATE_TOKEN = "INVALIDATE_TOKEN"
export const DECODE_JWT = "DECODE_JWT"


const requestToken = () => {
    return {
        type: GET_TOKEN,
    }
}

const receiveToken = (token) => {
    return {
        type: RECEIVE_TOKEN,
        token,
    }
}

export const invalidateToken = () => {
    return {
        type: INVALIDATE_TOKEN,
        token: {
            access: null,
            refresh: null,
        },
    }
}

export const decodeJWT = () => {
    return {
        type: DECODE_JWT,
    }
}

export function authenticateUser(credentials) {
    return function (dispatch) {
        dispatch(requestToken());

        const api = axios.create({
            baseURL: 'http://192.168.0.108:8000/api',
        })

        return api({
            method: 'post',
            url: '/token/',
            data: credentials,
        }).then(function (response) {
            return dispatch(receiveToken(response.data));
        });
    }
}
