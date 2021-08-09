import React from 'react';
import { Button, Divider, Result, Typography } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { Redirect } from 'react-router';
import { CloseOutlined } from '@ant-design/icons';

const Logout = (props) => {    
    
    const onClick = () => {                
        props.logout();               
    };

    if (!props.token) {
        return <Redirect to="/" />
    }

    return (
        <div style={{ background: '#fff', borderRadius: '2px', padding: '24px' }}>
            <Typography.Title level={4}>Гарах</Typography.Title>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '350px' }}>
                <Result
                        status="warning"
                        title="Та гарахдаа итгэлтэй байна уу?"
                        extra={
                            <Button danger size="large" type="primary" icon={<CloseOutlined />} onClick={onClick}>
                                Гарах
                            </Button>
                        }
                    />
            </div>          
        </div>   
    );
};

const mapStateToProps = (state) => {
    return {          
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);