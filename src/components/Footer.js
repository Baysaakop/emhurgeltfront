import React from 'react';
import { Grid, Button, Typography, Row, Col, Avatar } from 'antd';
import { FacebookFilled, GoogleOutlined  } from '@ant-design/icons';
import logo from './logo.png'
import * as translations from '../translation';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from "moment"

const { useBreakpoint } = Grid;

function CustomFooter (props) {

    const screens = useBreakpoint()

    return (
        <div>
            <div style={ screens.xxl ? { padding: '24px 12%' } : screens.xl ? { padding: '24px 8%' } : { padding: '24px' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <div className="logo" style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'center', marginBottom: '8px' }}>                            
                            <div>
                                <Avatar size={48} src={logo} style={{ marginRight: '4px' }} />
                            </div>
                            <div>                                    
                                <div style={{ margin: 0, fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '24px', color: '#000' }}>DSEABI LLC</div>                       
                                <div style={{ margin: 0, color: '#4c4c4c', fontSize: '14px', marginTop: '-8px' }}>
                                {/* { props.language === "en" ? translations.en.header.irmuun_az_pharmacy : translations.mn.header.irmuun_az_pharmacy } */}
                                Эм ханган нийлүүлэх төв
                                </div>       
                            </div>                                                                                                                                   
                        </div>                        
                    </Col>                  
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <Typography.Title level={5}>{ props.language === "en" ? translations.en.footer.address : translations.mn.footer.address }</Typography.Title>
                        <Typography.Text>{ props.language === "en" ? translations.en.footer.address_pharmacy : translations.mn.footer.address_pharmacy }</Typography.Text>                        
                    </Col>  
                    <Col xs={24} sm={24} md={12} lg={6}>                       
                        <Typography.Title level={5}>{ props.language === "en" ? translations.en.footer.phone_number : translations.mn.footer.phone_number }</Typography.Title>
                        <Typography.Text>1132-2817, 8080-2594, 8010-8614</Typography.Text>
                    </Col>  
                    <Col xs={24} sm={24} md={12} lg={4}>
                        <Typography.Title level={4}>{ props.language === "en" ? translations.en.footer.social_channels : translations.mn.footer.social_channels }</Typography.Title>
                        <a target="_blank" rel="noreferrer" href="https://www.facebook.com/dseabi.mn">
                            <div style={{ marginTop: '8px' }}>
                                <Button size="large" type="primary" style={{ background: '#3B5998', paddingTop: '4px' }} icon={<FacebookFilled />} /> 
                                <Typography.Text style={{ fontSize: '16px', fontWeight: 'bold', marginLeft: '8px' }}> Facebook</Typography.Text>
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
                    © {moment().year()} / { props.language === "en" ? translations.en.header.dseabi_llc : translations.mn.header.dseabi_llc }. { props.language === "en" ? translations.en.footer.all_rights_reserved : translations.mn.footer.all_rights_reserved }.
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