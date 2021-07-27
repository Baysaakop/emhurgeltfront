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
    message.info("Signed out")
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const authFacebook = (access_token, email, name, picture) => {
    return dispatch => {        
        dispatch(authStart());
        axios({
            method: 'POST',
            url: api.authFacebook,
            data: {
                access_token: access_token,
                email: email,
                name: name,
                picture: picture
            }
        })     
        .then(res => {                 
            console.log(res)       
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
    console.log(cart)
    return {
        type: actionTypes.UPDATE_CART,
        cart: cart
    };
}