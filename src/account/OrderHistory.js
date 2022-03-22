import { Typography, message, List, Row, Col, Collapse, Pagination } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api"
import moment from "moment";

function OrderHistory (props) {
    const [orders, setOrders] = useState()    
    const [page, setPage] = useState(1)    
    const [total, setTotal] = useState()    

    useEffect(() => {
        getOrders(page)
    }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

    function getOrders (page) {
        let url = `${api.orders}/?customer=${props.user.id}`
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

    function getBonus (order) {
        let bonus = 0
        order.items.forEach(order_item => {
            bonus += (order_item.item.price / 100) * order.customer.level * order_item.item.multiplier * order_item.count
        })
        return bonus
    }

    return (
        <div>
            <div style={{ background: '#fff', borderRadius: '2px', padding: '24px' }}>        
                <Typography.Title level={4} style={{ margin: 0 }}>Захиалгын түүх</Typography.Title>            
            </div>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={orders}
                renderItem={order => (                           
                    <List.Item 
                        key={order.id}       
                        style={{ background: '#fff', padding: '0', marginTop: '16px' }}                 
                    >                            
                        <Collapse defaultActiveKey={ order.state === "1" ? [`${order.id}`] : undefined }>
                            <Collapse.Panel
                                key={order.id}
                                header={
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} sm={24} md={24} lg={12}>
                                            <Typography.Title level={5} style={{ margin: 0 }}>ЗАХИАЛГЫН ДУГААР: {order.ref}</Typography.Title>   
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={12} style={{ textAlign: 'right' }}>
                                            <Typography.Title level={5} style={{ margin: 0 }}>ТӨЛӨВ: {order.is_payed ? 'Төлбөр төлөгдсөн' : 'Захиалгыг хүлээж авсан'}</Typography.Title>
                                        </Col>
                                    </Row>
                                }
                                showArrow={false}                                
                            >
                                <Row gutter={[24, 24]}>
                                    <Col xs={24} sm={24} md={8}>
                                        <div style={{ marginBottom: '8px' }}>
                                            <Typography.Text style={{ fontWeight: 'bold' }}>Огноо: </Typography.Text>
                                            <Typography.Text>{moment(order.created_at).format("YYYY-MM-DD HH:MM")}</Typography.Text>
                                        </div>
                                        <div style={{ marginBottom: '8px' }}>
                                            <Typography.Text style={{ fontWeight: 'bold' }}>Утасны дугаар: </Typography.Text>
                                            <Typography.Text>{order.phone_number}</Typography.Text>
                                        </div>
                                        <div style={{ marginBottom: '8px' }}>
                                            <Typography.Text style={{ fontWeight: 'bold' }}>Хүргэлтийн хаяг: </Typography.Text>
                                            <Typography.Text>{order.address}</Typography.Text>
                                        </div>
                                    </Col>                                           
                                    <Col xs={24} sm={24} md={8}>
                                        <div style={{ marginBottom: '8px' }}>
                                            <Typography.Text style={{ fontWeight: 'bold' }}>Үнийн дүн: </Typography.Text>
                                            <Typography.Text>{formatNumber(order.total)}₮</Typography.Text>
                                        </div>
                                        <div style={{ marginBottom: '8px' }}>
                                            <Typography.Text style={{ fontWeight: 'bold' }}>Ашигласан бонус: </Typography.Text>
                                            <Typography.Text>{formatNumber(order.bonus)}₮</Typography.Text>
                                        </div>
                                        <div style={{ marginBottom: '8px' }}>
                                            <Typography.Text style={{ fontWeight: 'bold' }}>Төлөх дүн: </Typography.Text>
                                            <Typography.Text>{formatNumber(order.total - order.bonus)}₮</Typography.Text>
                                        </div>
                                        <div style={{ marginBottom: '8px' }}>
                                            <Typography.Text style={{ fontWeight: 'bold' }}>Урамшуулал: </Typography.Text>
                                            <Typography.Text style={{ fontWeight: 'bold' }}>+{formatNumber(getBonus(order))}₮</Typography.Text>
                                        </div>                                        
                                    </Col>
                                    <Col xs={24} sm={24} md={8}>                                                
                                        {order.items.map(item => {
                                            return (
                                                <div style={{ marginBottom: '8px' }}>
                                                    <Typography.Text style={{ fontWeight: 'bold' }}>{item.item.name} </Typography.Text>
                                                    <Typography.Text>- {item.count}ш</Typography.Text>
                                                </div>
                                            )
                                        })}                                                                                       
                                    </Col>                                                                                     
                                </Row>
                            </Collapse.Panel>
                        </Collapse>                                                                             
                    </List.Item>
                )}
            />    
            <Pagination
                current={page}
                total={total}
                pageSize={24}
                showSizeChanger={false}
                showTotal={false}         
                style={{ marginTop: '16px' }}       
                onChange={onPageChange}
            />          
        </div>
    )
}

export default OrderHistory