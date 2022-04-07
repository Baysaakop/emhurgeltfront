import { CarOutlined, FilePdfOutlined, WarningOutlined } from "@ant-design/icons"
import { Avatar, Button, Col, Divider, Empty, message, Result, Row, Spin, Table, Typography } from "antd"
import axios from "axios"
import { useState, useEffect, useRef } from "react"
import api from "../api"
import moment from 'moment'
import { useReactToPrint } from "react-to-print";

function OrderDetail (props) {
    const printRef = useRef()
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState()    

    useEffect(() => {
        if (!order) {
            getOrder()
        }        
    }, [props.match.params.id]) // eslint-disable-line react-hooks/exhaustive-deps    

    function getOrder () {
        setLoading(true)
        axios({
            method: 'GET',
            url: `${api.orders}/${props.match.params.id}/`,            
        }).then(res => {                    
            console.log(res.data)  
            setOrder(res.data)            
            setLoading(false)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
            setLoading(false)
        })                
    }

    function getState() {
        if (order.is_payed) {
            return "Төлбөр төлөгдсөн"
        } else if (order.is_delivered) {
            return "Төлбөр хүлээгдэж буй"
        } else {
            return "Хүлээж авсан"
        }
    }

    function getTotalPerItem(id) {
        let item = order.items.find(x => x.id === id)
        return item.item.price * item.count
    }

    function formatNumber(num) {
        return parseInt(num).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }    

    const columns = [
        {
            title: 'Бүтээгдэхүүн',
            dataIndex: 'item',
            key: 'item',            
            render: (item) => <a href={`/products/${item.id}`}>{item.name}</a>
        },
        {
            title: 'Үнэ',
            dataIndex: 'item',
            key: 'item',            
            render: (item) => <Typography.Text>{formatNumber(item.price)}₮</Typography.Text>
        },
        {
            title: 'Тоо ширхэг',
            dataIndex: 'count',
            key: 'count'            
        },
        {
            title: 'Нийт',
            dataIndex: 'id',
            key: 'id',
            render: (id) => <Typography.Text>{formatNumber(getTotalPerItem(id))}₮</Typography.Text>            
        },
    ];

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    return (
        <div>
            { loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <Spin tip="Уншиж байна..." />
                </div>
            ) : order ? (
                <div style={{ background: '#fff', padding: '24px', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <Typography.Title level={4} style={{ margin: 0 }}>Захиалгын дугаар: {order.ref}</Typography.Title>
                        </div>
                        <div>
                            <Typography.Title level={4} style={{ margin: 0 }}>Төлөв: {getState()}</Typography.Title>
                        </div>
                    </div>
                    <div style={{ margin: '16px 0', border: '1px solid #d1d1d1' }}>                                        
                        <div ref={printRef} style={{ padding: '16px' }}>
                            <Row gutter={[24, 24]}>
                                <Col xs={24} sm={24} md={24} lg={16}>         
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="logo" style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'center' }}>                            
                                            <div>
                                                <Avatar size={48} src="/logo.png" style={{ marginRight: '4px' }} />
                                            </div>
                                            <div>                                    
                                                <div style={{ margin: 0, fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '24px', color: '#000' }}>DSEABI LLC</div>                       
                                                <div style={{ margin: 0, color: '#4c4c4c', fontSize: '14px', marginTop: '-8px' }}>                                            
                                                    Эм ханган нийлүүлэх төв
                                                </div>       
                                            </div>                                                                                                                                   
                                        </div>            
                                        <div>
                                            <Typography.Title level={5}>Ди Эс И Эй Би Ай ХХК</Typography.Title>
                                        </div>
                                    </div>
                                    <Divider style={{ margin: '12px 0' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <div>
                                            <div>
                                                Захиалагч тал: {order.customer.company_name}
                                            </div>
                                            <div>
                                                Утасны дугаар: {order.phone_number}
                                            </div>
                                        </div>
                                        <div>
                                            <div>Хүргэлтийн хаяг: {order.address}</div>
                                            <div>Захиалгын огноо: {moment(order.created_at).format("YYYY оны MM сарын DD")}</div>
                                        </div>
                                    </div>                            
                                    <Table bordered columns={columns} dataSource={order.items} pagination={false} />
                                    <div style={{ textAlign: 'end', marginTop: '8px' }}>
                                        <Typography.Text style={{ display: 'block', fontSize: '16px' }}>Нийт: {formatNumber(order.total)}₮</Typography.Text>
                                        <Typography.Text style={{ display: 'block', fontSize: '16px' }}>Ашигласан бонус: {formatNumber(order.bonus_used)}₮</Typography.Text>
                                        <Typography.Text style={{ display: 'block', fontSize: '16px', fontWeight: 'bold' }}>Төлөх дүн: {formatNumber(order.total - order.bonus_used)}₮</Typography.Text>
                                        <Typography.Text style={{ display: 'block', fontSize: '16px' }}>НӨАТ: {formatNumber((order.total - order.bonus_used) / 11)}₮</Typography.Text>
                                        <Typography.Text style={{ display: 'block', fontSize: '16px' }}>НӨАТ-гүй үнэ: {formatNumber(order.total - order.bonus_used - (order.total - order.bonus_used) / 11)}₮</Typography.Text>
                                        { order.is_payed ? (
                                            <Typography.Text type="success" style={{ display: 'block', fontSize: '16px' }}>БОНУС: {formatNumber(order.bonus_granted)}₮</Typography.Text>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={8}>
                                    { order.is_payed ? (
                                        <Result
                                            status="success"
                                            title="Төлбөр төлөгдсөн"
                                            subTitle="Захиалга амжилттай хүргэгдсэн байна."
                                        />
                                    ) : order.is_delivered ? (
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                <Button block danger icon={<WarningOutlined />} type="ghost">Төлбөр төлөгдөөгүй</Button>
                                                <Button block icon={<CarOutlined />} type="ghost" style={{ marginLeft: '8px' }}>Хүргэлт хийгдсэн</Button>
                                            </div>                                    
                                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                                <div style={{ width: '100px' }}>
                                                    <img src="/khanbank.jpg" alt="khanbank" style={{ width: '100%', height: 'auto' }} />
                                                </div>
                                                <div style={{ fontSize: '16px' }}>
                                                    <div>Банк: Хаан Банк</div>
                                                    <div>Дансны дугаар: 5219166940</div>
                                                    <div>Хүлээн авагч: ДИ ЭС И ЭЙ БИ АЙ</div>
                                                    <div>Төлбөр: {formatNumber(order.total - order.bonus_used)}₮</div>
                                                    <div>Гүйлгээний утга: <strong>{order.ref}</strong></div>
                                                </div>
                                            </div>
                                            <Divider />
                                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                                <div style={{ width: '100px' }}>
                                                    <img src="/tdb.jpg" alt="khanbank" style={{ width: '100%', height: 'auto' }} />
                                                </div>
                                                <div style={{ fontSize: '16px' }}>
                                                    <div>Банк: Худалдаа Хөгжлийн Банк</div>
                                                    <div>Дансны дугаар: 472037839</div>
                                                    <div>Хүлээн авагч: ДИ ЭС И ЭЙ БИ АЙ</div>
                                                    <div>Төлбөр: {formatNumber(order.total - order.bonus_used)}₮</div>
                                                    <div>Гүйлгээний утга: <strong>{order.ref}</strong></div>
                                                </div>
                                            </div>
                                            <div style={{ background: '#f1f1f1', padding: '8px', marginTop: '8px' }}>
                                                <Typography.Title level={5} style={{ margin: 0 }}>Санамж:</Typography.Title>
                                                <Typography.Text>Та төлбөрөө дээрх 2 данснаас сонгон шилжүүлэх боломжтой бөгөөд гүйлгээний утга хэсэгт захиалгын <strong>{order.ref}</strong> дугаарыг бичин шилжүүлээрэй.</Typography.Text>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <Button block danger icon={<WarningOutlined />} type="ghost">Төлбөр төлөгдөөгүй</Button>                                 
                                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '8px' }}>
                                                <div style={{ width: '100px' }}>
                                                    <img src="/khanbank.jpg" alt="khanbank" style={{ width: '100%', height: 'auto' }} />
                                                </div>
                                                <div style={{ fontSize: '16px' }}>
                                                    <div>Банк: Хаан Банк</div>
                                                    <div>Дансны дугаар: 5219166940</div>
                                                    <div>Хүлээн авагч: ДИ ЭС И ЭЙ БИ АЙ</div>
                                                    <div>Төлбөр: {formatNumber(order.total - order.bonus_used)}₮</div>
                                                    <div>Гүйлгээний утга: <strong>{order.ref}</strong></div>
                                                </div>
                                            </div>
                                            <Divider />
                                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                                <div style={{ width: '100px' }}>
                                                    <img src="/tdb.jpg" alt="khanbank" style={{ width: '100%', height: 'auto' }} />
                                                </div>
                                                <div style={{ fontSize: '16px' }}>
                                                    <div>Банк: Худалдаа Хөгжлийн Банк</div>
                                                    <div>Дансны дугаар: 472037839</div>
                                                    <div>Хүлээн авагч: ДИ ЭС И ЭЙ БИ АЙ</div>
                                                    <div>Төлбөр: {formatNumber(order.total - order.bonus_used)}₮</div>
                                                    <div>Гүйлгээний утга: <strong>{order.ref}</strong></div>
                                                </div>
                                            </div>
                                            <div style={{ background: '#f1f1f1', padding: '8px 16px', marginTop: '8px' }}>
                                                <Typography.Title level={5} style={{ margin: 0 }}>Санамж:</Typography.Title>
                                                <Typography.Text>Та төлбөрөө дээрх 2 данснаас сонгон шилжүүлэх боломжтой бөгөөд гүйлгээний утга хэсэгт захиалгын <strong>{order.ref}</strong> дугаарыг бичин шилжүүлээрэй.</Typography.Text>
                                            </div>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <Button icon={<FilePdfOutlined />} onClick={handlePrint}>Татаж авах</Button>
                </div>
            ) :  (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
        </div>
    )
}

export default OrderDetail