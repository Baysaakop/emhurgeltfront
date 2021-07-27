import { Button, Col, Form, Input, notification, Popconfirm, Row, Select, Typography, message } from "antd";
import ImageUpload from '../components/ImageUpload'
import axios from "axios";
import api from "../api";
import { useState, useEffect } from "react";

function ProductEdit (props) {

    const [form] = Form.useForm()
    const [image, setImage] = useState()
    const [items, setItems] = useState([])
    const [categories, setCategories] = useState([])
    const [companies, setCompanies] = useState([])
    const [tags, setTags] = useState([])
    const [selection, setSelection] = useState()

    useEffect(() => {
        getCategories()
        getCompanies()
        getTags()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function onSearch (val) {        
        axios({
            method: 'GET',
            url: `${api.items}?name=${val}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }        
        }).then(res => {
            setItems(res.data.results)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }

    function onSelect (id) {
        let hit = items.find(x => x.id.toString() === id)
        console.log(hit)
        form.setFieldsValue({
            name: hit.name,            
            description: hit.description !== null ? hit.description : '',
            ingredients: hit.ingredients !== null ? hit.ingredients : '',
            usage: hit.usage !== null ? hit.usage : '',
            caution: hit.caution !== null ? hit.caution : '',
            price: hit.price !== null ? hit.price : '',
            company: hit.company !== null ? hit.company.id.toString() : undefined,
            category: hit.category !== null ? getIDs(hit.category) : undefined,
            tag: hit.tag !== null ? getIDs(hit.tag) : undefined,
        })
        setImage(hit.image !== null ? hit.image : undefined)
        setSelection(hit)
    }

    function getIDs (arr) {
        let res = []
        arr.forEach(x => {
            res.push(x.id.toString())
        })
        return res
    }

    function getCategories () {
        axios({
            method: 'GET',
            url: `${api.categories}/`,
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
    function getCompanies () {
        axios({
            method: 'GET',
            url: `${api.companies}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }        
        }).then(res => {
            setCompanies(res.data.results)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }   

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

    function onFinish (values) {
        console.log(values)
        var formData = new FormData();
        if (values.name && values.name !== selection.name) {
            formData.append('name', values.name);
        }
        if (values.description && values.description !== selection.description) {
            formData.append('description', values.description);
        }               
        if (values.ingredients && values.ingredients !== selection.ingredients) {
            formData.append('ingredients', values.ingredients);
        }
        if (values.usage && values.usage !== selection.usage) {
            formData.append('usage', values.usage);
        }
        if (values.caution && values.caution !== selection.caution) {
            formData.append('caution', values.caution);
        }
        if (values.price && values.price !== selection.price) {
            formData.append('price', values.price);
        }
        if (values.company && values.company !== selection.company.id.toString()) {
            formData.append('company', values.company);
        }
        if (values.category && values.category !== getIDs(selection.category)) {
            formData.append('category', values.category);
        }
        if (values.tag && values.tag !== getIDs(selection.tag)) {
            formData.append('tag', values.tag);
        }
        if (image && image !== selection.image) {
            formData.append('image', image)
        }      
        formData.append('token', props.token)
        axios({
            method: 'PUT',
            url: `${api.items}/${selection.id}/`,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {
            if (res.status === 200) {
                notification['success']({
                    message: 'Амжилттай',
                    description: `${selection.name} бүтээгдэхүүн амжилттай засагдлаа.`
                })
                setSelection(undefined)
            }
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${selection.name} бүтээгдэхүүн засагдсангүй. Дахин оролдоно уу.`
            })
        })
    }

    function onDelete () {
        axios({
            method: 'DELETE',
            url: `${api.items}/${selection.id}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {
            console.log(res)
            if (res.status === 200 || res.status === 204) {
                notification['info']({
                    message: 'Амжилттай',
                    description: `${selection.name} бүтээгдэхүүн амжилттай устлаа.`
                })
            }
            form.resetFields()
            setSelection(undefined)
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${selection.name} бүтээгдэхүүн устсангүй. Дахин оролдоно уу.`
            })
        })
    }

    const onImageSelected = (path) => {
        setImage(path);
    } 

    return (
        <div>
            <Typography.Title level={4}>Бүтээгдэхүүн засах / устгах</Typography.Title>            
            <Select                              
                showSearch
                onSearch={onSearch}  
                placeholder="Бүтээгдэхүүн сонгох"
                optionFilterProp="children"
                onSelect={onSelect}        
                style={{ width: '100%' }}        
            >
                { items ? items.map(item => (
                    <Select.Option key={item.id}>{item.name}</Select.Option>
                )) : <></> }
            </Select>   
            <Form 
                form={form} 
                layout="vertical" 
                onFinish={onFinish}
                style={{ marginTop: '16px', border: '1px solid #dedede', padding: '16px' }}
            >
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item name="name" label="Нэр"  rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="code" label="Код"  rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="description" label="Тайлбар">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="ingredients" label="Найрлага">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="usage" label="Хэрэглэх заавар">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="caution" label="Анхааруулга">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="price" label="Үнэ">
                            <Input suffix="₮" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="company" label="Компани">
                            <Select                                
                                placeholder="Компани сонгох"
                                optionFilterProp="children"
                            >
                                { companies ? companies.map(com => (
                                    <Select.Option key={com.id}>{com.name}</Select.Option>
                                )) : <></> }
                            </Select>          
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="category" label="Төрөл">
                            <Select          
                                mode="multiple"                      
                                placeholder="Төрөл сонгох"
                                optionFilterProp="children"                                
                            >
                                { categories ? categories.map(cat => (
                                    <Select.Option key={cat.id}>{cat.name}</Select.Option>
                                )) : <></>}
                            </Select>           
                        </Form.Item>
                    </Col>                    
                    <Col span={6}>
                        <Form.Item name="tag" label="Таг">
                            <Select                      
                                mode="multiple"          
                                placeholder="Таг сонгох"
                                optionFilterProp="children"                
                            >
                                { tags ? tags.map(tag => (
                                    <Select.Option key={tag.id}>{tag.name}</Select.Option>
                                )) : <></>}
                            </Select>     
                        </Form.Item>        
                    </Col>
                </Row>               
                <Form.Item name="image" label="Зураг">
                    <ImageUpload image={image} onImageSelected={onImageSelected} height="200px" width="200px" />     
                </Form.Item>
                <Popconfirm title="Хадгалах уу?" onConfirm={form.submit} okText="Тийм" cancelText="Үгүй">
                    <Button type="primary" style={{ marginRight: '8px' }}>Хадгалах</Button>
                </Popconfirm>           
                <Popconfirm title="Устгах уу?" onConfirm={onDelete} okText="Тийм" cancelText="Үгүй">
                    <Button danger type="primary">Устгах</Button>
                </Popconfirm>     
            </Form>
        </div>
    )
}

export default ProductEdit