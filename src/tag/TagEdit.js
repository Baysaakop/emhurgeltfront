import { Button, Form, Input, message, notification, Popconfirm, Select, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api";

function TagEdit (props) {

    const [form] = Form.useForm()
    const [tags, setTags] = useState([])
    const [selection, setSelection] = useState()

    useEffect(() => {
        getTags()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getTags () {
        axios({
            method: 'GET',
            url: `${api.tags}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }        
        }).then(res => {
            setTags(res.data.results)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }

    function onSelect (id) {
        let hit = tags.find(x => x.id.toString() === id)
        form.setFieldsValue({
            name: hit.name,
            name_en: hit.name_en,
            description: hit.description
        })
        setSelection(hit)
    }

    function onFinish (values) {        
        axios({
            method: 'PUT',
            url: `${api.tags}/${selection.id}/`,
            data: {
                name: values.name ? values.name : selection.name,
                name_en: values.name_en ? values.name_en : selection.name_en,
                description: values.description ? values.description : selection.description,
                token: props.token
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {
            if (res.status === 200) {
                notification['success']({
                    message: 'Амжилттай',
                    description: `${selection.name} таг амжилттай засагдлаа.`
                })
                getTags()
            }
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${selection.name} таг засагдсангүй. Дахин оролдоно уу.`
            })
        })
    }

    function onDelete () {
        axios({
            method: 'DELETE',
            url: `${api.tags}/${selection.id}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {
            console.log(res)
            if (res.status === 200 || res.status === 204) {
                notification['info']({
                    message: 'Амжилттай',
                    description: `${selection.name} таг амжилттай устлаа.`
                })
            }
            form.resetFields()
            getTags()
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${selection.name} таг устсангүй. Дахин оролдоно уу.`
            })
        })
    }

    return (
        <div>
            <Typography.Title level={5}>Таг засах / устгах</Typography.Title>
            <Select                                
                placeholder="Таг сонгох"
                optionFilterProp="children"
                onSelect={onSelect}
                style={{ width: '500px' }}
            >
                { tags ? tags.map(tag => (
                    <Select.Option key={tag.id}>{tag.name}</Select.Option>
                )) : <></>}
            </Select>                  
            { selection ? (
                <Form 
                    form={form} 
                    layout="vertical" 
                    onFinish={onFinish}                    
                    style={{ marginTop: '16px', border: '1px solid #dedede', padding: '16px', width: '500px' }}
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
                    <Popconfirm title="Хадгалах уу?" onConfirm={form.submit} okText="Тийм" cancelText="Үгүй">
                        <Button type="primary" style={{ marginRight: '8px' }}>Хадгалах</Button>
                    </Popconfirm>
                    <Popconfirm title="Устгах уу?" onConfirm={onDelete} okText="Тийм" cancelText="Үгүй">
                        <Button danger type="primary">Устгах</Button>
                    </Popconfirm>
                </Form>
            ) : (<></>)}                              
        </div>
    )
}

export default TagEdit