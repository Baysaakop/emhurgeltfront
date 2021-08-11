import { Typography, message, List, Row, Col, Result, Collapse } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api"
import moment from "moment";
import { CarOutlined, CheckCircleFilled, CloseCircleFilled, CreditCardOutlined, HourglassOutlined } from "@ant-design/icons";

function OrderHistory (props) {
    const [orders, setOrders] = useState()    
    const [page, setPage] = useState(1)    
    const [total, setTotal] = useState()    

    useEffect(() => {
        getOrders(page)
    }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

    function getOrders (page) {
        let url = `${api.orders}/?user=${props.user.id}`
        url += `&page=${page}`    
        axios({
            method: 'GET',
            url: url           
        }).then(res => {                        
            console.log(res.data.results)
            setOrders(res.data.results)          
            setTotal(res.data.count)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }
    
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    function getState (state) {
        if (state === "1") {
            return <span>ТӨЛБӨР ТӨЛӨХ {<CreditCardOutlined />}</span>
        } else if (state === "2") {
            return <span>ХҮЛЭЭЖ АВСАН {<HourglassOutlined />}</span>
        } else if (state === "3") {
            return <span>ХҮРГЭЛТЭНД ГАРСАН {<CarOutlined />}</span>
        } else if (state === "4") {
            return <span>ХҮРГЭГДСЭН {<CheckCircleFilled style={{ color: '#52c41a' }} />}</span>
        } else if (state === "5") {
            return <span>ЦУЦЛАГДСАН {<CloseCircleFilled style={{ color: '#ff4d4f' }} />}</span>
        } else {
            return "ТОДОРХОЙГҮЙ"
        }
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
                        style={{ background: '#fff', borderRadius: '2px', padding: '24px', marginTop: '24px' }}                 
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
                                            <Typography.Title level={5} style={{ margin: 0 }}>ТӨЛӨВ: {getState(order.state)}</Typography.Title>
                                        </Col>
                                    </Row>
                                }
                                showArrow={false}                                
                            >
                                <Row gutter={[24, 24]}>
                                    <Col xs={24} sm={24} md={24} lg={16}>                                
                                        <Typography.Title level={5}>{`ЗАХИАЛГЫН ДУГААР: ${order.ref}`}</Typography.Title>
                                        <Row gutter={[16, 16]}>
                                            <Col xs={24} sm={24} md={12}>
                                                <br />
                                                <Typography.Text>ОГНОО: {moment(order.created_at).format("YYYY-MM-DD HH:MM")}</Typography.Text>
                                                <br /><br />
                                                <Typography.Text>ҮНИЙН ДҮН: {formatNumber(order.total)}₮</Typography.Text>
                                                <br /><br />
                                                <Typography.Text>УТАСНЫ ДУГААР: {order.phone_number}</Typography.Text>
                                            </Col>
                                            <Col xs={24} sm={24} md={12}>
                                                <br />
                                                <Typography.Text>ХҮРГЭЛТИЙН ХАЯГ: {order.address}</Typography.Text>
                                                <br /><br />
                                                <Typography.Text>НЭМЭЛТ МЭДЭЭЛЭЛ: {order.info}</Typography.Text>
                                            </Col>
                                        </Row>            
                                        <List
                                            grid={{
                                                gutter: 16,
                                                xs: 3,
                                                sm: 4,
                                                md: 5,
                                                lg: 5,
                                                xl: 6,
                                                xxl: 8,
                                            }}
                                            style={{ marginTop: '16px' }}
                                            dataSource={order.items}
                                            renderItem={item => (
                                                <List.Item style={{ width: '100%', padding: 0 }}>
                                                    <div style={{ paddingTop: '100%', position: 'relative' }}>
                                                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', border: '1px solid #dedede', borderRadius: '2px' }}>
                                                            <img 
                                                                alt={item.item.name} 
                                                                src={item.item.images.length > 0 ? item.item.images[0].image : "https://epharmacy-bucket.s3.ap-northeast-1.amazonaws.com/static/blank.jpg"} 
                                                                style={{ width: '90%', height: '90%', objectFit: 'scale-down' }} 
                                                            /> 
                                                        </div>   
                                                    </div>
                                                </List.Item>
                                            )}
                                        />
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={8}>
                                    { order.state === "1" ? (
                                        <div>
                                            <Typography.Title level={5}>ТӨЛБӨР ТӨЛӨХ</Typography.Title>
                                            <br />
                                            <Typography.Text>АШИГЛАСАН ОНОО: <strong>{order.bonus}₮</strong></Typography.Text>
                                            <br />
                                            <Typography.Text>ТӨЛӨХ ДҮН: <strong>{formatNumber(order.total - order.bonus)}₮</strong></Typography.Text>
                                            <br />
                                            <Typography.Text>ГҮЙЛГЭЭНИЙ УТГА: <strong>{order.ref}</strong></Typography.Text>                                                                        
                                            <br /><br />
                                            <Typography.Text>ХААН БАНК: <strong>5454545454</strong> (Хүлээн авагч: <strong>Ирмүүн Аз</strong>)</Typography.Text>     
                                            <br /><br />
                                            <Typography.Text>ХУДАЛДАА ХӨГЖЛИЙН БАНК: <strong>456456456</strong> (Хүлээн авагч: <strong>Ирмүүн Аз</strong>)</Typography.Text>                                                                       
                                        </div>
                                    ) : order.state === "2" ? (
                                        <div>
                                            <Typography.Title level={5}>ТӨЛӨВ:</Typography.Title>
                                            <Result icon={<HourglassOutlined style={{ color: '#C2B280' }} />} title="ХҮЛЭЭЖ АВСАН" />                                    
                                        </div>
                                    ) : order.state === "3" ? (
                                        <div>
                                            <Typography.Title level={5}>ТӨЛӨВ:</Typography.Title>
                                            <Result icon={<CarOutlined style={{ color: '#2d3436' }} />} title="ХҮРГЭЛТЭНД ГАРСАН" />                                    
                                        </div>
                                    ) : order.state === "4" ? (
                                        <div>
                                            <Typography.Title level={5}>ТӨЛӨВ:</Typography.Title>
                                            <Result status="success" title="ХҮРГЭГДСЭН" />         
                                        </div>
                                    ) : (
                                        <div>
                                            <Typography.Title level={5}>ТӨЛӨВ:</Typography.Title>
                                            <Result status="error" title="ЦУЦЛАГДСАН" />                                         
                                        </div>
                                    )}
                                    </Col>
                                </Row>
                            </Collapse.Panel>
                        </Collapse>                                                                             
                    </List.Item>
                )}
            />              
        </div>
    )
}

export default OrderHistory