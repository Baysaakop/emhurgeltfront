import { WarningOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, notification, Popconfirm, Row, Select, Typography, message, Spin, InputNumber } from "antd";
import ImageUpload from '../components/ImageUpload'
import axios from "axios";
import api from "../api";
import { useState, useEffect } from "react";
import Checkbox from "antd/lib/checkbox/Checkbox";

function ProductAdd (props) {

    const [form] = Form.useForm()    
    const [types, setTypes] = useState([])
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [companies, setCompanies] = useState([])
    const [shops, setShops] = useState([])
    const [tags, setTags] = useState([])
    const [brand, setBrand] = useState(false)
    const [image1, setImage1] = useState()
    const [image2, setImage2] = useState()
    const [image3, setImage3] = useState()
    const [image4, setImage4] = useState()
    const [poster, setPoster] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getTypes()
        getCompanies()
        getShops()
        getTags()
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

    function getCategories (ids) {
        axios({
            method: 'GET',
            url: `${api.categories}?types=${ids}`,
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

    function getSubCategories (ids) {
        axios({
            method: 'GET',
            url: `${api.subcategories}?categories=${ids}`,
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

    function onSelectType (ids) {        
        if (ids.length > 0) {
            getCategories(ids)                
        } else {
            setCategories(undefined)
        }       
    }

    function onSelectCategory (ids) {                
        if (ids.length > 0) {
            getSubCategories(ids)            
        } else {
            setSubCategories(undefined)
        }                    
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
        console.log(values)
        // console.log(images)
        // console.log(poster)
        setLoading(true)
        var formData = new FormData();
        formData.append('name', values.name) 
        formData.append('price', values.price)  
        formData.append('is_brand', brand)           
        formData.append('token', props.token)
        if (values.name_en) {
            formData.append('name_en', values.name_en);
        }     
        if (values.count) {
            formData.append('count', values.count);
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
        if (values.company) {
            formData.append('company', values.company);
        }
        if (values.type) {
            formData.append('type', values.type);
        }
        if (values.category) {
            formData.append('category', values.category);
        }
        if (values.subcategory) {
            formData.append('subcategory', values.subcategory);
        }
        if (values.tag) {
            formData.append('tag', values.tag);
        }
        if (values.shops) {
            formData.append('shops', values.shops);
        }
        if (image1) {
            formData.append('image1', image1)
        } 
        if (image2) {
            formData.append('image2', image2)
        } 
        if (image3) {
            formData.append('image3', image3)
        } 
        if (image4) {
            formData.append('image4', image4)
        }                
        if (poster) {
            formData.append('poster', poster)
        }                
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
                setImage1(undefined)                
                setImage2(undefined)                
                setImage3(undefined)                
                setImage4(undefined)                
                setPoster(undefined)                
                setLoading(false)
            }
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${values.name} бүтээгдэхүүн нэмэгдсэнгүй. Дахин оролдоно уу.`
            })
        })
    }

    return (
        <div>
            { loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                    <Spin tip="Уншиж байна..." />
                </div>
            ) : ( 
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
                            <Col span={6}>
                                <Form.Item name="name" label="Нэр" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
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
                                <Form.Item name="count" label="Тоо ширхэг">
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>  
                            <Col span={4}>
                                <Form.Item name="is_brand" label="Онцлох бүтээгдэхүүн">
                                    <Checkbox onChange={() => setBrand(!brand)}>Тийм</Checkbox>
                                </Form.Item>
                            </Col>                                     
                            <Col span={8}>
                                <Form.Item name="type" label="Төрөл">
                                    <Select           
                                        mode="multiple"                                                               
                                        placeholder="Төрөл сонгох"
                                        optionFilterProp="children"    
                                        onChange={onSelectType}                            
                                    >
                                        { types ? types.map(t => (
                                            <Select.Option key={t.id}>{t.name}</Select.Option>
                                        )) : <></>}
                                    </Select>           
                                </Form.Item>
                            </Col>        
                            <Col span={8}>
                                <Form.Item name="category" label="Ангилал">
                                    <Select       
                                        mode="multiple"                                                                               
                                        placeholder="Ангилал сонгох"
                                        optionFilterProp="children"                                
                                        onChange={onSelectCategory}
                                    >
                                        { categories ? categories.map(c => (
                                            <Select.Option key={c.id}>{c.name}</Select.Option>
                                        )) : <></>}
                                    </Select>           
                                </Form.Item>
                            </Col>       
                            <Col span={8}>
                                <Form.Item name="subcategory" label="Дэд ангилал">
                                    <Select          
                                        mode="multiple"                      
                                        placeholder="Дэд ангилал сонгох"
                                        optionFilterProp="children"                                
                                    >
                                        { subCategories ? subCategories.map(s => (
                                            <Select.Option key={s.id}>{s.name}</Select.Option>
                                        )) : <></>}
                                    </Select>           
                                </Form.Item>
                            </Col>                    
                            <Col span={8}>
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
                            <Col span={8}>
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
                            <Col span={8}>
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
                                <Form.Item name="storage" label="Хадгалах нөхцөл">
                                    <Input.TextArea rows={3} />
                                </Form.Item>
                            </Col>    
                            <Col span={12}>
                                <Form.Item name="storage_en" label="Хадгалах нөхцөл (EN)">
                                    <Input.TextArea rows={3} />
                                </Form.Item>
                            </Col>                                                                  
                            <Col span={12}>
                                <Form.Item name="video" label="Видео">
                                    <Input.TextArea rows={10} />
                                </Form.Item>
                            </Col>    
                            <Col span={12}>
                                <Form.Item name="poster" label="Постер">
                                    <ImageUpload image={poster} onImageSelected={(path) => setPoster(path)} height="225px" width="450px" st />     
                                </Form.Item>
                            </Col>    
                            <Col span={6}>
                                <Form.Item name="image1" label="Зураг 1">
                                    <ImageUpload image={image1} onImageSelected={(path) => setImage1(path)} height="200px" width="200px" />     
                                </Form.Item>                
                            </Col>
                            <Col span={6}>
                                <Form.Item name="image2" label="Зураг 2">
                                    <ImageUpload image={image2} onImageSelected={(path) => setImage2(path)} height="200px" width="200px" />     
                                </Form.Item>                
                            </Col>
                            <Col span={6}>
                                <Form.Item name="image3" label="Зураг 3">
                                    <ImageUpload image={image3} onImageSelected={(path) => setImage3(path)} height="200px" width="200px" />     
                                </Form.Item>                
                            </Col>
                            <Col span={6}>
                                <Form.Item name="image4" label="Зураг 4">
                                    <ImageUpload image={image4} onImageSelected={(path) => setImage4(path)} height="200px" width="200px" />     
                                </Form.Item>                
                            </Col>                     
                        </Row>                            
                        <Popconfirm title="Хадгалах уу?" onConfirm={form.submit} okText="Тийм" cancelText="Үгүй">
                            <Button type="primary" style={{ marginRight: '8px' }}>Хадгалах</Button>
                        </Popconfirm>                               
                    </Form>
                </div>
            )}     
        </div>
    )
}

export default ProductAdd