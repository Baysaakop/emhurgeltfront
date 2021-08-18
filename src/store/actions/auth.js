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

export const authFacebook = (access_token, email, name) => {
    return dispatch => {        
        dispatch(authStart());
        axios({
            method: 'POST',
            url: api.authFacebook,
            data: {
                access_token: access_token,
                email: email,
                username: name
            }
        })     
        .then(res => {                             
            const token = res.data.key;            
            localStorage.setItem('token', token);            
            dispatch(authSuccess(token));       
        })
        .catch(err => {
            console.log(err.message)                    
        })                  
    }
}

export const authGoogle = (access_token, email, name) => {
    return dispatch => {        
        dispatch(authStart());
        axios({
            method: 'POST',
            url: api.authGoogle,
            data: {
                access_token: access_token,
                email: email,
                username: name,
            }
        })     
        .then(res => {                             
            const token = res.data.key;            
            localStorage.setItem('token', token);            
            dispatch(authSuccess(token));       
        })
        .catch(err => {
            console.log(err.message)                    
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