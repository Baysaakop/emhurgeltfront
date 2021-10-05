import { WarningOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification, Typography } from "antd";
import axios from "axios";
import api from "../api";

function TypeAdd (props) {

    const [form] = Form.useForm()

    function onFinish (values) {
        axios({
            method: 'POST',
            url: `${api.types}/`,
            data: {
                name: values.name,
                name_en: values.name_en ? values.name_en: '',
                description: values.description ? values.description: '',
                token: props.token
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {
            if (res.status === 201) {
                notification['success']({
                    message: 'Амжилттай',
                    description: `${values.name} төрөл амжилттай нэмэгдлээ.`
                })
                form.resetFields()
            }
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${values.name} төрөл нэмэгдсэнгүй. Дахин оролдоно уу.`
            })
        })
    }

    return (
        <div>
            <Typography.Title level={5}>Төрөл нэмэх</Typography.Title>
            <Typography.Text type="warning"><WarningOutlined /> Төрөл нэмэхийн өмнө тухайн төрөл бүртгэгдсэн эсэхийг сайтар шалгана уу!</Typography.Text>
            <Form 
                form={form} 
                layout="vertical" 
                onFinish={onFinish}
                style={{ marginTop: '16px', border: '1px solid #dedede', padding: '16px', width: '100%' }}
            >
                <Form.Item name="name" label="Нэр"  rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="name_en" label="Нэр (EN)">
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Тайлбар">
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Button type="primary" onClick={form.submit}>Хадгалах</Button>
            </Form>
        </div>
    )
}

export default TypeAdd