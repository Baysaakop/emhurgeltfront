import * as actionTypes from './actionTypes';
import axios from 'axios';
import api from '../../api';
import { message } from 'antd';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    };
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const logout = () => {
    localStorage.removeItem('token');    
    message.info("Гарлаа.")
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const authStaffSignin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(api.staffsignin, {
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.key;            
            localStorage.setItem('token', token);            
            dispatch(authSuccess(token));    
        })
        .catch(err => {
            dispatch(authFail(err));
        })
    }
}

export const authSignin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(api.signin, {
            username: username,
            password: password
        })
        .then(res => {
            console.log(res)
            if (res.data.user.is_confirmed === true) {
                const token = res.data.key;            
                localStorage.setItem('token', token);            
                dispatch(authSuccess(token));    
            } else {
                console.log("Not confirmed")
                dispatch(authFail("Not confirmed"))
            }            
        })
        .catch(err => {
            console.log(err.message)
            dispatch(authFail(err.message));
        })
    }
}

export const updateCart = (cart) => {            
    return {
        type: actionTypes.UPDATE_CART,
        cart: cart
    };
}

export const updateSaved = (saved) => {            
    return {
        type: actionTypes.UPDATE_SAVED,
        saved: saved
    };
}

export const changeLanguage = (language) => {         
    localStorage.setItem('language', language)   
    return {
        type: actionTypes.LANGUAGE_CHANGED,
        language: language
    };
}