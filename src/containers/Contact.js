import { Row, Col, Typography, Breadcrumb } from 'antd'
import React from 'react'
import {    
    MailOutlined,
    EnvironmentOutlined,    
    PhoneOutlined,
    FacebookFilled,    
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Avatar from 'antd/lib/avatar/avatar';

function Contact () {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/">
                        Нүүр хуудас
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Холбогдох
                </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ marginTop: '24px', minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24} lg={8}>
                        <div style={{ padding: '16px', border: '2px solid black', borderRadius: '2px' }}>
                            <Typography.Title level={2}>Бидэнтэй холбогдох</Typography.Title>
                            <Typography.Text>
                                Та доор байрлах манай утасны дугаар болон цахим хаягуудад зурвас илгээн бидэнтэй холбогдох боломжтой бөгөөд мөн манай хаягаар ирж үйлчлүүлэх болон мэдээлэл авах боломжтой юм.
                            </Typography.Text>                        
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '16px' }}>
                                <div>
                                    <Avatar size={64} icon={<EnvironmentOutlined />} style={{ background: '#27ae60' }} />
                                </div>
                                <div style={{ marginLeft: '16px' }}>
                                    <Typography.Title level={5}>ХАЯГ</Typography.Title>
                                    <Typography.Text>ХУД 120 мянгат 1-р хороо Энхтайван хотхон 46А байр 1-р давхар ИРМҮҮН-АЗ эмийн сан, Улаанбаатар</Typography.Text>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '16px' }}>
                                <div>
                                    <Avatar size={64} icon={<PhoneOutlined />} style={{ background: '#2c3e50' }} />
                                </div>
                                <div style={{ marginLeft: '16px' }}>
                                    <Typography.Title level={5}>УТАС</Typography.Title>
                                    <Typography.Text style={{ fontSize: '16px' }}>7607-7722, 8080-2594</Typography.Text>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '16px' }}>
                                <div>
                                    <Avatar size={64} icon={<MailOutlined />} style={{ background: '#dd4b39' }} />
                                </div>
                                <div style={{ marginLeft: '16px' }}>
                                    <Typography.Title level={5}>И-МЭЙЛ</Typography.Title>
                                    <Typography.Text style={{ fontSize: '16px' }}><a href="mailto:info@dseabi.mn">info@dseabi.mn</a></Typography.Text>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '16px' }}>
                                <div>
                                    <Avatar size={64} icon={<FacebookFilled />} style={{ background: '#3B5998' }} />
                                </div>
                                <div style={{ marginLeft: '16px' }}>
                                    <Typography.Title level={5}>FACEBOOK</Typography.Title>
                                    <Typography.Text style={{ fontSize: '16px' }}>
                                        <a href="https://www.facebook.com/dseabi.mn">Dseabi Company</a>, 
                                        <a href="https://www.facebook.com/%D0%98%D1%80%D0%BC%D2%AF%D2%AF%D0%BD-%D0%B0%D0%B7-%D1%8D%D0%BC%D0%B8%D0%B9%D0%BD-%D1%81%D0%B0%D0%BD-581215945892542"> Ирмүүн аз эмийн сан</a>
                                    </Typography.Text>
                                </div>
                            </div>                        
                        </div>                    
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={16}>                    
                        <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1337.3252686079093!2d106.9093577552439!3d47.90444883155231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693b49ec74379%3A0xe56d5403e78b37b1!2sKhoroo%201%2C%20Ulaanbaatar!5e0!3m2!1sen!2smn!4v1624883166995!5m2!1sen!2smn" allowfullscreen="" loading="lazy" style={{ width: '100%', height: '400px', border: 0, marginTop: '8px' }}></iframe>
                    </Col>
                </Row>      
            </div>             
        </div>
    )
}

export default Contact