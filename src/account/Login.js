import React from 'react';
import { Spin, message, Typography, Breadcrumb, Button } from 'antd';
import { FacebookFilled, GoogleOutlined, LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import './Login.css';

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Login = (props) => {
    if (props.token) {
        message.info("Амжилттай нэвтэрлээ")
        return <Redirect to="/" />
    }

    if (props.error) {
        const errorMessage = props.error.message.toString()
        if (errorMessage.endsWith('400')) {
            message.error("Authentication failed! Username or password is incorrect.")
        }  
    }

    function authFacebook (response) {        
        console.log(response)
        // if (response.status === "unknown") {
        //     message.error("Нэвтрэх явцад алдаа гарлаа. Та дахин оролдоно уу.")
        // } else {
        //     props.onAuthFacebook(response.accessToken, response.email, response.name, response.picture.data.url)
        // }
    }

    function authGoogle (response) {
        console.log(response)
    }

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="/">Нүүр хуудас</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Нэвтрэх
                </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ marginTop: '24px', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>            
            {props.loading ? (
                <Spin indicator={loadingIcon} />
            ) : (
                <div style={{ width: '500px', background: '#fff', padding: '24px' }}>            
                    <Typography.Title level={3} style={{ textAlign: 'center' }}>
                        Нэвтрэх
                    </Typography.Title>                                      
                    <Typography.Text>
                        Та өөрийн ашигладаг Facebook хаягаа ашиглан нэвтэрнэ үү.
                    </Typography.Text>                        
                    <FacebookLogin
                        cssClass="login-facebook"
                        icon={<FacebookFilled />}
                        textButton=" Facebook ашиглан нэвтрэх"
                        appId="358552112401509"
                        fields="name,email,picture"                                    
                        callback={authFacebook}                                    
                    />                                    
                    <GoogleLogin                                                                                                            
                        clientId="<Google Client ID>"
                        buttonText=" Sign in with Google"
                        render={renderProps => (
                            <Button size="large" danger type="primary" onClick={renderProps.onClick} icon={<GoogleOutlined style={{ fontSize: '18px' }} />} style={{ width: '100%', marginTop: '16px' }}>
                                Google ашиглан нэвтрэх
                            </Button>
                        )}
                        onSuccess={authGoogle}                                    
                    />                                                      
                </div>
            )}  
        </div>   
        </div>                 
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,        
        token: state.token,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthFacebook: (access_token) => dispatch(actions.authFacebook(access_token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);