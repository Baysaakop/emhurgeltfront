import { useEffect, useState } from "react"
import { Button, Col, List, message, Pagination, Row, Space } from "antd"
import axios from "axios"
import api from "../api"
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import moment from "moment"

function Orders (props) {

    const [orders, setOrders] = useState()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState()

    useEffect(() => {
        getOrders(props.state, page)
    }, [props.state, page])

    function getOrders(state, page) {
        let url = `${api.orders}/?state=${state}`
        url += `&page=${page}`    
        axios({
            method: 'GET',
            url: url           
        }).then(res => {                                    
            setOrders(res.data.results)          
            setTotal(res.data.count)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }
    
    function onPageChange (pageNum, pageSize) {        
        setPage(pageNum)
    }

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    function getButtonText(state) {
        if (props.state === "1") {
            return 'Хүлээж авсан'
        } else if (props.state === "2") {
            return 'Хүргэлтэнд гарсан'
        } else if (props.state === "3") {
            return 'Хүргэгдсэн'
        } else {
            return ''
        }
    }

    function onAccept(id) {
        axios({
            method: 'PUT',
            url: `${api.orders}/${id}/`,
            headers: {
                'Content-Type': 'application/json',     
                'Authorization': `Token ${props.token}`                                         
            },
            data: {                
                state: props.state                                       
            }
        })            
        .then(res => {
            if (res.status === 200) {                                                      
                getOrders(props.state, page)         
                message.info("Амжилттай")                                                              
            }                                                        
        })
        .catch(err => {                      
            console.log(err.message)         
            message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
        }) 
    }

    function onDecline(id) {
        axios({
            method: 'PUT',
            url: `${api.orders}/${id}/`,
            headers: {
                'Content-Type': 'application/json',     
                'Authorization': `Token ${props.token}`                                         
            },
            data: {                
                state: "5"                                      
            }
        })            
        .then(res => {
            if (res.status === 200) {                                                      
                getOrders(props.state, page)                                                             
                message.info("Амжилттай")                
            }                                                        
        })
        .catch(err => {                      
            console.log(err.message)         
            message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
        }) 
    }

    return (
        <div>
            <List
                itemLayout="vertical"
                dataSource={orders}
                renderItem={order => (
                    <List.Item
                        key={order.id}
                        actions={ parseInt(props.state) < 4 ? [
                            <Button type="primary" icon={<CheckCircleOutlined />} style={{ marginRight: '16px' }} onClick={() => onAccept(order.id)}>{getButtonText(props.state)}</Button>,
                            <Button danger type="primary" icon={<CloseCircleOutlined />} onClick={() => onDecline(order.id)}>Цуцлах</Button>
                        ] : []}
                        extra={
                            <Space size={[8, 8]} style={{ width: '320px' }} wrap>
                                {order.items.map(item => {
                                    return (
                                        <div style={{ width: '100px', height: '100px', border: '1px solid #dedede' }}>
                                            <img 
                                                alt={item.item.name} 
                                                src={item.item.image1 ? item.item.image1 : "https://epharmacy-bucket.s3.ap-northeast-1.amazonaws.com/static/blank.jpg"} 
                                                style={{ width: '100%', height: '100%', objectFit: 'scale-down' }} 
                                            />
                                        </div>
                                    )
                                })}
                            </Space>
                        }
                        style={{ marginBottom: '8px' }}
                    >
                        <List.Item.Meta                            
                            title={<strong>ЗАХИАЛГЫН ДУГААР: {order.ref}</strong>}                            
                        />
                        <Row gutter={[16, 16]} style={{ width: '100%' }}>                            
                            <Col xs={24} sm={24} md={8}>
                                Үнийн дүн: {formatNumber(order.total)}₮
                            </Col>
                            <Col xs={24} sm={24} md={8}>
                                Ашигласан бонус: {formatNumber(order.bonus)}₮
                            </Col>
                            <Col xs={24} sm={24} md={8}>
                                Төлөх дүн: {formatNumber(order.total - order.bonus)}₮
                            </Col>
                            <Col xs={24} sm={24} md={8}>
                                Захиалагч: <a href={`/users/${order.user.id}`}>{order.user.username}</a>
                            </Col>
                            <Col xs={24} sm={24} md={8}>
                                Утасны дугаар: {order.phone_number}
                            </Col>
                            <Col xs={24} sm={24} md={8}>
                                Огноо: {moment(order.created_at).format("YYYY-MM-DD HH:MM")}
                            </Col>
                            <Col span={24}>
                                Хаяг: {order.address}
                            </Col>
                            <Col span={24}>
                                Нэмэлт мэдээлэл: {order.info}
                            </Col>
                        </Row>                        
                    </List.Item>
                )}
            />
            <Pagination
                current={page}
                total={total}
                pageSize={24}
                showSizeChanger={false}
                showTotal={false}
                style={{ marginTop: '8px' }}
                onChange={onPageChange}
            />
        </div>
    )
}

export default Orders