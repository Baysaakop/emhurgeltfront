import React, { useEffect } from 'react';
import { Form, Input, Button, Typography, Spin, Divider } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../store/actions/auth';

function StaffLogin (props) {
    const history = useHistory()
    const [form] = Form.useForm()    

    useEffect(() => {
        if (props.token) {
            history.push("/staff")
        }  
    }, [props.token]) // eslint-disable-line react-hooks/exhaustive-deps

    const onFinish = (values) => {                
        props.onAuth(values.username, values.password);       
        // props.history.goBack();
    }

    return (
        <div style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {props.loading ? (
                <Spin tip="Уншиж байна..." />
            ) : (
                <div style={{ width: '400px', background: '#fff', padding: '24px' }}>
                    <Typography.Title level={3} style={{ textAlign: 'center' }}>
                        Ажилтаны эрхээр нэвтрэх                    
                    </Typography.Title>        
                    <Divider />
                    <Form                            
                        form={form}         
                        layout="vertical"                                               
                        onFinish={onFinish}                            
                    >
                        <Form.Item                                
                            name="username"
                            label="Ажилтны код"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ажилтаны кодыг заавал оруулна уу!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined style={{ color: '#a1a1a1' }} />} placeholder="Нэр" />
                        </Form.Item>
                        <Form.Item                                
                            name="password"
                            label="Нэвтрэх нууц үг"
                            rules={[
                            {
                                required: true,
                                message: 'Нууц үг заавал оруулна уу!',
                            },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined style={{ color: '#a1a1a1' }} />} placeholder="Нууц үг" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Нэвтрэх
                            </Button>
                        </Form.Item>
                    </Form>           
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,        
        token: state.token,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authStaffSignin(username, password))        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffLogin);