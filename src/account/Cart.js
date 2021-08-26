import { Divider, Typography, List, Button, message, Row, Col, Form, Input, Checkbox, Avatar, InputNumber, Modal, notification } from "antd"
import React, { useEffect, useState } from "react"
import axios from "axios"; 
import api from "../api";
import { Link, useHistory } from "react-router-dom";
import { CarOutlined, DeleteOutlined, MinusOutlined, MobileOutlined, PlusOutlined, ShoppingOutlined, WarningOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import * as actions from '../store/actions/auth';
import AddressForm from '../components/AddressForm';

function Cart (props) {
    let history = useHistory()
    const [form] = Form.useForm()
    const [amount, setAmount] = useState(0)
    const [items, setItems] = useState()
    const [useBonus, setUseBonus] = useState(false)
    const [bonus, setBonus] = useState(0)
    const [visible, setVisible] = useState(false)

    useEffect(() => {   
        setItems(props.items)   
        getAmount(props.items)          
        form.setFieldsValue({
            phone_number: props.user.profile.phone_number,
            address: props.user.profile.address
        })        
    }, [props.items, props.user]) // eslint-disable-line react-hooks/exhaustive-deps

    function getAmount(cartitems) {
        let total = 0
        cartitems.forEach(element => {
            total += element.item.price * element.count
        });
        setAmount(total)
    }

    function onPlus (item) {              
        if (item.count + 1 < 100) {              
            axios({
                method: 'PUT',
                url: `${api.profiles}/${props.user.profile.id}/`,
                headers: {
                    'Content-Type': 'application/json',                                              
                    'Authorization': `Token ${props.token}`           
                },
                data: {
                    cart: true,
                    mode: 'add',
                    item: item.item.id,
                    count: 1                                               
                }
            })            
            .then(res => {
                if (res.status === 200 || res.status === 201) {                                                      
                    setItems(res.data.cart)
                    getAmount(res.data.cart)
                }                                                         
            })
            .catch(err => {                      
                console.log(err.message)         
                message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
            })             
        }
    }

    function onMinus (item) {
        if (item.count - 1 > 0) {
            axios({
                method: 'PUT',
                url: `${api.profiles}/${props.user.profile.id}/`,
                headers: {
                    'Content-Type': 'application/json',            
                    'Authorization': `Token ${props.token}`                                             
                },
                data: {
                    cart: true,
                    mode: 'sub',
                    item: item.item.id,
                    count: 1                                               
                }
            })            
            .then(res => {
                if (res.status === 200 || res.status === 201) {                                                      
                    setItems(res.data.cart)
                    getAmount(res.data.cart)
                }                                                         
            })
            .catch(err => {                      
                console.log(err.message)         
                message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
            }) 
        }        
    }

    function onDelete (item) {
        axios({
            method: 'PUT',
            url: `${api.profiles}/${props.user.profile.id}/`,
            headers: {
                'Content-Type': 'application/json',  
                'Authorization': `Token ${props.token}`                                                       
            },
            data: {
                cart: true,
                mode: 'delete',
                item: item.item.id,
                count: 1                                               
            }
        })            
        .then(res => {
            if (res.status === 200 || res.status === 201) {                                                      
                setItems(res.data.cart)
                getAmount(res.data.cart)
                props.onUpdateCart(res.data.cart)                 
            }                                                         
        })
        .catch(err => {                      
            console.log(err.message)         
            message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
        }) 
    }
    function onChangeUseBonus(e) {        
        if (e.target.checked === false) {
            setUseBonus(false)
            setBonus(0)
        } else {            
            setUseBonus(true)            
        }
    }

    function onChangeBonus (val) {                
        if (val === null) {
            setBonus(0)
        } else {
            setBonus(val)
        }        
    }

    function onFinish (values) {        
        console.log(values)
        if (values.phone_number !== props.user.profile.phone_number) {
            axios({
                method: 'PUT',
                url: `${api.profiles}/${props.user.profile.id}/`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`                               
                },
                data: {
                    phone_number: values.phone_number
                }
            })             
        }
        if (values.address !== props.user.profile.address) {
            axios({
                method: 'PUT',
                url: `${api.profiles}/${props.user.profile.id}/`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`                               
                },
                data: {
                    address: values.address
                }
            })             
        }
        axios({
            method: 'POST',
            url: `${api.orders}/`,
            headers: {
                'Content-Type': 'application/json',     
                'Authorization': `Token ${props.token}`                                         
            },
            data: {
                token: props.token,
                total: amount, 
                bonus: bonus,
                phone_number: values.phone_number,
                address: values.address,
                info: values.info ? values.info : ""                                           
            }
        })            
        .then(res => {
            if (res.status === 201) {                                                                      
                props.onUpdateCart(res.data.user.profile.cart)                                    
                notification['success']({
                    message: 'Захиалга хүлээж авлаа.',
                    description: `'${res.data.ref}' дугаартай захиалга үүслээ. Төлбөр төлөгдсөний дараа таны захиалга хүргэгдэх болно. Баярлалаа`,
                    duration: 8
                });
                history.push(`profile?key=orders`)
            } else if (res.status === 406) {
                notification['error']({
                    message: 'Захиалга амжилтгүй боллоо.',
                    description: `Таны захиалга амжилтгүй боллоо. Та 7607-7722 дугаарт холбогдон лавлана уу. Баярлалаа,`,
                    duration: 8
                });
            }                                                          
        })
        .catch(err => {                      
            console.log(err.message)         
            message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
        }) 
    }

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    function changeAddress (address) {                
        form.setFieldsValue({
            address: address
        })
        setVisible(false)
    }

    return (
        <div style={{ background: '#fff', borderRadius: '2px', padding: '24px' }}>        
            <Typography.Title level={4} style={{ margin: 0 }}>Таны сагс</Typography.Title>            
            <Divider />
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={24} md={24} lg={16}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={items}
                        renderItem={item => (                           
                            <List.Item 
                                key={item.id}
                                actions={[
                                    <Button type="text" icon={<PlusOutlined />} onClick={() => onPlus(item)}>Нэмэх</Button>,
                                    <Button type="text" icon={<MinusOutlined />} onClick={() => onMinus(item)}>Хасах</Button>,
                                    <Button danger type="text" icon={<DeleteOutlined />} onClick={() => onDelete(item)}>Устгах</Button>,                                            
                                ]}
                                extra={
                                    <img
                                        width={100}
                                        alt="logo"
                                        src={item.item.image1 ? item.item.image1 : "https://epharmacy-bucket.s3.ap-northeast-1.amazonaws.com/static/blank.jpg"}
                                    />
                                }
                            >
                                <List.Item.Meta                                            
                                    title={<Link to={`products/${item.item.id}`}><strong>{item.item.name}</strong></Link>}
                                    description={item.item.company && item.item.company !== null ? item.item.company.name : undefined}
                                />
                                <p>
                                Үнэ: {formatNumber(item.item.price)}₮ X {item.count} = <span style={{ fontWeight: 'bold' }}>{formatNumber(item.item.price * item.count)}₮</span>
                                </p>
                            </List.Item>
                        )}
                    />  
                    <div style={{ border: '1px solid #dedede', width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '16px 8px', marginTop: '16px' }}>
                        <div><Avatar shape="square" size={64} icon={<CarOutlined />} style={{ background: '#dedede', color: '#000', marginRight: '16px' }} /></div>
                        <div><Typography.Text>14:00 цагаас өмнө захиалсан бүтээгдэхүүн тухайн өдөртөө хүргэгдэх бөгөөд 14:00 цагаас хойш захиалсан бүтээгдэхүүн дараа өдөртөө багтан танд хүргэгдэх болно.</Typography.Text></div>
                    </div>
                    <div style={{ border: '1px solid #dedede', width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '16px 8px', marginTop: '16px' }}>
                        <div><Avatar shape="square" size={64} icon={<WarningOutlined />} style={{ background: '#dedede', color: '#000', marginRight: '16px' }} /></div>
                        <div><Typography.Text>14:00 цагаас өмнө захиалсан бүтээгдэхүүн тухайн өдөртөө хүргэгдэх бөгөөд 14:00 цагаас хойш захиалсан бүтээгдэхүүн дараа өдөртөө багтан танд хүргэгдэх болно.</Typography.Text></div>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={8}>
                    <Typography.Title level={5} style={{ margin: 0 }}>Нийт дүн: {formatNumber(amount)}₮</Typography.Title>
                    <Typography.Title level={5} style={{ margin: 0 }}>Хүргэлт: {formatNumber(0)}₮</Typography.Title>
                    <Typography.Title level={5} style={{ margin: 0 }}>Төлөх дүн: {formatNumber(amount - parseInt(bonus))}₮</Typography.Title>                    
                    <Form form={form} layout="vertical" onFinish={onFinish} style={{ marginTop: '8px' }}>
                        <Checkbox checked={useBonus} onChange={onChangeUseBonus} style={{ marginBottom: '16px' }}>Урамшууллын оноо ашиглах</Checkbox>
                        { useBonus === true ?
                            <>                                
                                <Form.Item name="bonus" label={`Ашиглах дүн: (${formatNumber(props.user.profile.bonus)}₮ хүртэл)`}>
                                    <InputNumber
                                        defaultValue={0}
                                        min={0}
                                        max={props.user.profile.bonus}
                                        formatter={value => `₮ ${value}`}      
                                        style={{ width: '100%' }}                                  
                                        onChange={onChangeBonus}
                                    />
                                </Form.Item>            
                            </>
                        : <></> }
                        <Form.Item name="phone_number" label="Утасны дугаар:" rules={[{ required: true, message: 'Утасны дугаараа оруулна уу!' }]}>                                             
                            <Input maxLength={8} prefix={<MobileOutlined style={{ color: '#a1a1a1' }} />} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="address" label="Хүргүүлэх хаяг:" rules={[{ required: true, message: 'Хүргүүлэх хаягаа оруулна уу!' }]} style={{ marginBottom: '8px' }}>                                             
                            <Input.TextArea rows={4} disabled />       
                        </Form.Item>
                        <Button type="primary" style={{ width: '100%', marginBottom: '16px' }} onClick={() => setVisible(true)}>Хаяг сонгох</Button>
                        <Modal
                            title="Хаяг оруулах"
                            visible={visible}
                            footer={false}                                        
                            onCancel={() => setVisible(false)}
                        >
                            <AddressForm token={props.token} user={props.user} changeAddress={changeAddress} />
                        </Modal>    
                        <Form.Item name="info" label="Нэмэлт мэдээлэл:">                                             
                            <Input.TextArea rows={4} placeholder="Жич: Нялх хүүхэдтэй тул хонх дарахгүй байх" />       
                        </Form.Item>                        
                        <Button block disabled={items && items.length === 0} type="primary" icon={<ShoppingOutlined />} onClick={form.submit}>Захиалах</Button>
                    </Form>
                </Col>
            </Row>                                      
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateCart: (cart) => dispatch(actions.updateCart(cart))        
    }
}

export default connect(null, mapDispatchToProps)(Cart)