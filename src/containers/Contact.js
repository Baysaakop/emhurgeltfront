import { Row, Col, Typography, Breadcrumb } from 'antd'
import React from 'react'
import {    
    MailOutlined,
    EnvironmentOutlined,
    FacebookOutlined,
    PhoneOutlined,    
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

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
            <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
                <Col xs={24} sm={24} md={24} lg={8}>
                    <div style={{ padding: '16px', border: '2px solid black', borderRadius: '5px' }}>
                        <Typography.Title level={3}>Бидэнтэй холбогдох</Typography.Title>
                        <Typography.Text>
                            Та доор байрлах манай утасны дугаар болон цахим хаягуудад зурвас илгээн бидэнтэй холбогдох боломжтой бөгөөд мөн манай хаягаар ирж үйлчлүүлэх болон мэдээлэл авах боломжтой юм.
                        </Typography.Text>
                        <p style={{ fontSize: '18px', marginTop: '16px' }}><PhoneOutlined /> 7607 7722</p>
                        <p style={{ fontSize: '18px', marginTop: '16px' }}><MailOutlined /><a href="mailto:info@dseabi.mn"> info@dseabi.mn</a></p>
                        <p style={{ fontSize: '18px', marginTop: '16px' }}><FacebookOutlined /><a href="https://www.facebook.com/%D0%98%D1%80%D0%BC%D2%AF%D2%AF%D0%BD-%D0%B0%D0%B7-%D1%8D%D0%BC%D0%B8%D0%B9%D0%BD-%D1%81%D0%B0%D0%BD-581215945892542/?__cft__[0]=AZU43GdZcxr06phW2DrhKYw4gf4nHJwTDHarpq0hDBLuYAGgTDviyd9VIjLc66_9i1WNmV2LVQ9ioDFz73CA01onW_D8AwNqbQFGzeKbxocBGkbmCivitK_rer1CTKp1W2Wp-IGnjhSk1tkgYYC1bs1YR64xpFu5cyxlTT8HaJrAiA&__tn__=-UC%2CP-R"> Ирмүүн аз эмийн сан</a></p>
                        <p style={{ fontSize: '18px', marginTop: '16px' }}><EnvironmentOutlined /> ХУД 120 мянгат 1-р хороо Энхтайван хотхон 46А байр 1-р давхар ИРМҮҮН-АЗ эмийн сан, Улаанбаатар, Монгол</p>
                    </div>                    
                </Col>
                <Col xs={24} sm={24} md={24} lg={16}>                    
                    <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1337.3252686079093!2d106.9093577552439!3d47.90444883155231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693b49ec74379%3A0xe56d5403e78b37b1!2sKhoroo%201%2C%20Ulaanbaatar!5e0!3m2!1sen!2smn!4v1624883166995!5m2!1sen!2smn" allowfullscreen="" loading="lazy" style={{ width: '100%', height: '400px', border: 0, marginTop: '8px' }}></iframe>
                </Col>
            </Row>                   
        </div>
    )
}

export default Contact