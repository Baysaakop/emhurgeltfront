import { Divider, Typography, Button, message, Avatar, Table, Form, Input, InputNumber, notification } from "antd"
import React, { useEffect, useState } from "react"
import axios from "axios"; 
import api from "../api";
import { CarOutlined, CheckCircleOutlined, DeleteOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import * as actions from '../store/actions/auth';
import { useHistory } from "react-router-dom";

function Cart (props) {    
    const history = useHistory()
    const [form] = Form.useForm()
    const [items, setItems] = useState()    
    const [bonus, setBonus] = useState(0)
    const [checked, setChecked] = useState(false)

    useEffect(() => {   
        setItems(props.items)       
    }, [props.items, props.user]) // eslint-disable-line react-hooks/exhaustive-deps 

    function onCountChange (val, id) {
        console.log(val)
        if (val) {
            axios({
                method: 'PUT',
                url: `${api.users}/${props.user.id}/`,
                headers: {
                    'Content-Type': 'application/json',      
                    'Authorization': `Token ${props.token}` 
                },
                data: {
                    cart: true,
                    mode: 'update',
                    item: id,
                    count: val                           
                }
            })            
            .then(res => {                
                setItems(res.data.cart)                                                               
            })
            .catch(err => {                      
                console.log(err.message)         
                message.error("Алдаа гарлаа. Дахин оролдоно уу.")          
            })   
        }                  
    }

    function onDelete (id) {
        axios({
            method: 'PUT',
            url: `${api.users}/${props.user.id}/`,
            headers: {
                'Content-Type': 'application/json',  
                'Authorization': `Token ${props.token}`                                                       
            },
            data: {
                cart: true,
                mode: 'delete',
                item: id,
                count: 1                                               
            }
        })            
        .then(res => {                
            setItems(res.data.cart)       
            props.onUpdateCart(res.data.cart)                                            
        })
        .catch(err => {                      
            console.log(err.message)         
            message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
        }) 
    }

    function onFinish (values) {          
        axios({
            method: 'POST',
            url: `${api.orders}/`,
            headers: {
                'Content-Type': 'application/json',     
                'Authorization': `Token ${props.token}`                                         
            },
            data: {
                token: props.token,
                total: getTotal(), 
                bonus_used: bonus,
                phone_number: values.phone_number,
                address: values.address                                                     
            }
        })            
        .then(res => {
            if (res.status === 201) {                                                                      
                props.onUpdateCart(res.data.customer.cart)                                    
                notification['success']({
                    message: 'Захиалга хүлээж авлаа.',
                    description: `'${res.data.ref}' дугаартай захиалга үүслээ.`,
                    duration: 8
                });                                
                history.push(`/orders/${res.data.ref}`)
            } else if (res.status === 406) {
                notification['error']({
                    message: 'Захиалга амжилтгүй боллоо.',
                    description: `Таны захиалга амжилтгүй боллоо. Та 1132-2817 дугаарт холбогдон лавлана уу. Баярлалаа,`,
                    duration: 8
                });
            }                                                          
        })
        .catch(err => {                      
            console.log(err.message)         
            message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
        })     
    }    

    function getTotal() {
        let total = 0
        items.forEach(x => {
            total += x.item.price * x.count
        })
        return total
    }

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    function findItem (id) {
        return items.find(x => x.id === id)
    }    

    const columns = [
        {
            title: 'Зураг',
            dataIndex: 'item',
            key: 'item',
            render: (item) => <img
                width={80}
                alt="logo"
                src={item.image1 ? item.image1 : "https://epharmacy-bucket.s3.ap-northeast-1.amazonaws.com/static/blank.jpg"}
            />
        },
        {
            title: 'Бүтээгдэхүүн',
            dataIndex: 'item',
            key: 'item',
            render: (item) => <a href={`/products/${item.id}`}><Typography.Title level={5} style={{ margin: 0 }}>{item.name}</Typography.Title></a>
        },
        {
            title: 'Үнэ',
            dataIndex: 'item',
            key: 'item',
            render: (item) => <Typography.Title level={5} style={{ margin: 0 }}>{formatNumber(item.price)}₮</Typography.Title>
        },
        {
            title: 'Тоо',
            dataIndex: 'id',
            key: 'id',
            render: (id) => 
            <InputNumber defaultValue={findItem(id).count} size="default" min={1} max={findItem(id).item.count} style={{ width: '80px' }} onChange={(val) => onCountChange(val, findItem(id).item.id)} />                                                                       
        },
        {
            title: 'Нийт',
            dataIndex: 'id',
            key: 'id',
            render: (id) => <Typography.Title level={5} style={{ margin: 0 }}>{formatNumber(findItem(id).item.price * findItem(id).count)}₮</Typography.Title>
        },
        {
            title: 'Хасах',
            dataIndex: 'item',
            key: 'item',
            render: (item) => <Button danger type="primary" icon={<DeleteOutlined />} onClick={() => onDelete(item.id)}></Button>
        },
    ] 

    return (
        <div style={{ background: '#fff', borderRadius: '2px', padding: '24px' }}>        
            {checked ? (
                <div>
                    <Typography.Title level={4} style={{ margin: 0 }}>Захиалга баталгаажуулах</Typography.Title>            
                    <Divider />
                    <Form 
                        form={form} 
                        layout="vertical" 
                        onFinish={onFinish}
                        initialValues={{
                            phone_number: props.user.username,
                            address: props.user.address
                        }}
                    >                       
                        <Form.Item name="phone_number" label="Утасны дугаар:" rules={[{ required: true, message: 'Утасны дугаараа оруулна уу!' }]}>                                             
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="address" label="Хүргүүлэх хаяг:" rules={[{ required: true, message: 'Хүргүүлэх хаягаа оруулна уу!' }]}>                                             
                            <Input rows={4} />       
                        </Form.Item>                      
                        <Button 
                            block                             
                            icon={<CheckCircleOutlined />} 
                            onClick={form.submit}
                            type="primary" 
                            style={{ marginTop: '8px' }}
                        >
                            Захиалах
                        </Button>
                    </Form>       
                </div>
            ) : (
                <div>
                    <Typography.Title level={4} style={{ margin: 0 }}>Таны сагс</Typography.Title>            
                    <Divider />
                    <Table columns={columns} dataSource={items} pagination={false} />     
                    { items && items.length > 0 ? 
                        <div style={{ textAlign: 'right' }}>
                            <Typography.Title level={5} style={{ margin: '16px 0' }}>Нийт дүн: {formatNumber(getTotal())}₮</Typography.Title>
                            <div style={{ marginBottom: '16px' }}>
                                <Typography.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>Ашиглах бонус: </Typography.Text>
                                <InputNumber 
                                    min={0} 
                                    max={props.user.bonus} 
                                    defaultValue={0} 
                                    size="middle" 
                                    style={{ width: '120px' }} 
                                    onChange={(val) => setBonus(val ? val : 0)}
                                />                                
                            </div>
                            <Typography.Title level={5}>Төлөх дүн: {formatNumber(getTotal() - bonus)}₮</Typography.Title>
                            <Button type="primary" size="middle" icon={<DoubleRightOutlined />} onClick={() => setChecked(true)}>Үргэлжлүүлэх</Button>
                        </div>   
                    :
                        <></>
                    }                             
                </div>
            )}   
            <div style={{ border: '1px solid #dedede', width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '16px 8px', marginTop: '16px' }}>
                <div><Avatar shape="round" size={64} icon={<CarOutlined />} style={{ background: '#dedede', color: '#000', marginRight: '16px' }} /></div>
                <div>
                    <Typography.Title level={5}>ХҮРГЭЛТИЙН НӨХЦӨЛ</Typography.Title>
                    <Typography.Text>Бид харилцагч таны 13:00 цагаас өмнө өгсөн захиалгыг тухайн өдөрт нь хүргэж өгөх бөгөөд 13:00 цагаас хойш хийгдсэн захиалгыг ачааллаас хамааран тухайн өдөрт юмуу дараагийн өдөрт хүргэж өгөх болно.</Typography.Text>
                </div>
            </div>                                                                         
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateCart: (cart) => dispatch(actions.updateCart(cart))        
    }
}

export default connect(null, mapDispatchToProps)(Cart)