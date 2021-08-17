import React from 'react';
import { Grid, Button, Typography, Row, Col, Avatar } from 'antd';
import { FacebookFilled, GoogleOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';
import logo from './logo.png'
import * as translations from '../translation';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const { useBreakpoint } = Grid;

function CustomFooter (props) {

    const screens = useBreakpoint()

    return (
        <div>
            <div style={ screens.lg ? { padding: '24px 10%' } : { padding: '24px 5%' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={8}>
                        <div className="logo" style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'center', marginBottom: '8px' }}>                            
                            <div>
                                <Avatar size={48} src={logo} style={{ marginRight: '4px' }} />
                            </div>
                            <div>                                    
                                <div style={{ margin: 0, fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '24px', color: '#000' }}>emhurgelt.mn</div>                       
                                <div style={{ margin: 0, color: '#8e8e8e', fontSize: '14px', marginTop: '-8px' }}>
                                { props.language === "en" ? translations.en.header.irmuun_az_pharmacy : translations.mn.header.irmuun_az_pharmacy }
                                </div>       
                            </div>                                                                                                                                   
                        </div>
                        <Typography.Title level={5}>{ props.language === "en" ? translations.en.footer.address : translations.mn.footer.address }</Typography.Title>
                        <Typography.Text>{ props.language === "en" ? translations.en.footer.address_pharmacy : translations.mn.footer.address_pharmacy }</Typography.Text>
                        <Typography.Title level={5}>{ props.language === "en" ? translations.en.footer.phone_number : translations.mn.footer.phone_number }</Typography.Title>
                        <Typography.Text style={{ fontSize: '16px' }}>7607-7722, 8080-2594</Typography.Text>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <Typography.Title level={4}>{ props.language === "en" ? translations.en.footer.main_menu : translations.mn.footer.main_menu }</Typography.Title>                            
                        <Button href="/" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>{ props.language === "en" ? translations.en.footer.home_page : translations.mn.footer.home_page }</Button><br/>
                        <Button href="/brandproducts" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>{ props.language === "en" ? translations.en.header.featured_products : translations.mn.header.featured_products }</Button><br/>
                        <Button href="/about" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>{ props.language === "en" ? translations.en.header.about_us : translations.mn.header.about_us }</Button><br/>
                        <Button href="/products" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>{ props.language === "en" ? translations.en.header.pharmacy : translations.mn.header.pharmacy }</Button><br/>
                        <Button href="/posts" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>{ props.language === "en" ? translations.en.header.blog : translations.mn.header.blog }</Button><br/>
                        <Button href="/contact" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>{ props.language === "en" ? translations.en.header.contact : translations.mn.header.contact }</Button><br/>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <Typography.Title level={4}>{ props.language === "en" ? translations.en.footer.categories : translations.mn.footer.categories }</Typography.Title>                            
                        <Button href="/products" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>Эмнэлгийн хэрэгсэл</Button><br/>
                        <Button href="/products" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>Гоо сайхан</Button><br/>
                        <Button href="/products" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>Витамин</Button><br/>
                        <Button href="/products" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>Хүүхэд</Button><br/>
                        <Button href="/products" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>Хүнс</Button><br/>
                        <Button href="/products" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>Ковид 19</Button><br/>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={4}>
                        <Typography.Title level={4}>{ props.language === "en" ? translations.en.footer.social_channels : translations.mn.footer.social_channels }</Typography.Title>
                        <a href="https://www.facebook.com/%D0%98%D1%80%D0%BC%D2%AF%D2%AF%D0%BD-%D0%B0%D0%B7-%D1%8D%D0%BC%D0%B8%D0%B9%D0%BD-%D1%81%D0%B0%D0%BD-581215945892542">
                            <div style={{ marginTop: '8px' }}>
                                <Button size="large" type="primary" style={{ background: '#3B5998', paddingTop: '4px' }} icon={<FacebookFilled />} /> 
                                <Typography.Text style={{ fontSize: '16px', fontWeight: 'bold', marginLeft: '8px' }}> Facebook</Typography.Text>
                            </div>       
                        </a>  
                        <a href="/">
                            <div style={{ marginTop: '8px' }}>
                                <Button size="large" type="primary" style={{ background: '#bb0000', paddingTop: '4px' }} icon={<YoutubeOutlined />} /> 
                                <Typography.Text style={{ fontSize: '16px', fontWeight: 'bold', marginLeft: '8px' }}> YouTube</Typography.Text>
                            </div>  
                        </a>          
                        <a href="/">
                            <div style={{ marginTop: '8px' }}>
                                <Button size="large" type="primary" style={{ background: '#125688', paddingTop: '4px' }} icon={<InstagramOutlined />} /> 
                                <Typography.Text style={{ fontSize: '16px', fontWeight: 'bold', marginLeft: '8px' }}> Instagram</Typography.Text>
                            </div>   
                        </a>    
                        <a href="mailto:info@dseabi.mn">     
                            <div style={{ marginTop: '8px' }}>
                                <Button size="large" type="primary" style={{ background: '#dd4b39', paddingTop: '4px' }} icon={<GoogleOutlined />} /> 
                                <Typography.Text style={{ fontSize: '16px', fontWeight: 'bold', marginLeft: '8px' }}> Gmail</Typography.Text>
                            </div>    
                        </a>
                    </Col>
                </Row>                                                   
            </div>                         
            <div style={ screens.lg ? { padding: '8px 10%', borderTop: '1px solid #dedede', background: '#f0f2f5' } : { padding: '8px 5%', borderTop: '1px solid #dedede', background: '#f0f2f5' }}>
                <Typography.Text style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    © 2021 { props.language === "en" ? translations.en.header.dseabi_llc : translations.mn.header.dseabi_llc }. { props.language === "en" ? translations.en.footer.all_rights_reserved : translations.mn.footer.all_rights_reserved }.</Typography.Text>                            
            </div> 
        </div>
    )
}

const mapStateToProps = state => {
    return {
        language: state.language
    }
}

export default withRouter(connect(mapStateToProps, null)(CustomFooter));