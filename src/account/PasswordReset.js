import { LoadingOutlined } from "@ant-design/icons";
import { Result, Spin, Form, Button, Input, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import api from "../api";

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function PasswordReset (props) {    
    const [form] = Form.useForm()
    const [loading, setLoading] = useState()
    const [sent, setSent] = useState()
    const [error, setError] = useState()
    const [email, setEmail] = useState()

    function onChange (e) {
        setEmail(e.target.value)
    }

    const onFinish = (values) => {                
        setLoading(true) 
        axios.post(api.password_reset, {
            email: values.email
        })
        .then(res => {            
            setSent(true)
            setError(undefined)
            setLoading(false) 
        })
        .catch(err => {            
            setError(err)
            setSent(false)
            setLoading(false)             
        })
    }

    return (
        <div style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
            { loading ? (
                <Spin indicator={loadingIcon} />
            ) : sent ? (
                <div style={{ background: '#FFF', padding: '16px' }}>
                    <Result
                        status="success"
                        title={`Таны ${email} хаяг руу нууц үг сэргээх зурвас илгээлээ.`}                         
                    />
                </div>
            ) : error ? (
                <div style={{ background: '#FFF', padding: '16px' }}>
                    <Result
                        status="500"
                        title={`Нууц үг сэргээх явцад алдаа гарлаа.`}
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
                    <Typography.Title level={4}>Нууц үг сэргээх</Typography.Title>
                    <Typography.Text>Хэрэв та нууц үгээ санахгүй байгаа бол өөрийн бүртгэлтэй и-мэйл хаягаа доор бичиж 'Илгээх' товчийг дарна уу. 'Илгээх' товчийг дарснаар таны и-мэйл хаягт нууц үг сэргээх зурвас илгээгдэх юм.</Typography.Text>
                    <Form
                        form={form}
                        layout="vertical"
                        name="password-reset"
                        style={{ marginTop: '16px' }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            label="И-Мэйл хаяг"                                
                            rules={[{ required: true, message: 'И-Мэйл хаяг оруулна уу!' }, { type: 'email', message: 'И-Мэйл хаяг буруу байна!' }]}
                        >
                            <Input onChange={onChange} />
                        </Form.Item>           
                        <Button type="primary" htmlType="submit" style={{ marginTop: '8px' }}>Илгээх</Button>
                    </Form>
                </div>
            )}
        </div>
    )
}

export default PasswordReset