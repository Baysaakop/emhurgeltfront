import { Typography, message, Row, Col, Collapse, Pagination, Divider, Avatar, Button, Spin } from "antd"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import api from "../api"
import moment from "moment";
import { CheckOutlined, ClockCircleOutlined, FilePdfOutlined, LoadingOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function OrderHistory (props) {
    const printRef = useRef()
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState()    
    const [page, setPage] = useState(1)    
    const [total, setTotal] = useState()    

    useEffect(() => {
        getOrders(page)
    }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

    function getOrders (page) {
        setLoading(true)
        let url = `${api.orders}/?customer=${props.user.id}`
        url += `&page=${page}`    
        axios({
            method: 'GET',
            url: url           
        }).then(res => {                                    
            setOrders(res.data.results)          
            setTotal(res.data.count)
            setLoading(false)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
            setLoading(false)
        })
    }

    function onPageChange (pageNum, pageSize) {        
        setPage(pageNum)
    }
    
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    // function onChangeOrder() {
    //     printRef.current = 
    // }

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    return (
        <div style={{ background: '#fff', borderRadius: '2px', padding: '24px' }}>       
            <Typography.Title level={4} style={{ margin: 0 }}>Захиалгын түүх</Typography.Title>            
            <Divider /> 
            { loading ? (
                <div style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin indicator={loadingIcon} />
                </div>
            ) : orders ? (
                <Collapse accordion >
                    {orders.map(order => (
                        <Collapse.Panel                             
                            key={order.id}
                            showArrow={false}
                            header={
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <Typography.Title level={5} style={{ margin: 0 }}>ЗАХИАЛГЫН ДУГААР: {order.ref}</Typography.Title>   
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} style={{ textAlign: 'right' }}>
                                        {order.is_payed ? (
                                            <Typography.Title level={5} style={{ margin: 0 }}>ТӨЛӨВ: Төлбөр төлөгдсөн <Avatar size="small" icon={<CheckOutlined />} style={{ background: '#2ecc71' }} /></Typography.Title>
                                        ) : (
                                            <Typography.Title level={5} style={{ margin: 0 }}>ТӨЛӨВ: Хүлээж авсан <Avatar size="small" icon={<ClockCircleOutlined />} style={{ background: '#4834d4' }} /></Typography.Title>
                                        )}                                            
                                    </Col>
                                </Row>
                            }                                                                            
                        >
                            <div ref={printRef} style={{ padding: '8px' }}>
                                <Row gutter={[24, 24]}>
                                    <Col span={6}>
                                        <Typography.Title level={5}>Захиалгын мэдээлэл:</Typography.Title>
                                        <div style={{ marginBottom: '8px' }}>
                                            <Typography.Text>Захиалгын дугаар: {order.ref}</Typography.Text>                                        
                                        </div>
                                        <div style={{ marginBottom: '8px' }}>
                                            <Typography.Text>Огноо: {moment(order.created_at).format("YYYY-MM-DD HH:MM")}</Typography.Text>                                        
                                        </div>
                                        <div style={{ marginBottom: '8px' }}>                                        
                                            <Typography.Text>Утасны дугаар: {order.phone_number}</Typography.Text>
                                        </div>
                                        <div style={{ marginBottom: '8px' }}>                                        
                                            <Typography.Text>Хүргэлтийн хаяг: {order.address}</Typography.Text>
                                        </div>
                                    </Col>                                           
                                    <Col span={6}>
                                        <Typography.Title level={5}>Төлбөрийн мэдээлэл:</Typography.Title>
                                        <div style={{ marginBottom: '8px' }}>                                        
                                            <Typography.Text>Үнийн дүн: {formatNumber(order.total)}₮</Typography.Text>
                                        </div>
                                        <div style={{ marginBottom: '8px' }}>                                        
                                            <Typography.Text>Ашигласан бонус: {formatNumber(order.bonus_used)}₮</Typography.Text>
                                        </div>
                                        <div style={{ marginBottom: '8px' }}>                                        
                                            <Typography.Text>Төлөх дүн: {formatNumber(order.total - order.bonus_used)}₮</Typography.Text>
                                        </div>
                                        <div style={{ marginBottom: '8px' }}>                                        
                                            <Typography.Text style={{ fontWeight: 'bold' }}>Урамшуулал: +{formatNumber(order.bonus_granted)}₮</Typography.Text>
                                        </div>                                        
                                    </Col>
                                    <Col span={6}>                
                                        <Typography.Title level={5}>Бүтээгдэхүүнүүд:</Typography.Title>                                
                                        {order.items.map(item => {
                                            return (
                                                <div style={{ marginBottom: '8px' }}>                                                
                                                    <Typography.Text>{item.item.name} - {item.count}ш</Typography.Text>
                                                </div>
                                            )
                                        })}                                                                                       
                                    </Col>                                      
                                    <Col span={6}>             
                                        <Typography.Title level={5}>Захиалгын төлөв:</Typography.Title>       
                                        {order.is_payed ? (
                                            <div style={{ textAlign: 'center'}}>
                                                <Avatar size={48} icon={<CheckOutlined />} style={{ background: '#2ecc71', margin: '16px 0'  }} />
                                                <Typography.Title level={5}>Төлбөр төлөгдсөн</Typography.Title>
                                            </div>                                        
                                        ) : (
                                            <div style={{ textAlign: 'center'}}>
                                                <Avatar size={48} icon={<ClockCircleOutlined />} style={{ background: '#4834d4', margin: '16px 0'  }} />
                                                <Typography.Title level={5}>Хүлээж авсан</Typography.Title>
                                            </div>                                           
                                        )}       
                                    </Col>          
                                </Row>
                            </div>
                            <Button icon={<FilePdfOutlined />} onClick={handlePrint}>Татаж авах</Button>
                        </Collapse.Panel>
                    ))}
                </Collapse>
            ) : <></>}            
            <Pagination
                current={page}
                total={total}
                pageSize={24}
                showSizeChanger={false}
                showTotal={false}      
                size="small"   
                style={{ marginTop: '16px' }}       
                onChange={onPageChange}
            />          
        </div>
    )
}

export default OrderHistory