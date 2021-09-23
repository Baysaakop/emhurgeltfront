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
            if (err.message.includes("400")) {
                message.error("Ажилтаны код эсвэл нууц үг буруу байна!")
            } else if (err.message.includes("500")) {
                message.error("Серверт асуудал гарсан тул түр хүлээгээд дахин оролдоно уу.")
            } else {
                message.error("Алдаа гарлаа. Дахин оролдоно уу.")
                console.log(err)
            }
        })
    }
}

export const authStaffSignup = (username, password1, password2) => {
    return dispatch => {
        axios.post(api.staffsignup, {
            username: username,            
            password1: password1,
            password2: password2
        })
        .then(res => {
            message.info(`${username} ажилтаныг бүртгэлээ.`);
        })
        .catch(err => {
            dispatch(authFail(err))
            if (err.message.includes("400")) {
                message.error("Username or password is incorrect!")
            } else if (err.message.includes("500")) {
                message.error("Sorry, server error has occured. Please, try again later.")
            } else {
                message.error("Error has occured. Try again.")
                console.log(err)
            }
        })
    }
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