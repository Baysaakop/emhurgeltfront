import { useState } from "react"
import { LockOutlined, LoadingOutlined } from "@ant-design/icons"
import { Typography, Form, Input, Button, Result, Spin } from "antd"
import axios from "axios"
import api from "../api"

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function StaffSignUp (props) {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    function onFinish (values) {
        setLoading(true) 
        axios.post(api.signup, {
            username: values.username,                                                                             
            password1: values.password,
            password2: values.confirm,
            role: 2
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
        <div>
            <Typography.Title level={4}>Ажилтан бүртгэх</Typography.Title>
            <div style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            { loading ? (
                    <Spin indicator={loadingIcon} />
                ) : success ? (
                    <div style={{ background: '#FFF', padding: '16px' }}>
                        <Result
                            status="success"
                            title="Ажилтан бүртгэгдлээ."
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
                            title={error.message.includes("400") ? "Нэвтрэх нэр бүртгэлтэй байна." : "Бүртгэл амжилтгүй боллоо."}                            
                            extra={[
                                <Button href="/" type="primary">
                                    Нүүр хуудас руу буцах
                                </Button>
                            ]}
                        />
                    </div>
                ) : (
                    <Form form={form} layout="vertical" onFinish={onFinish} style={{ width: '400px', padding: '24px', border: '1px solid #8e8e8e' }}>
                        <Form.Item 
                            name="username" 
                            label="Ажилтаны нэвтрэх нэр (код)" 
                            rules={[
                                {
                                    required: true,
                                    message: 'Ажилтаны нэвтрэх нэр оруулна уу!',
                                },
                            ]}
                        >
                            <Input placeholder="Ажилтаны нэвтрэх нэр" />
                        </Form.Item>
                        <Form.Item 
                            name="name" 
                            label="Ажилтаны нэр" 
                            rules={[
                                {
                                    required: true,
                                    message: 'Ажилтаны нэр оруулна уу!',
                                },
                            ]}
                        >
                            <Input placeholder="А.Бат-Эрдэнэ" />
                        </Form.Item>
                        <Form.Item
                            name="password"                                
                            label="Нууц үг" 
                            rules={[
                                {
                                    required: true,
                                    message: 'Нууц үг оруулна уу!',
                                },
                            ]}                        
                        >
                            <Input.Password prefix={<LockOutlined style={{ color: '#a1a1a1' }} />} placeholder="Нууц үг" />
                        </Form.Item>
                        <Form.Item
                            name="confirm"          
                            label="Нууц үг давтах"                       
                            dependencies={['password']}                        
                            rules={[
                                {
                                    required: true,
                                    message: 'Нууц үг давтаж оруулна уу!',
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined style={{ color: '#a1a1a1' }} />} placeholder="Нууц үг давтах" />
                        </Form.Item>
                        <Button block type="primary" htmlType="submit" onClick={form.submit}>Бүртгэх</Button>
                    </Form>
                )}
            </div>
        </div>
    )
}

export default StaffSignUp;