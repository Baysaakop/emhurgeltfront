import { WarningOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification, Popconfirm, Typography } from "antd";
import ImageUpload from '../components/ImageUpload'
import axios from "axios";
import api from "../api";
import { useState } from "react";

function CompanyAdd (props) {

    const [form] = Form.useForm()
    const [image, setImage] = useState()

    function onFinish (values) {
        var formData = new FormData();
        formData.append('name', values.name);
        if (values.description) {
            formData.append('description', values.description);
        }
        if (image) {
            formData.append('image', image)
        }        
        formData.append('token', props.token)
        axios({
            method: 'POST',
            url: `${api.companies}/`,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {   
            if (res.status === 201) {                
                notification['success']({
                    message: 'Амжилттай',
                    description: `${values.name} компани амжилттай нэмэгдлээ.`
                })               
                form.resetFields()
                setImage(undefined)                
            }
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${values.name} компани нэмэгдсэнгүй. Дахин оролдоно уу.`
            })
        })
    }

    const onImageSelected = (path) => {
        setImage(path);
    } 

    return (
        <div>
            <Typography.Title level={4}>Компани нэмэх</Typography.Title>
            <Typography.Text type="warning"><WarningOutlined /> Компани нэмэхийн өмнө тухайн компани өмнө бүртгэгдсэн эсэхийг шалгана уу!</Typography.Text>
            <Form 
                form={form} 
                layout="vertical" 
                onFinish={onFinish}
                style={{ marginTop: '16px', border: '1px solid #dedede', padding: '16px', width: '500px' }}
            >
                <Form.Item name="name" label="Нэр"  rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Тайлбар">
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item name="image" label="Лого / зураг">
                    <ImageUpload image={image} onImageSelected={onImageSelected} height="200px" width="300px" />     
                </Form.Item>
                <Popconfirm title="Хадгалах уу?" onConfirm={form.submit} okText="Тийм" cancelText="Үгүй">
                    <Button type="primary" style={{ marginRight: '8px' }}>Хадгалах</Button>
                </Popconfirm>                
            </Form>
        </div>
    )
}

export default CompanyAdd