import { WarningOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, notification, Popconfirm, Row, Select, Typography, message, Space } from "antd";
import ImageUpload from '../components/ImageUpload'
import axios from "axios";
import api from "../api";
import { useState, useEffect } from "react";
import Checkbox from "antd/lib/checkbox/Checkbox";

function ProductAdd (props) {

    const [form] = Form.useForm()
    const [images, setImages] = useState([])
    const [categories, setCategories] = useState([])
    const [companies, setCompanies] = useState([])
    const [shops, setShops] = useState([])
    const [tags, setTags] = useState([])
    const [brand, setBrand] = useState(false)
    const [poster, setPoster] = useState(false)

    useEffect(() => {
        getCategories()
        getCompanies()
        getShops()
        getTags()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

    function getShops () {
        axios({
            method: 'GET',
            url: `${api.shops}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }        
        }).then(res => {
            setShops(res.data.results)
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
        // console.log(values)
        // console.log(images)
        // console.log(poster)
        var formData = new FormData();
        formData.append('name', values.name);   
        formData.append('is_brand', brand);   
        if (values.name_en) {
            formData.append('name_en', values.name_en);
        }     
        if (values.description) {
            formData.append('description', values.description);
        }
        if (values.description_en) {
            formData.append('description_en', values.description_en);
        }
        if (values.ingredients) {
            formData.append('ingredients', values.ingredients);
        }
        if (values.ingredients_en) {
            formData.append('ingredients_en', values.ingredients_en);
        }
        if (values.usage) {
            formData.append('usage', values.usage);
        }
        if (values.usage_en) {
            formData.append('usage_en', values.usage_en);
        }
        if (values.caution) {
            formData.append('caution', values.caution);
        }
        if (values.caution_en) {
            formData.append('caution_en', values.caution_en);
        }
        if (values.storage) {
            formData.append('storage', values.storage);
        }
        if (values.storage_en) {
            formData.append('storage_en', values.storage_en);
        }
        if (values.price) {
            formData.append('price', values.price);
        }        
        if (values.company) {
            formData.append('company', values.company);
        }
        if (values.category) {
            formData.append('category', values.category);
        }
        if (values.tag) {
            formData.append('tag', values.tag);
        }
        // if (images) {
        //     formData.append('images', images.values())
        // }
        // if (poster) {
        //     formData.append('poster', poster)
        // }        
        formData.append('token', props.token)
        axios({
            method: 'POST',
            url: `${api.items}/`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {   
            if (res.status === 201) {            
                notification['success']({
                    message: 'Амжилттай',
                    description: `${values.name} бүтээгдэхүүн амжилттай нэмэгдлээ.`
                })              
                form.resetFields()
                //setImage(undefined)                
            }
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${values.name} бүтээгдэхүүн нэмэгдсэнгүй. Дахин оролдоно уу.`
            })
        })
    }

    function onImageSelected (path) {
        setImages([...images, path])
    } 

    function onPosterSelected (path) {        
        setPoster(path)
    }

    return (
        <div>
            <Typography.Title level={4}>Бүтээгдэхүүн нэмэх</Typography.Title>
            <Typography.Text type="warning"><WarningOutlined /> Бүтээгдэхүүн нэмэхийн өмнө тухайн бүтээгдэхүүн өмнө бүртгэгдсэн эсэхийг шалгана уу!</Typography.Text>
            <Form 
                form={form} 
                layout="vertical" 
                onFinish={onFinish}
                style={{ marginTop: '16px', border: '1px solid #dedede', padding: '16px' }}
            >
                <Row gutter={[16, 0]}>
                    <Col span={8}>
                        <Form.Item name="name" label="Нэр" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="name_en" label="Нэр (EN)">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name="price" label="Үнэ" rules={[{ required: true }]}>
                            <Input suffix="₮" />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name="is_brand" label="Онцлох бүтээгдэхүүн">
                            <Checkbox onChange={() => setBrand(!brand)}>Тийм</Checkbox>
                        </Form.Item>
                    </Col>         
                    <Col span={12}>
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
                    <Col span={12}>
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
                    <Col span={12}>
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
                    <Col span={12}>
                        <Form.Item name="shops" label="Салбарууд">
                            <Select                                
                                placeholder="Салбар сонгох"
                                optionFilterProp="children"
                            >
                                { shops ? shops.map(shop => (
                                    <Select.Option key={shop.id}>{shop.name}</Select.Option>
                                )) : <></> }
                            </Select>          
                        </Form.Item>
                    </Col>                    
                    <Col span={12}>
                        <Form.Item name="description" label="Тайлбар">
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="description_en" label="Тайлбар (EN)">
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="ingredients" label="Найрлага">
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="ingredients_en" label="Найрлага (EN)">
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="usage" label="Хэрэглэх заавар">
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="usage_en" label="Хэрэглэх заавар (EN)">
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="caution" label="Анхааруулга">
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="caution_en" label="Анхааруулга (EN)">
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="storage" label="Хадгалалт">
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Col>    
                    <Col span={12}>
                        <Form.Item name="storage_en" label="Хадгалалт (EN)">
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Col>                                        
                </Row>               
                <Form.Item name="poster" label="Poster">
                    <ImageUpload image={poster} onImageSelected={onPosterSelected} height="200px" width="400px" />     
                </Form.Item>
                <Form.Item name="image" label="Зураг">
                    <Space size={[16, 16]} wrap>      
                        {/* <Button type="dashed" size="large" icon={<PlusOutlined style={{ fontSize: '40px' }} />} style={{ width: '200px', height: '200px', fontSize: '18px' }} onClick={onAddImage}><br />Зураг нэмэх</Button>                               */}
                        {images.map(img => {
                            return (                                
                                <ImageUpload image={img} onImageSelected={onImageSelected} height="200px" width="200px" />     
                            )
                        })}                        
                        <ImageUpload onImageSelected={onImageSelected} height="200px" width="200px" />                            
                    </Space>                                 
                </Form.Item>
                <Popconfirm title="Хадгалах уу?" onConfirm={form.submit} okText="Тийм" cancelText="Үгүй">
                    <Button type="primary" style={{ marginRight: '8px' }}>Хадгалах</Button>
                </Popconfirm>                
            </Form>
        </div>
    )
}

export default ProductAdd