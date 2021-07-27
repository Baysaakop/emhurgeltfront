import { Button, Form, Input, message, notification, Popconfirm, Select, Typography } from "antd";
import ImageUpload from '../components/ImageUpload'
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api";

function CompanyEdit (props) {

    const [form] = Form.useForm()
    const [companies, setCompanies] = useState([])
    const [selection, setSelection] = useState()
    const [image, setImage] = useState()

    useEffect(() => {
        getCompanies()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

    function onSelect (id) {
        let hit = companies.find(x => x.id.toString() === id)
        form.setFieldsValue({
            name: hit.name,
            description: hit.description
        })
        setImage(hit.image)
        setSelection(hit)
    }

    function onFinish (values) {        
        var formData = new FormData();
        if (values.name && values.name !== selection.name) {
            formData.append('name', values.name);
        }
        if (values.description && values.description !== selection.description) {
            formData.append('description', values.description);
        }
        if (image && image !== selection.image) {
            formData.append('image', image)
        }        
        formData.append('token', props.token)
        axios({
            method: 'PUT',
            url: `${api.companies}/${selection.id}/`,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {
            if (res.status === 200) {
                notification['success']({
                    message: 'Амжилттай',
                    description: `${selection.name} компани амжилттай засагдлаа.`
                })
                getCompanies()
            }
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${selection.name} компани засагдсангүй. Дахин оролдоно уу.`
            })
        })
    }

    function onDelete () {
        axios({
            method: 'DELETE',
            url: `${api.companies}/${selection.id}/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {
            console.log(res)
            if (res.status === 200 || res.status === 204) {
                notification['info']({
                    message: 'Амжилттай',
                    description: `${selection.name} компани амжилттай устлаа.`
                })
            }
            form.resetFields()
            getCompanies()
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${selection.name} компани устсангүй. Дахин оролдоно уу.`
            })
        })
    }

    const onImageSelected = (path) => {
        setImage(path);
    } 

    return (
        <div>
            <Typography.Title level={4}>Компани засах / устгах</Typography.Title>
            <Select                                
                placeholder="Компани сонгох"
                optionFilterProp="children"
                onSelect={onSelect}
                style={{ width: '500px' }}
            >
                { companies ? companies.map(com => (
                    <Select.Option key={com.id}>{com.name}</Select.Option>
                )) : <></> }
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
                    <Form.Item name="description" label="Тайлбар">
                        <Input.TextArea rows={4} />
                    </Form.Item>          
                    <Form.Item name="image" label="Лого / зураг">
                        <ImageUpload image={image} onImageSelected={onImageSelected} height="200px" width="300px" />     
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

export default CompanyEdit