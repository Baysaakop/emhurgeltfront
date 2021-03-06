import { Button, Col, Form, Input, notification, Popconfirm, Row, Select, Typography, message, Spin, InputNumber, Divider } from "antd";
import ImageUpload from '../components/ImageUpload'
import axios from "axios";
import api from "../api";
import { useState, useEffect } from "react";
import Checkbox from "antd/lib/checkbox/Checkbox";

function ProductAdd (props) {

    const [form] = Form.useForm()    
    const [categories, setCategories] = useState([])    
    const [subCategories, setSubCategories] = useState([])    
    const [tags, setTags] = useState([])    
    const [companies, setCompanies] = useState([])
    const [featured, setFeatured] = useState(false)
    const [image1, setImage1] = useState()
    const [image2, setImage2] = useState()
    const [image3, setImage3] = useState()
    const [image4, setImage4] = useState()
    const [poster, setPoster] = useState()
    const [loading, setLoading] = useState(false)

    const [selectedCategory, setSelectedCategory] = useState()
    const [selectedSubCategory, setSelectedSubCategory] = useState()
    const [selectedCompany, setSelectedCompany] = useState()

    useEffect(() => {
        getCategories()
        getCompanies()        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getCategories (ids) {
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
        setSelectedCategory(id)
        if (id) {
            let cat = categories.find(x => x.id.toString() === id.toString())
            setSubCategories(cat.subcategories)
        } else {
            setSubCategories(undefined)
        }                    
    }

    function onSelectSubCategory (ids) {                        
        setSelectedSubCategory(ids)                 
    }

    function onSelectCompany (id) {                
        setSelectedCompany(id)                 
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

    function onSearchTag (val) {
        axios({
            method: 'GET',
            url: `${api.tags}?name=${val}`,
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
        setLoading(true)
        var formData = new FormData();
        formData.append('name', values.name) 
        formData.append('price', values.price)  
        formData.append('count', values.count)  
        formData.append('is_featured', featured)                   
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
        if (selectedCompany) {
            formData.append('company', selectedCompany);
        }
        if (selectedCategory) {
            formData.append('category', selectedCategory);
        }
        if (selectedSubCategory) {
            formData.append('subcategory', selectedSubCategory);
        }
        if (values.multiplier) {
            formData.append('multiplier', values.multiplier);   
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
                setFeatured(false)   
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
            <div>
                <Typography.Title level={4} style={{ margin: 0 }}>Бүтээгдэхүүн нэмэх</Typography.Title>           
                <Divider style={{ margin: '12px 0' }} />                             
                <Row gutter={[16, 0]} style={{ marginBottom: '24px' }}>                                                                                                                                 
                    <Col span={8}>
                        <Typography.Title level={5}>Ангилал:</Typography.Title>
                        <Select                                                                                   
                            placeholder="Ангилал сонгох"
                            optionFilterProp="children"                                
                            onChange={onSelectCategory}
                            style={{ width: '100%' }}
                        >
                            { categories ? categories.map(c => (
                                <Select.Option key={c.id}>{c.name}</Select.Option>
                            )) : <></>}
                        </Select>           
                    </Col>       
                    <Col span={8}>
                        <Typography.Title level={5}>Дэд ангилал:</Typography.Title>
                        <Select          
                            mode="multiple"                      
                            placeholder="Дэд ангилал сонгох"
                            optionFilterProp="children"     
                            onChange={onSelectSubCategory}                  
                            style={{ width: '100%' }}         
                        >
                            { subCategories ? subCategories.map(s => (
                                <Select.Option key={s.id}>{s.name}</Select.Option>
                            )) : <></>}
                        </Select>           
                    </Col>                    
                    <Col span={8}>
                        <Typography.Title level={5}>Компани:</Typography.Title>
                        <Select                                
                            placeholder="Компани сонгох"
                            optionFilterProp="children"
                            onChange={onSelectCompany}
                            style={{ width: '100%' }}
                        >
                            { companies ? companies.map(com => (
                                <Select.Option key={com.id}>{com.name}</Select.Option>
                            )) : <></> }
                        </Select>          
                    </Col>                
                </Row>
                { loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                        <Spin tip="Уншиж байна..." />
                    </div>
                ) : ( 
                    <Form 
                        form={form} 
                        layout="vertical" 
                        onFinish={onFinish}
                        style={{ border: '1px solid #dedede', padding: '8px' }}
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
                                <Form.Item name="is_featured" label="Онцлох бүтээгдэхүүн">
                                    <Checkbox onChange={() => setFeatured(!featured)}>Тийм</Checkbox>
                                </Form.Item>
                            </Col>      
                            <Col span={4}>
                                <Form.Item name="multiplier" label="Бонус %">
                                    <InputNumber defaultValue={1} disabled={!featured} />
                                </Form.Item>
                            </Col>                                
                            <Col span={6}>
                                <Form.Item name="price" label="Үнэ" rules={[{ required: true }]}>
                                    <InputNumber style={{ width: '100%' }} formatter={value => `₮ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                                </Form.Item>
                            </Col>   
                            <Col span={6}>
                                <Form.Item name="count" label="Тоо ширхэг" rules={[{ required: true }]}>
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>                                        
                            <Col span={12}>
                                <Form.Item name="tag" label="Таг">
                                    <Select                 
                                        showSearch
                                        onSearch={onSearchTag}        
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
                            <Col span={24}>
                                <Form.Item name="poster" label="Постер (Онцлох бүтээгдэхүүн)">
                                    <ImageUpload image={poster} onImageSelected={(path) => setPoster(path)} height="250px" width="750px" />     
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
                )}
            </div>  
        </div>
    )
}

export default ProductAdd