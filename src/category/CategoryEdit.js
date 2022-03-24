import { Button, Form, Input, message, notification, Popconfirm, Select, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api";

function CategoryEdit (props) {

    const [form] = Form.useForm()
    const [categories, setCategories] = useState([])
    const [selection, setSelection] = useState()

    useEffect(() => {
        getCategories()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getCategories () {
        axios({
            method: 'GET',
            url: `${api.categories}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }        
        }).then(res => {
            setCategories(res.data.results)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }        

    function onSelectCategory (id) {
        let hit = categories.find(x => x.id.toString() === id)
        form.setFieldsValue({
            name: hit.name,
            name_en: hit.name_en,
        })
        setSelection(hit)
    }

    function onFinish (values) {        
        console.log(values)
        axios({
            method: 'PUT',
            url: `${api.categories}/${selection.id}/`,        
            data: {
                name: values.name,
                name_en: values.name_en ? values.name_en: ''
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {
            if (res.status === 200) {
                notification['success']({
                    message: 'Амжилттай',
                    description: `${selection.name} ангилал амжилттай засагдлаа.`
                })
                form.resetFields()    
                getCategories()    
                setSelection(undefined)
            }
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${selection.name} ангилал засагдсангүй. Дахин оролдоно уу.`
            })
        })
    }

    function onDelete () {
        axios({
            method: 'DELETE',
            url: `${api.categories}/${selection.id}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {
            console.log(res)
            if (res.status === 200 || res.status === 204) {
                notification['info']({
                    message: 'Амжилттай',
                    description: `${selection.name} ангилал амжилттай устлаа.`
                })
            }
            form.resetFields()
            getCategories()
            setSelection(undefined)
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${selection.name} ангилал устсангүй. Дахин оролдоно уу.`
            })
        })
    }

    return (
        <div>
            <Typography.Title level={5}>Ангилал засах / устгах</Typography.Title>            
            <Select                                
                placeholder="Ангилал сонгох"
                optionFilterProp="children"
                onSelect={onSelectCategory}
                style={{ width: '100%' }}
            >
                { categories ? categories.map(c => (
                    <Select.Option key={c.id}>{c.name}</Select.Option>
                )) : <></>}
            </Select>                  
            { selection ? (
                <Form 
                    form={form} 
                    layout="vertical" 
                    onFinish={onFinish}                    
                    style={{ marginTop: '16px', border: '1px solid #dedede', padding: '16px', width: '100%' }}
                >
                    <Form.Item name="name" label="Нэр" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="name_en" label="Нэр (EN)">
                        <Input />
                    </Form.Item>                    
                    <Button htmlType="submit" type="primary" style={{ marginRight: '8px' }}>Хадгалах</Button>
                    <Popconfirm title="Устгах уу?" onConfirm={onDelete} okText="Тийм" cancelText="Үгүй">
                        <Button danger type="text">Устгах</Button>
                    </Popconfirm>
                </Form>
            ) : (<></>)}                              
        </div>
    )
}

export default CategoryEdit