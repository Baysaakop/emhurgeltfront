import { Button, Form, notification, Popconfirm, Typography, Divider } from "antd";
import ImageUpload from '../components/ImageUpload'
import axios from "axios";
import api from "../api";
import { useState } from "react";

function SliderAdd (props) {

    const [form] = Form.useForm()
    const [image, setImage] = useState()

    function onFinish (values) {
        if (image) {
            var formData = new FormData();
            formData.append('image', image)              
            axios({
                method: 'POST',
                url: `${api.sliders}/`,
                data: formData,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`            
                }
            }).then(res => {   
                if (res.status === 201) {                
                    notification['success']({
                        message: 'Амжилттай',
                        description: 'Slider амжилттай нэмэгдлээ.'
                    })               
                    form.resetFields()
                    setImage(undefined)                
                }
            }).catch(err => {
                notification['error']({
                    message: 'Амжилтгүй',
                    description: 'Slider нэмэгдсэнгүй. Дахин оролдоно уу.'
                })
            })
        }        
    }

    const onImageSelected = (path) => {
        setImage(path);
    } 

    return (
        <div>
            <Typography.Title level={4} style={{ margin: 0 }}>Slider нэмэх</Typography.Title>            
            <Divider style={{ margin: '12px 0' }} />
            <Form 
                form={form} 
                layout="vertical" 
                onFinish={onFinish}
                style={{ marginTop: '16px', border: '1px solid #dedede', padding: '16px' }}
            >                
                <Form.Item name="image" label="Slider">
                    <ImageUpload image={image} onImageSelected={onImageSelected} height="300px" width="900px" />     
                </Form.Item>
                <Popconfirm title="Хадгалах уу?" onConfirm={form.submit} okText="Тийм" cancelText="Үгүй">
                    <Button type="primary" style={{ marginRight: '8px' }}>Хадгалах</Button>
                </Popconfirm>                
            </Form>
        </div>
    )
}

export default SliderAdd