import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Typography } from 'antd';
import React from 'react'

function Payment (props) {

    function getAmount(cartitems) {
        let total = 0
        cartitems.forEach(element => {
            total += element.item.price * element.count
        });        
        return total
    }

    function order () {        
        props.next()
    }

    return (
        <div style={{ margin: '0 16px' }}>
            <Row gutter={[16, 16]} >
                <Col xs={24} sm={24} md={24} lg={12}>
                    <div style={{ border: '1px solid #dedede', padding: '16px' }}>
                        { props.items.map(item => {
                            return (
                                <Row gutter={[8, 8]}>
                                    <Col span={16}>
                                        {item.item.name}
                                    </Col>
                                    <Col span={2}>
                                        {item.count}ш
                                    </Col>
                                    <Col span={6} style={{ textAlign: 'end' }}>
                                        {item.item.price * item.count}₮
                                    </Col>
                                </Row>
                            )                            
                        })}              
                        <Divider />                
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div> 
                                <Typography.Title level={5}>Нийт дүн</Typography.Title>                               
                            </div>                            
                            <div>
                                <Typography.Title level={5}>{getAmount(props.items)}₮</Typography.Title>
                            </div>
                        </div>                  
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <div style={{ border: '1px solid #dedede', padding: '16px' }}>
                        <Typography.Title level={5}>Төлбөр шилжүүлэх данс:</Typography.Title>
                        <p>Хаан банк: 5412231123 (Хүлээн авагч: ИрмүүнАз)</p>
                        <p>Худалдаа хөгжлийн банк: 434567765 (Хүлээн авагч: ИрмүүнАз)</p>
                        <p>Гүйлгээний утга: Нэр Утасны дугаар</p>
                    </div>
                </Col>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button type="primary" icon={<DoubleLeftOutlined />} style={{ marginTop: '8px' }} onClick={() => props.prev()}>Буцах</Button>            
                <Button type="primary" icon={<DoubleRightOutlined />} style={{ marginTop: '8px' }} onClick={order}>Захиалах</Button>            
            </div>
        </div>
    )
}

export default Payment;