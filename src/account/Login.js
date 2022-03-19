import React from 'react';
import { Spin, Typography, Form, Button, Input, Result } from 'antd';
import { LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import './Login.css';

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Login = (props) => {

    const [form] = Form.useForm();

    const onFinish = (values) => {                
        props.onAuthSignin(values.username, values.password);               
    }

    return (
        <div>
            <div style={{ marginTop: '24px', minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>            
                { props.loading ? (
                    <Spin indicator={loadingIcon} />
                ) : props.token ? (
                    <div style={{ background: '#FFF', padding: '16px' }}>
                        <Result
                            status="success"
                            title="Амжилттай нэвтэрлээ."                            
                            extra={[
                                <Button href="/" type="primary">
                                    Нүүр хуудас руу буцах
                                </Button>
                            ]}
                        />
                    </div>
                ) : props.error ? (
                    <div style={{ background: '#FFF', padding: '16px' }}>
                        <Result
                            status="500"
                            title={
                                props.error === "Not confirmed" ?
                                    "Таны бүртгэлийг хараахан идэвхижүүлээгүй байна."
                                : props.error.includes("400") ? 
                                    "Нэвтрэх нэр эсвэл нууц үг буруу байна."
                                : props.error.includes("500") ? 
                                    "Серверт асуудал гарсан тул түр хүлээгээд дахин оролдоно уу."
                                : 
                                    "Алдаа гарлаа. Дахин оролдоно уу."
                            }
                            subTitle="Та хуудсаа refresh хийж дахин оролдоно уу."
                            extra={[
                                <Button href="/" type="primary">
                                    Нүүр хуудас руу буцах
                                </Button>
                            ]}
                        />
                    </div>
                ) : (
                    <div style={{ width: '500px', background: '#fff', padding: '24px' }}>            
                        <Typography.Title level={3} style={{ textAlign: 'center' }}>
                            Нэвтрэх
                        </Typography.Title>                                      
                        <Form
                            form={form}
                            layout="vertical"
                            name="signup"
                            onFinish={onFinish}
                        >
                            <Form.Item                                
                                name="username"
                                label="Утасны дугаар"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Утасны дугаар оруулна уу!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined style={{ color: '#a1a1a1' }} />} placeholder="Утасны дугаар" />
                            </Form.Item>
                            <Form.Item                                
                                name="password"
                                label="Нэвтрэх нууц үг"
                                rules={[
                                {
                                    required: true,
                                    message: 'Нэвтрэх нууц үг оруулна уу!',
                                },
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined style={{ color: '#a1a1a1' }} />} placeholder="Нууц үг" />
                            </Form.Item>
                            <Button block type="primary" htmlType="submit" onClick={form.submit}>Нэвтрэх</Button>
                        </Form>
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
        onAuthSignin: (username, password) => dispatch(actions.authSignin(username, password))        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);