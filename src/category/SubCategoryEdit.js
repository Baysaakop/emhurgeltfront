import { Button, Form, Input, message, notification, Popconfirm, Select, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api";

function SubCategoryEdit (props) {

    const [form] = Form.useForm()
    const [types, setTypes] = useState([])
    const [type, setType] = useState()
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState()
    const [subCategories, setSubCategories] = useState([])
    const [selection, setSelection] = useState()

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

    function onSelectType (id) {
        let hit = types.find(x => x.id.toString() === id)
        setType(hit)
        getCategories(id)                
    }

    function getCategories (id) {
        axios({
            method: 'GET',
            url: `${api.categories}?type=${id}`,
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
        setCategory(hit)
        getSubCategories(id)      
    }

    function getSubCategories (id) {
        axios({
            method: 'GET',
            url: `${api.subcategories}?category=${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }        
        }).then(res => {
            setSubCategories(res.data.results)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    } 

    function onSelectSubCategory (id) {
        let hit = subCategories.find(x => x.id.toString() === id)
        form.setFieldsValue({
            category: hit.category.toString(),
            name: hit.name,
            name_en: hit.name_en,
            description: hit.description
        })
        setSelection(hit)
    }

    function onFinish (values) {        
        var formData = new FormData();
        formData.append('token', props.token)
        if (values.category && values.category.toString() !== selection.category.toString()) {
            formData.append('category', values.category)
        }
        if (values.name && values.name !== selection.name) {
            formData.append('name', values.name)
        }
        if (values.name_en && values.name_en !== selection.name_en) {
            formData.append('name_en', values.name_en)
        }
        if (values.description && values.description !== selection.description) {
            formData.append('description', values.description)
        }
        axios({
            method: 'PUT',
            url: `${api.subcategories}/${selection.id}/`,        
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {
            if (res.status === 200) {
                notification['success']({
                    message: 'Амжилттай',
                    description: `${selection.name} дэд ангилал амжилттай засагдлаа.`
                })
                form.resetFields()        
                getCategories(type.id)
                getSubCategories(category.id)
            }
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${selection.name} дэд ангилал засагдсангүй. Дахин оролдоно уу.`
            })
        })
    }

    function onDelete () {
        axios({
            method: 'DELETE',
            url: `${api.subcategories}/${selection.id}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {            
            if (res.status === 200 || res.status === 204) {
                notification['info']({
                    message: 'Амжилттай',
                    description: `${selection.name} дэд ангилал амжилттай устлаа.`
                })
            }
            form.resetFields()
            getCategories(type.id)
            getSubCategories(category.id)
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${selection.name} дэд ангилал устсангүй. Дахин оролдоно уу.`
            })
        })
    }

    return (
        <div>
            <Typography.Title level={5}>Дэд ангилал засах / устгах</Typography.Title>
            <Typography.Text style={{ display: 'block' }}>Төрөл сонгох</Typography.Text>
            <Select                                
                placeholder="Төрөл сонгох"
                optionFilterProp="children"
                onSelect={onSelectType}
                style={{ width: '100%' }}
            >
                { types ? types.map(t => (
                    <Select.Option key={t.id}>{t.name}</Select.Option>
                )) : <></>}
            </Select>                
            <Typography.Text style={{ display: 'block', marginTop: '16px' }}>Ангилал сонгох</Typography.Text>
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
            <Typography.Text style={{ display: 'block', marginTop: '16px' }}>Дэд ангилал сонгох</Typography.Text>     
            <Select                                
                placeholder="Дэд ангилал сонгох"
                optionFilterProp="children"
                onSelect={onSelectSubCategory}
                style={{ width: '100%' }}
            >
                { subCategories ? subCategories.map(s => (
                    <Select.Option key={s.id}>{s.name}</Select.Option>
                )) : <></>}
            </Select>                  
            { selection ? (
                <Form 
                    form={form} 
                    layout="vertical" 
                    onFinish={onFinish}                    
                    style={{ marginTop: '16px', border: '1px solid #dedede', padding: '16px', width: '100%' }}
                >
                    <Form.Item name="category" label="Ангилал" rules={[{ required: true }]}>
                        <Select                                
                            placeholder="Ангилал сонгох"
                            optionFilterProp="children"                        
                            style={{ width: '100%' }}
                        >
                            { categories ? categories.map(c => (
                                <Select.Option key={c.id}>{c.name}</Select.Option>
                            )) : <></>}
                        </Select>  
                    </Form.Item>
                    <Form.Item name="name" label="Нэр" rules={[{ required: true }]}>
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
                        <Button danger type="text">Устгах</Button>
                    </Popconfirm>
                </Form>
            ) : (<></>)}                              
        </div>
    )
}

export default SubCategoryEdit