import { Button, Form, notification, Popconfirm, Select, Typography, message, Spin, InputNumber } from "antd";
import axios from "axios";
import api from "../api";
import { useState } from "react";

function ProductCountUpdate (props) {
    const [form] = Form.useForm()        
    const [items, setItems] = useState([])    
    const [loading, setLoading] = useState(false)
    const [selection, setSelection] = useState()

    function onSearch (val) {        
        if (val) {
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
        } else {
            setItems(undefined)
        }        
    }
    
    function onSelect (id) {
        let hit = items.find(x => x.id.toString() === id)
        form.setFieldsValue({         
            count: hit.count !== null ? hit.count : '',
        })        
        setSelection(hit)
    }

    function onFinish (values) {
        setLoading(true)       
        axios({
            method: 'PUT',
            url: `${api.items}/${selection.id}/`,
            data: {
                count: values.count
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {
            if (res.status === 200) {
                notification['success']({
                    message: 'Амжилттай',
                    description: `${selection.name} бүтээгдэхүүний үлдэгдэл шинэчлэлээ.`
                })
                form.resetFields()                            
                setSelection(undefined)
                setLoading(false)
            }
        }).catch(err => {
            console.log(err)
            notification['error']({
                message: 'Амжилтгүй',
                description: `Амжилтгүй боллоо. Дахин оролдоно уу.`
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
                    <Typography.Title level={4}>Бүтээгдэхүүн хайх</Typography.Title>            
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
                            <Form.Item name="count" label="Тоо ширхэг">
                                <InputNumber style={{ width: '100px' }} />
                            </Form.Item>                       
                            <Popconfirm title="Хадгалах уу?" onConfirm={form.submit} okText="Тийм" cancelText="Үгүй">
                                <Button type="primary" style={{ marginRight: '8px' }}>Хадгалах</Button>
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

export default ProductCountUpdate