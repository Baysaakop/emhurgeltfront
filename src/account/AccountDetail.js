import React, { useEffect, useState } from 'react';
import { Form, Input, Popconfirm, Button, message, Row, Col, DatePicker, Typography, Divider, Modal } from 'antd';
import { UserOutlined, MobileOutlined, MailOutlined, CheckOutlined, EnvironmentOutlined } from '@ant-design/icons';
import axios from 'axios';
import api from '../api';
import moment from 'moment';
import AddressForm from '../components/AddressForm';

function AccountDetail (props) {
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false)
    
    useEffect(() => {
        form.setFieldsValue({
            email: props.user.email,
            username: props.user.username,
            first_name: props.user.first_name,
            last_name: props.user.last_name,
            phone_number: props.user.profile.phone_number,
            birth_date: props.user.profile.birth_date ? moment(props.user.profile.birth_date, "YYYY-MM-DD") : undefined,
            address: props.user.profile.address
        })
    }, [props.user]) // eslint-disable-line react-hooks/exhaustive-deps
    
    function onFinish (values) {                          
        var formData = new FormData();
        if (values.username !== props.user.username) {
            formData.append('username', values.username)
        } 
        if (values.last_name !== props.user.last_name) {
            formData.append('last_name', values.last_name);        
        }               
        if (values.first_name !== props.user.first_name) {
            formData.append('first_name', values.first_name);        
        }        
        if (values.phone_number !== props.user.profile.phone_number) { 
            formData.append('phone_number', values.phone_number);        
        }        
        if (moment(values.birth_date).format("YYYY-MM-DD") !== moment(props.user.profile.birth_date).format("YYYY-MM-DD")) {            
            formData.append('birth_date', moment(values.birth_date).format("YYYY-MM-DD"));        
        }        
        if (values.address !== props.user.profile.address) {
            formData.append('address', values.address)
        }       
        axios({
            method: 'PUT',
            url: `${api.profiles}/${props.user.profile.id}/`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${props.token}`                               
            },
            data: formData
        })            
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                message.info("Хадгаллаа.")   
            }                                                         
        })
        .catch(err => {                      
            console.log(err.message)         
            message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
        })          
    }

    function changeAddress (address) {                
        form.setFieldsValue({
            address: address
        })
        setVisible(false)
    }

    return (
        <div>            
            <Form layout="vertical" form={form} onFinish={onFinish} style={{ background: '#fff', borderRadius: '2px', padding: '24px' }}>
                <Typography.Title level={4}>Хувийн мэдээлэл шинэчлэх</Typography.Title>
                <Divider />
                <Row gutter={[16, 0]}>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item name="email" label="И-мэйл:">
                            <Input disabled prefix={<MailOutlined style={{ color: '#a1a1a1' }} />} defaultValue={props.user.email} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item name="username" label="Хэрэглэгчийн нэр:">
                            <Input prefix={<UserOutlined style={{ color: '#a1a1a1' }} />} />
                        </Form.Item>   
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item name="phone_number" label="Утасны дугаар:">
                            <Input prefix={<MobileOutlined style={{ color: '#a1a1a1' }} />} />
                        </Form.Item> 
                    </Col>
                </Row>           
                <Row gutter={[16, 0]}>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item name="last_name" label="Овог:">
                            <Input prefix={<UserOutlined style={{ color: '#a1a1a1' }} />} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item name="first_name" label="Нэр:">
                            <Input prefix={<UserOutlined style={{ color: '#a1a1a1' }} />} />
                        </Form.Item>  
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item name="birth_date" label="Төрсөн өдөр:">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item> 
                    </Col>             
                    <Col xs={24} sm={24} md={16} lg={18} xl={20}>
                        <Form.Item name="address" label="Хаяг:">         
                            <Input 
                                disabled
                                prefix={<EnvironmentOutlined style={{ color: '#a1a1a1' }} />}                                 
                                style={{ width: '100%' }}
                            />    
                        </Form.Item> 
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={6} xl={4}>
                        <Button type="primary" style={{ width: '100%', marginTop:'30px' }} onClick={() => setVisible(true)}>Хаяг сонгох</Button>
                    </Col>                                     
                </Row>              
                <Modal
                    title="Хаяг оруулах"
                    visible={visible}
                    footer={false}                                        
                    onCancel={() => setVisible(false)}
                >
                    <AddressForm token={props.token} user={props.user} changeAddress={changeAddress} />
                </Modal>                                              
                <Form.Item>                                                                  
                    <Popconfirm title="Хадгалах уу？" okText="Тийм" cancelText="Үгүй" onConfirm={form.submit}>
                        <Button type="primary" icon={<CheckOutlined />} >
                            Хадгалах
                        </Button>
                    </Popconfirm>                                                                                                            
                </Form.Item>         
            </Form>                   
        </div>
    )
};

export default AccountDetail;