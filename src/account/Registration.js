import React, { useState } from 'react';
import { Spin, message, Typography, Button, Form, Input, Result, InputNumber } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import api from '../api';

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Registration = (props) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    if (props.token) {
        message.info("Нэвтэрсэн байна.")
        return <Redirect to="/" />
    }

    function onFinish (values) {               
        setLoading(true) 
        axios.post(api.signup, {
            username: values.username,             
            company_name: values.company_name,              
            company_id: values.company_id,            
            address: values.address,   
            email: values.email,            
            password1: values.password,
            password2: values.confirm,
            role: 3
        })
        .then(res => {            
            setSuccess(true)
            setError(undefined)
            setLoading(false) 
        })
        .catch(err => {            
            setError(err)
            setSuccess(false)
            setLoading(false)             
        })
    }    

    const validatePassword = (rule, value, callback) => {
        if (value.length < 8) {
            callback("Нууц үг багадаа 8 тэмдэгт байх ёстой.");
        } else if (value.search(/\d/) === -1) {
            callback("Нууц үг дор хаяж 1 тоо агуулсан байх ёстой.");
        } else if (value.search(/[a-zA-Z]/) === -1) {
            callback("Нууц үг дор хаяж 1 үсэг агуулсан байх ёстой.");
        } else {
            callback();
        }
    };

    return (
        <div>
            <div style={{ marginTop: '24px', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>            
                { loading ? (
                    <Spin indicator={loadingIcon} />
                ) : success ? (
                    <div style={{ background: '#FFF', padding: '16px' }}>
                        <Result
                            status="success"
                            title="Хүсэлтийг хүлээж авлаа."
                            subTitle="Бид таны мэдээллийг шалгаж үзээд бүртгэлийг тань идэвхижүүлэх тул та хэсэг хугацааны дараа нэвтрэнэ үү."
                            extra={[
                                <Button href="/" type="primary">
                                    Нүүр хуудас руу буцах
                                </Button>
                            ]}
                        />
                    </div>
                ) : error ? (
                    <div style={{ background: '#FFF', padding: '16px' }}>
                        <Result
                            status="500"
                            title={error.message.includes("400") ? "Утасны дугаар бүртгэлтэй байна." : "Бүртгэл амжилтгүй боллоо."}
                            subTitle={error.message.includes("400") ? "Та манай 1132-2817 дугаар руу холбогдож тодруулна уу." : "Та хуудсаа refresh хийж дахин оролдоно уу."}
                            extra={[
                                <Button type="primary" onClick={() => window.location.reload(false)}>
                                    Refresh хийх
                                </Button>
                            ]}
                        />
                    </div>
                ) : (
                    <div style={{ width: '500px', background: '#fff', padding: '24px' }}>            
                        <Typography.Title level={3} style={{ textAlign: 'center' }}>
                            Бүртгүүлэх
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
                                tooltip="Утасны дугаар нь цаашид таны нэвтрэх нэр байх тул байгууллагын албан ёсны дугаарыг оруулна уу."
                                rules={[{ required: true, message: 'Утасны дугаар оруулна уу!' }]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="И-Мэйл хаяг"                                
                                rules={[{ required: true, message: 'И-Мэйл хаяг оруулна уу!' }, { type: 'email', message: 'И-Мэйл хаяг буруу байна!' }]}
                            >
                                <Input />
                            </Form.Item>       
                            <Form.Item
                                name="company_name"
                                label="Байгууллагын нэр"                                
                                rules={[{ required: true, message: 'Байгууллагын нэр оруулна уу!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="company_id"
                                label="Байгууллагын регистр"                                
                                rules={[{ required: true, message: 'Байгууллагын регистр оруулна уу!' }]}
                            >
                                <Input />
                            </Form.Item>                            
                            <Form.Item
                                name="address"
                                label="Хаяг"                                
                                rules={[{ required: true, message: 'Хаяг оруулна уу!' }]}
                            >
                                <Input.TextArea rows={4} />
                            </Form.Item>                                                 
                            <Form.Item                                
                                name="password"
                                label="Нууц үг"
                                rules={[
                                {
                                    required: true,
                                    message: 'Нууц үг оруулна уу!',
                                },
                                {
                                    validator: validatePassword
                                },
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label="Нууц үг давтах"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                {
                                    required: true,
                                    message: 'Нууц үгээ давтан оруулна уу!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Нууц үгүүд хоорондоо таарахгүй байна!'));
                                    },
                                }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Button block type="primary" htmlType="submit" onClick={form.submit}>Бүртгүүлэх</Button>
                        </Form>
                    </div>
                )}  
            </div>   
        </div>                 
    );
};

const mapStateToProps = (state) => {
    return {      
        token: state.token
    }
}

export default connect(mapStateToProps)(Registration);