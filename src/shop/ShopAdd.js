import { useState } from "react";
import { EnvironmentOutlined, WarningOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography, notification, Modal } from "antd";
import axios from "axios";
import api from "../api";
import AddressForm from '../components/AddressForm'
import ImageUpload from '../components/ImageUpload'

function ShopAdd (props) {

    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false)
    const [address, setAddress] = useState()   
    const [image, setImage] = useState()
    
    const onImageSelected = (path) => {
        setImage(path);
    } 

    function onFinish (values) {
        var formData = new FormData();
        formData.append('name', values.name) 
        formData.append('phone_number', values.phone_number) 
        if (address) {
            formData.append('address', true)
            formData.append('city', address.city)
            formData.append('district', address.district)
            formData.append('section', address.section)
            formData.append('address', address.address)
        }        
        if (image) {
            formData.append('image', image)
        }
        axios({
            method: 'POST',
            url: `${api.shops}/`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {
            if (res.status === 201) {
                notification['success']({
                    message: 'Амжилттай',
                    description: `${values.name} салбар амжилттай нэмэгдлээ.`
                })
                form.resetFields()
                setImage(undefined)
            }
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${values.name} салбар нэмэгдсэнгүй. Дахин оролдоно уу.`
            })
        })
    }

    function changeAddress (values, address_text) {        
        setAddress(values)
        form.setFieldsValue({
            address: address_text
        })
        setVisible(false)
    }

    return (
        <div>
            <Typography.Title level={4}>Салбар нэмэх</Typography.Title>
            <Typography.Text type="warning"><WarningOutlined /> Салбар нэмэхийн өмнө тухайн төрөл өмнө бүртгэгдсэн эсэхийг шалгана уу!</Typography.Text>
            <Form 
                form={form} 
                layout="vertical" 
                onFinish={onFinish}
                style={{ marginTop: '16px', border: '1px solid #dedede', padding: '16px', width: '800px' }}                            
            >
                <Form.Item name="name" label="Нэр"  rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="phone_number" label="Утасны дугаар" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Хаяг:">                            
                    <Input                                 
                        disabled
                        prefix={<EnvironmentOutlined style={{ color: '#a1a1a1' }} />} 
                        suffix={<Button type="primary" onClick={() => setVisible(true)}>Засах</Button>}                                                                                                 
                    />                            
                </Form.Item>  
                <Form.Item name="image" label="Зураг">
                    <ImageUpload image={image} onImageSelected={onImageSelected} height="200px" width="400px" />     
                </Form.Item>
                <Button type="primary" onClick={form.submit}>Хадгалах</Button>
            </Form>
            <Modal
                title="Хаяг оруулах"
                visible={visible}
                footer={false}                                        
                onCancel={() => setVisible(false)}
            >
                <AddressForm changeAddress={changeAddress} />
            </Modal>               
        </div>
    )
}

export default ShopAdd