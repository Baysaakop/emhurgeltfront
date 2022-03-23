import { Button, Form, Input, notification, Popconfirm, Typography } from "antd";
import axios from "axios";
import api from "../api";

function VideoAdd (props) {

    const [form] = Form.useForm()

    function onFinish (values) {
        axios({
            method: 'POST',
            url: `${api.videos}/`,
            data: values,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {   
            if (res.status === 201) {                
                notification['success']({
                    message: 'Амжилттай',
                    description: `Видео амжилттай нэмэгдлээ.`
                })               
                form.resetFields()                       
            }
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `Видео нэмэгдсэнгүй. Дахин оролдоно уу.`
            })
        })
    }

    return (
        <div>
            <Typography.Title level={4}>Видео нэмэх</Typography.Title>            
            <Form 
                form={form} 
                layout="vertical" 
                onFinish={onFinish}
                style={{ marginTop: '16px', border: '1px solid #dedede', padding: '16px', width: '600px' }}
            >
                <Form.Item name="name" label="Нэр" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="video_url" label="Видео (Embed)" rules={[{ required: true }]}>
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Popconfirm title="Хадгалах уу?" onConfirm={form.submit} okText="Тийм" cancelText="Үгүй">
                    <Button type="primary" style={{ marginRight: '8px' }}>Хадгалах</Button>
                </Popconfirm>                
            </Form>
        </div>
    )
}

export default VideoAdd