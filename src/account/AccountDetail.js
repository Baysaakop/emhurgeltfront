import React, { useEffect } from 'react';
import { Form, Input, Popconfirm, Button, message, Row, Col, Typography, Divider } from 'antd';
import { UserOutlined, MobileOutlined, MailOutlined, CheckOutlined, EnvironmentOutlined } from '@ant-design/icons';
import axios from 'axios';
import api from '../api';

function AccountDetail (props) {
    const [form] = Form.useForm()
    
    useEffect(() => {
        form.setFieldsValue({            
            username: props.user.username,
            company_name: props.user.company_name,
            company_id: props.user.company_id,
            email: props.user.email,
            address: props.user.address
        })
    }, [props.user]) // eslint-disable-line react-hooks/exhaustive-deps
    
    function onFinish (values) {            
        console.log(values)              
        var formData = new FormData();
        if (values.company_name !== props.user.company_name) {
            formData.append('company_name', values.company_name);        
        }    
        if (values.email !== props.user.email) {
            formData.append('email', values.email);        
        }                     
        if (values.address !== props.user.address) {
            formData.append('address', values.address)
        }       
        axios({
            method: 'PUT',
            url: `${api.users}/${props.user.id}/`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${props.token}`                               
            },
            data: formData
        })            
        .then(res => {            
            if (res.status === 200) {
                message.info("Амжилттай хадгаллаа.")   
            }                                                         
        })
        .catch(err => {                      
            console.log(err.message)         
            message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
        })          
    }

    return (
        <div>            
            <Form layout="vertical" form={form} onFinish={onFinish} style={{ background: '#fff', borderRadius: '2px', padding: '24px' }}>
                <Typography.Title level={4}>Хувийн мэдээлэл шинэчлэх</Typography.Title>
                <Divider />
                <Row gutter={[16, 0]}>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item name="username" label="Утасны дугаар:">
                            <Input prefix={<MobileOutlined style={{ color: '#a1a1a1' }} />} disabled />
                        </Form.Item>   
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item name="company_id" label="Компанийн РД:">
                            <Input prefix={<UserOutlined style={{ color: '#a1a1a1' }} />} disabled />
                        </Form.Item>
                    </Col>  
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item name="company_name" label="Компанийн нэр:">
                            <Input prefix={<UserOutlined style={{ color: '#a1a1a1' }} />} />
                        </Form.Item>
                    </Col>             
                         
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item
                            name="email"
                            label="И-Мэйл хаяг"                                
                            rules={[{ type: 'email', message: 'И-Мэйл хаяг буруу байна!' }]}
                        >
                            <Input prefix={<MailOutlined style={{ color: '#a1a1a1' }} />} />
                        </Form.Item>             
                    </Col>
                    <Col xs={24} sm={24} md={16}>
                        <Form.Item name="address" label="Хаяг:">
                            <Input prefix={<EnvironmentOutlined style={{ color: '#a1a1a1' }} />} />
                        </Form.Item>
                    </Col>                                 
                </Row>                                                                        
                <Popconfirm title="Хадгалах уу？" okText="Тийм" cancelText="Үгүй" onConfirm={form.submit}>
                    <Button type="primary" icon={<CheckOutlined />} >
                        Хадгалах
                    </Button>
                </Popconfirm>         
            </Form>                   
        </div>
    )
};

export default AccountDetail;