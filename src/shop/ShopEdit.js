import { Button, Form, Input, message, notification, Popconfirm, Select, Typography, Modal } from "antd";
import ImageUpload from '../components/ImageUpload'
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api";
import { EnvironmentOutlined } from "@ant-design/icons";
import AddressForm from '../components/AddressForm'

function ShopEdit (props) {

    const [form] = Form.useForm()
    const [shops, setShops] = useState([])
    const [selection, setSelection] = useState()
    const [visible, setVisible] = useState(false)
    const [address, setAddress] = useState()   
    const [image, setImage] = useState()

    useEffect(() => {
        getShops()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getShops () {
        axios({
            method: 'GET',
            url: `${api.shops}/`,
            headers: {
                'Content-Type': 'application/json'                         
            }        
        }).then(res => {
            setShops(res.data.results)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }    

    function onSelect (id) {
        let hit = shops.find(x => x.id.toString() === id)
        form.setFieldsValue({
            name: hit.name,
            phone_number: hit.phone_number,
            address: getAddress(hit.address)
        })
        setAddress(hit.address)
        setImage(hit.image)
        setSelection(hit)
    }

    function onFinish (values) {        
        console.log(values)
        console.log(address)
        console.log(image)
        var formData = new FormData();
        if (values.name && values.name !== selection.name) {
            formData.append('name', values.name);
        }
        if (values.phone_number && values.phone_number !== selection.phone_number) {
            formData.append('phone_number', values.phone_number);
        }
        if (address && getAddress(address) !== getAddress(selection.address)) {
            formData.append('address', true)
            formData.append('city', address.city)
            formData.append('district', address.district)
            formData.append('section', address.section)
            formData.append('address', address.address)
        }
        if (image && image !== selection.image) {
            formData.append('image', image)
        }                
        axios({
            method: 'PUT',
            url: `${api.shops}/${selection.id}/`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',                       
            }
        }).then(res => {
            if (res.status === 200) {
                notification['success']({
                    message: 'Амжилттай',
                    description: `${selection.name} салбар амжилттай засагдлаа.`
                })
                getShops()
            }
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${selection.name} салбар засагдсангүй. Дахин оролдоно уу.`
            })
        })
    }

    function onDelete () {
        axios({
            method: 'DELETE',
            url: `${api.shops}/${selection.id}/`,
            headers: {
                'Content-Type': 'application/json'                    
            }
        }).then(res => {
            console.log(res)
            if (res.status === 200 || res.status === 204) {
                notification['info']({
                    message: 'Амжилттай',
                    description: `${selection.name} салбар амжилттай устлаа.`
                })
            }
            form.resetFields()
            setImage(undefined)
            getShops()
        }).catch(err => {
            notification['error']({
                message: 'Амжилтгүй',
                description: `${selection.name} салбар устсангүй. Дахин оролдоно уу.`
            })
        })
    }

    function getAddress (address_obj) {
        if (!address_obj || address_obj == null) {
            return ""
        }
        let result = address_obj.city.name + ", " + address_obj.district.name + " дүүрэг"
        if (address_obj.section) {
            result = result + ", " + address_obj.section + "-р хороо"
        }
        if (address_obj.address) {
            result = result + ", " + address_obj.address
        }        
        return result
    }

    function changeAddress (values, address_text) {        
        setAddress(values)
        form.setFieldsValue({
            address: address_text
        })
        setVisible(false)
    }

    const onImageSelected = (path) => {
        setImage(path);
    } 

    return (
        <div>
            <Typography.Title level={4}>Салбар засах / устгах</Typography.Title>
            <Select                                
                placeholder="Салбар сонгох"
                optionFilterProp="children"
                onSelect={onSelect}
                style={{ width: '800px' }}
            >
                { shops ? shops.map(shop => (
                    <Select.Option key={shop.id}>{shop.name}</Select.Option>
                )) : <></> }
            </Select>                  
            { selection ? (
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
                    <Popconfirm title="Хадгалах уу?" onConfirm={form.submit} okText="Тийм" cancelText="Үгүй">
                        <Button type="primary" style={{ marginRight: '8px' }}>Хадгалах</Button>
                    </Popconfirm>
                    <Popconfirm title="Устгах уу?" onConfirm={onDelete} okText="Тийм" cancelText="Үгүй">
                        <Button danger type="primary">Устгах</Button>
                    </Popconfirm>
                </Form>
            ) : (<></>)}                              
            <Modal
                title="Хаяг оруулах"
                visible={visible}
                footer={false}                                        
                onCancel={() => setVisible(false)}
            >
                <AddressForm address={selection ? selection.address : undefined} changeAddress={changeAddress} />
            </Modal>   
        </div>
    )
}

export default ShopEdit