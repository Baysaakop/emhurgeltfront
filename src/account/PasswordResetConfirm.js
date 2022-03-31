import { LoadingOutlined } from "@ant-design/icons";
import { Result, Spin, Form, Button, Input, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import api from "../api";

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function PasswordResetConfirm (props) {    
    const [form] = Form.useForm()
    const [loading, setLoading] = useState()
    const [success, setSuccess] = useState()
    const [error, setError] = useState()

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

    const onFinish = (values) => {                
        setLoading(true) 
        axios.post(api.password_reset_confirm, {
            uid: props.match.params.uid,
            token: props.match.params.token,
            new_password1: values.password,
            new_password2: values.confirm,
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

    return (
        <div style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
            { loading ? (
                <Spin indicator={loadingIcon} />
            ) : success ? (
                <div style={{ background: '#FFF', padding: '16px' }}>
                    <Result
                        status="success"
                        title={`Таны нууц үг амжилттай солигдлоо.`}      
                        subTitle={`Шинэ нууц үгээ ашиглан нэвтэрнэ үү.`}
                        extra={[
                            <Button href="/login" type="primary">
                                Нэвтрэх
                            </Button>
                        ]}                 
                    />
                </div>
            ) : error ? (
                <div style={{ background: '#FFF', padding: '16px' }}>
                    <Result
                        status="500"
                        title={`Нууц үг солих явцад алдаа гарлаа.`}
                        subTitle="Та хуудсаа refresh хийж дахин оролдоно уу."
                        extra={
                            <Button type="primary" onClick={() => window.location.reload(false)}>
                                Refresh хийх
                            </Button>
                        }
                    />
                </div>
            ) : (
                <div style={{ background: '#FFF', padding: '16px', width: '600px' }}>
                    <Typography.Title level={4}>Шинэ нууц үг оруулах</Typography.Title>                    
                    <Form
                        form={form}
                        layout="vertical"
                        name="password-reset"
                        style={{ marginTop: '16px' }}
                        onFinish={onFinish}
                    >
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
                        <Button type="primary" htmlType="submit" style={{ marginTop: '8px' }}>Хадгалах</Button>
                    </Form>
                </div>
            )}
        </div>
    )
}

export default PasswordResetConfirm