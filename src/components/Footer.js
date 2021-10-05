import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Row, Col, Avatar, message } from 'antd';
import { FacebookFilled, GoogleOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';
import logo from './logo.png'
import * as translations from '../translation';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import api from '../api';

const { useBreakpoint } = Grid;

function CustomFooter (props) {

    const screens = useBreakpoint()
    const [types, setTypes] = useState()  

    useEffect(() => {
        getTypes()        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getTypes() {
        let url = `${api.types}/`         
        axios({
            method: 'GET',
            url: url           
        }).then(res => {                        
            setTypes(res.data.results)                      
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }

    return (
        <div>
            <div style={ screens.xxl ? { padding: '24px 12%' } : screens.xl ? { padding: '24px 8%' } : { padding: '24px' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={8}>
                        <div className="logo" style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'center', marginBottom: '8px' }}>                            
                            <div>
                                <Avatar size={48} src={logo} style={{ marginRight: '4px' }} />
                            </div>
                            <div>                                    
                                <div style={{ margin: 0, fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '24px', color: '#000' }}>emhurgelt.mn</div>                       
                                <div style={{ margin: 0, color: '#4c4c4c', fontSize: '14px', marginTop: '-8px' }}>
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
                        <Button href="/" block type="text" style={{ color: '#4c4c4c', textAlign: 'left' }}>
                            <Typography.Paragraph ellipsis={true} style={{ margin: 0, padding: 0 }}>
                            { props.language === "en" ? translations.en.footer.home_page : translations.mn.footer.home_page }
                            </Typography.Paragraph>
                        </Button>                        
                        <Button href="/about" block type="text" style={{ color: '#4c4c4c', textAlign: 'left' }}>
                            <Typography.Paragraph ellipsis={true} style={{ margin: 0, padding: 0 }}>
                                { props.language === "en" ? translations.en.header.about_us : translations.mn.header.about_us }
                            </Typography.Paragraph>
                        </Button>
                        <Button href="/brandproducts" block type="text" style={{ color: '#4c4c4c', textAlign: 'left' }}>
                            <Typography.Paragraph ellipsis={true} style={{ margin: 0, padding: 0 }}>
                            { props.language === "en" ? translations.en.header.featured_products : translations.mn.header.featured_products }
                            </Typography.Paragraph>
                        </Button>
                        <Button href="/products" block type="text" style={{ color: '#4c4c4c', textAlign: 'left' }}>
                            <Typography.Paragraph ellipsis={true} style={{ margin: 0, padding: 0 }}>
                                { props.language === "en" ? translations.en.header.pharmacy : translations.mn.header.pharmacy }
                            </Typography.Paragraph>
                        </Button>
                        <Button href="/posts" block type="text" style={{ color: '#4c4c4c', textAlign: 'left' }}>
                            <Typography.Paragraph ellipsis={true} style={{ margin: 0, padding: 0 }}>
                                { props.language === "en" ? translations.en.header.blog : translations.mn.header.blog }
                            </Typography.Paragraph>
                        </Button>
                        <Button href="/contact" block type="text" style={{ color: '#4c4c4c', textAlign: 'left' }}>
                            <Typography.Paragraph ellipsis={true} style={{ margin: 0, padding: 0 }}>
                                { props.language === "en" ? translations.en.header.contact : translations.mn.header.contact }
                            </Typography.Paragraph>
                        </Button>
                        <Button href="/bonus" block type="text" style={{ color: '#4c4c4c', textAlign: 'left' }}>
                            <Typography.Paragraph ellipsis={true} style={{ margin: 0, padding: 0 }}>
                                { props.language === "en" ? translations.en.header.bonus : translations.mn.header.bonus }
                            </Typography.Paragraph>
                        </Button>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <Typography.Title level={4}>{ props.language === "en" ? translations.en.footer.categories : translations.mn.footer.categories }</Typography.Title>                            
                        {types ? types.map(t => (
                            <Button key={t.id} href={`/products?type=${t.id}`} block type="text" style={{ color: '#4c4c4c', textAlign: 'left', margin: 0 }}>
                                <Typography.Paragraph ellipsis={true} style={{ margin: 0, padding: 0 }}>
                                    { props.language === "en" ? t.name_en : t.name }
                                </Typography.Paragraph>
                            </Button>   
                        )) : []}                        
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
            <div style={ screens.xxl ? { padding: '8px 12%', borderTop: '1px solid #dedede', background: '#f0f2f5' } : screens.xl ? { padding: '8px 8%', borderTop: '1px solid #dedede', background: '#f0f2f5' } : { padding: '8px', borderTop: '1px solid #dedede', background: '#f0f2f5' }}>
                <Typography.Text style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    © 2021 { props.language === "en" ? translations.en.header.dseabi_llc : translations.mn.header.dseabi_llc }. { props.language === "en" ? translations.en.footer.all_rights_reserved : translations.mn.footer.all_rights_reserved }.
                </Typography.Text>                            
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