import { Row, Col, Typography, Breadcrumb, Avatar } from 'antd'
import React from 'react'
import {    
    MailOutlined,
    EnvironmentOutlined,    
    PhoneOutlined,
    FacebookFilled,    
} from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import * as translations from '../translation';
import { connect } from 'react-redux';

function Contact (props) {
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
                            <Typography.Title level={3}>{ props.language === "en" ? translations.en.contact.contact_us : translations.mn.contact.contact_us }</Typography.Title>
                            <Typography.Text>
                                Та доор байрлах манай утасны дугаар болон цахим хаягуудад зурвас илгээн бидэнтэй холбогдох боломжтой.
                            </Typography.Text>                        
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'start', marginTop: '16px' }}>
                                <div>
                                    <Avatar shape="square" size={48} icon={<EnvironmentOutlined />} style={{ background: '#27ae60' }} />
                                </div>
                                <div style={{ marginLeft: '16px' }}>
                                    <Typography.Title level={5}>{ props.language === "en" ? translations.en.footer.address : translations.mn.footer.address }</Typography.Title>
                                    <Typography.Text>{ props.language === "en" ? translations.en.footer.address_pharmacy : translations.mn.footer.address_pharmacy }</Typography.Text>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'start', marginTop: '16px' }}>
                                <div>
                                    <Avatar shape="square" size={48} icon={<PhoneOutlined />} style={{ background: '#2c3e50' }} />
                                </div>
                                <div style={{ marginLeft: '16px' }}>
                                    <Typography.Title level={5}>{ props.language === "en" ? translations.en.footer.phone_number : translations.mn.footer.phone_number }</Typography.Title>
                                    <Typography.Text style={{ fontSize: '16px' }}>1132-2817</Typography.Text>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'start', marginTop: '16px' }}>
                                <div>
                                    <Avatar shape="square" size={48} icon={<MailOutlined />} style={{ background: '#dd4b39' }} />
                                </div>
                                <div style={{ marginLeft: '16px' }}>
                                    <Typography.Title level={5}>{ props.language === "en" ? translations.en.contact.email : translations.mn.contact.email }</Typography.Title>
                                    <Typography.Text style={{ fontSize: '16px' }}><a href="mailto:info@dseabi.mn">info@dseabi.mn</a></Typography.Text>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'start', marginTop: '16px' }}>
                                <div>
                                    <Avatar shape="square" size={48} icon={<FacebookFilled />} style={{ background: '#3B5998' }} />
                                </div>
                                <div style={{ marginLeft: '16px' }}>
                                    <Typography.Title level={5}>{ props.language === "en" ? translations.en.contact.facebook : translations.mn.contact.facebook }</Typography.Title>
                                    <Typography.Text style={{ fontSize: '16px' }}>
                                        <a href="https://www.facebook.com/dseabi.mn">Dseabi Company</a>, 
                                        <a href="https://www.facebook.com/%D0%98%D1%80%D0%BC%D2%AF%D2%AF%D0%BD-%D0%B0%D0%B7-%D1%8D%D0%BC%D0%B8%D0%B9%D0%BD-%D1%81%D0%B0%D0%BD-581215945892542"> Ирмүүн аз эмийн сан</a>
                                    </Typography.Text>
                                </div>
                            </div>                        
                        </div>                    
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={16}>         
                        <div style={{ padding: '16px', border: '2px solid black', borderRadius: '2px' }}>
                            <Typography.Title level={3}>{ props.language === "en" ? translations.en.contact.location : translations.mn.contact.location }</Typography.Title>
                            <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d167.11517930905669!2d106.90271453211926!3d47.9200777454466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smn!4v1647676106245!5m2!1sen!2smn" allowfullscreen="" loading="lazy" style={{ width: '100%', height: 'auto', minHeight: '400px', border: 0, marginTop: '8px' }}></iframe>                            
                        </div>           
                    </Col>
                </Row>      
            </div>             
        </div>
    )
}

const mapStateToProps = state => {
    return {
        language: state.language
    }
}

export default withRouter(connect(mapStateToProps, null)(Contact));