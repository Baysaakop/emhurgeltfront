import { Button, Col, Form, Input, Checkbox, notification, Popconfirm, Row, Select, Typography, message, Spin } from "antd";
import ImageUpload from '../components/ImageUpload'
import axios from "axios";
import api from "../api";
import { useState, useEffect } from "react";

function ProductEdit (props) {

    const [form] = Form.useForm()    
    const [items, setItems] = useState([])
    const [categories, setCategories] = useState([])
    const [companies, setCompanies] = useState([])
    const [tags, setTags] = useState([])
    const [shops, setShops] = useState([])
    const [brand, setBrand] = useState(false)
    const [image1, setImage1] = useState()
    const [image2, setImage2] = useState()
    const [image3, setImage3] = useState()
    const [image4, setImage4] = useState()
    const [loading, setLoading] = useState(false)
    const [selection, setSelection] = useState()

    useEffect(() => {
        getCategories()
        getCompanies()
        getTags()
        getShops()
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
            name_en: hit.name_en,            
            description: hit.description !== null ? hit.description : '',
            description_en: hit.description_en !== null ? hit.description_en : '',
            ingredients: hit.ingredients !== null ? hit.ingredients : '',
            ingredients_en: hit.ingredients_en !== null ? hit.ingredients_en : '',
            usage: hit.usage !== null ? hit.usage : '',
            usage_en: hit.usage_en !== null ? hit.usage_en : '',
            caution: hit.caution !== null ? hit.caution : '',
            caution_en: hit.caution_en !== null ? hit.caution_en : '',
            storage: hit.storage !== null ? hit.storage : '',
            storage_en: hit.storage_en !== null ? hit.storage_en : '',
            price: hit.price !== null ? hit.price : '',
            company: hit.company !== null ? hit.company.id.toString() : undefined,
            category: hit.category !== null ? getIDs(hit.category) : undefined,
            tag: hit.tag !== null ? getIDs(hit.tag) : undefined,
            shops: hit.shops !== null ? getIDs(hit.shops) : undefined,
        })
        setImage1(hit.image1 !== null ? hit.image1 : undefined)
        setImage2(hit.image2 !== null ? hit.image2 : undefined)
        setImage3(hit.image3 !== null ? hit.image3 : undefined)
        setImage4(hit.image4 !== null ? hit.image4 : undefined)
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

    function onFinish (values) {
        setLoading(true)
        var formData = new FormData();
        if (values.name && values.name !== selection.name) {
            formData.append('name', values.name);
        }
        if (values.name_en && values.name_en !== selection.name_en) {
            formData.append('name_en', values.name_en);
        }
        if (values.description && values.description !== selection.description) {
            formData.append('description', values.description);
        }    
        if (values.description_en && values.description_en !== selection.description_en) {
            formData.append('description_en', values.description_en);
        }               
        if (values.ingredients && values.ingredients !== selection.ingredients) {
            formData.append('ingredients', values.ingredients);
        }
        if (values.ingredients_en && values.ingredients_en !== selection.ingredients_en) {
            formData.append('ingredients_en', values.ingredients_en);
        }
        if (values.usage && values.usage !== selection.usage) {
            formData.append('usage', values.usage);
        }
        if (values.usage_en && values.usage_en !== selection.usage_en) {
            formData.append('usage_en', values.usage_en);
        }
        if (values.caution && values.caution !== selection.caution) {
            formData.append('caution', values.caution);
        }
        if (values.caution_en && values.caution_en !== selection.caution_en) {
            formData.append('caution_en', values.caution_en);
        }
        if (values.storage && values.storage !== selection.storage) {
            formData.append('storage', values.storage);
        }
        if (values.storage_en && values.storage_en !== selection.storage_en) {
            formData.append('storage_en', values.storage_en);
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
        if (values.shops && values.shops !== getIDs(selection.shops)) {
            formData.append('shops', values.shops);
        }
        if (image1 && image1 !== selection.image1) {
            formData.append('image1', image1)
        }    
        if (image2 && image2 !== selection.image2) {
            formData.append('image2', image2)
        }    
        if (image3 && image3 !== selection.image3) {
            formData.append('image3', image3)
        }    
        if (image4 && image4 !== selection.image4) {
            formData.append('image4', image4)
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
                form.resetFields()
                setImage1(undefined)                
                setImage2(undefined)                
                setImage3(undefined)                
                setImage4(undefined)                                
                setSelection(undefined)
                setLoading(false)
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
                    message: 'Устсан.',
                    description: `${selection.name} бүтээгдэхүүн устлаа.`
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

    return (
        <div>
            { loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                    <Spin tip="Уншиж байна..." />
                </div>
            ) : ( 
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
                    { selection ? (
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
                                    <Form.Item name="storage" label="Хадгалах нөхцөл">
                                        <Input.TextArea rows={3} />
                                    </Form.Item>
                                </Col>    
                                <Col span={12}>
                                    <Form.Item name="storage_en" label="Хадгалах нөхцөл (EN)">
                                        <Input.TextArea rows={3} />
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
                            <Popconfirm title="Устгах уу?" onConfirm={onDelete} okText="Тийм" cancelText="Үгүй">
                                <Button danger type="primary">Устгах</Button>
                            </Popconfirm>     
                        </Form>
                    ) : (
                        <></>
                    )}                  
                </div>
            )}            
        </div>
    )
}

export default ProductEdit