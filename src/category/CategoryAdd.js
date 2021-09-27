import { WarningOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, notification, Typography, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api";

function CategoryAdd (props) {

    const [form] = Form.useForm()
    const [types, setTypes] = useState([])

    useEffect(() => {
        getTypes()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getTypes () {
        axios({
            method: 'GET',
            url: `${api.types}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }        
        }).then(res => {
            setTypes(res.data.results)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }

    function onFinish (values) {        
        axios({
            method: 'POST',
            url: `${api.categories}/`,
            data: {
                type: values.type,
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
                    description: `${values.name} ангилал амжилттай нэмэгдлээ.`
                })
                form.resetFields()
            }
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${values.name} ангилал нэмэгдсэнгүй. Дахин оролдоно уу.`
            })
        })
    }

    return (
        <div>
            <Typography.Title level={5}>Ангилал нэмэх</Typography.Title>
            <Typography.Text type="warning"><WarningOutlined /> Ангилал нэмэхийн өмнө тухайн ангилал бүртгэгдсэн эсэхийг шалгана уу!</Typography.Text>
            <Form 
                form={form} 
                layout="vertical" 
                onFinish={onFinish}
                style={{ marginTop: '16px', border: '1px solid #dedede', padding: '16px', width: '100%' }}
            >
                <Form.Item name="type" label="Төрөл" rules={[{ required: true }]}>
                    <Select                                
                        placeholder="Төрөл сонгох"
                        optionFilterProp="children"                        
                        style={{ width: '100%' }}
                    >
                        { types ? types.map(t => (
                            <Select.Option key={t.id}>{t.name}</Select.Option>
                        )) : <></>}
                    </Select>  
                </Form.Item>
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

export default CategoryAdd