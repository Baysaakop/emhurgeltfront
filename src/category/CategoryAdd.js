import { WarningOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification, Typography } from "antd";
import axios from "axios";
import api from "../api";

function CategoryAdd (props) {

    const [form] = Form.useForm()

    function onFinish (values) {
        axios({
            method: 'POST',
            url: `${api.categories}/`,
            data: {
                name: values.name,
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
            <Typography.Title level={4}>Төрөл нэмэх</Typography.Title>
            <Typography.Text type="warning"><WarningOutlined /> Төрөл нэмэхийн өмнө тухайн төрөл өмнө бүртгэгдсэн эсэхийг шалгана уу!</Typography.Text>
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
                <Button type="primary" onClick={form.submit}>Хадгалах</Button>
            </Form>
        </div>
    )
}

export default CategoryAdd