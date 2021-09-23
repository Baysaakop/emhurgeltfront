import { LockOutlined } from "@ant-design/icons";
import { Typography, Form, Input, Button, message, Spin } from "antd"
import axios from "axios";
import api from "../api";

function StaffSignUp (props) {

    const [form] = Form.useForm()

    function onFinish (values) {
        console.log(values)
        if (values.password !== values.confirm) {
            message.error("Нууц үгүүд хоорондоо таарахгүй байна.")
        } else {
            // props.onRegister(values.username, values.password, values.confirm)
            axios({
                method: 'POST',
                url: api.staffsignup,
                data: {
                    username: values.username,            
                    password1: values.password,
                    password2: values.confirm
                }
            })
            .then(res => {                
                const token = res.data.key;            
                axios({
                    method: 'GET',
                    url: api.profile,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                }).then(result => {                       
                    console.log(result.data)
                    const user = result.data
                    axios({
                        method: 'PUT',
                        url: `${api.profiles}/${user.profile.id}/`,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${token}`                               
                        },
                        data: {
                            role: '2'
                        }
                    })            
                    .then(res => {
                        if (res.status === 200) {
                            message.info(`${values.username} ажилтаныг бүртгэлээ.`);
                            form.resetFields()
                        }                                                         
                    })
                    .catch(err => {                      
                        console.log(err.message)         
                        message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
                    })  
                }).catch(err => {
                    console.log(err.message) 
                    message.error("Алдаа гарлаа. Дахин оролдоно уу.") 
                })                
            })
            .catch(err => {
                console.log(err.message)
                message.error("Алдаа гарлаа. Дахин оролдоно уу.") 
            })
        }
    }

    return (
        <div>
            <Typography.Title level={4}>Ажилтан бүртгэх</Typography.Title>
            <div style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {props.loading ? (
                    <Spin tip="Уншиж байна..." />
                ) : (
                    <Form form={form} layout="vertical" onFinish={onFinish} style={{ width: '400px', padding: '24px', border: '1px solid #8e8e8e' }}>
                        <Form.Item 
                            name="username" 
                            label="Ажилтаны код" 
                            rules={[
                                {
                                    required: true,
                                    message: 'Ажилтаны кодыг заавал оруулна уу!',
                                },
                            ]}
                        >
                            <Input placeholder="Ажилтаны код" />
                        </Form.Item>
                        <Form.Item
                            name="password"                                
                            label="Нууц үг" 
                            rules={[
                                {
                                    required: true,
                                    message: 'Нууц үг заавал оруулна уу!',
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
                                    message: 'Нууц үг давтана уу!',
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined style={{ color: '#a1a1a1' }} />} placeholder="Нууц үг давтах" />
                        </Form.Item>
                        <Button block type="primary" onClick={form.submit}>Бүртгэх</Button>
                    </Form>
                )}
            </div>
        </div>
    )
}

export default StaffSignUp;