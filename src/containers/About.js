import { CarOutlined, GiftOutlined, SafetyCertificateOutlined, ShoppingCartOutlined, TeamOutlined, UserOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Row, Typography, Avatar, Carousel, Button } from "antd";
import { useRef } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as translations from '../translation';

function About (props) {

    const ref = useRef()

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/">
                    { props.language === "en" ? translations.en.footer.home_page : translations.mn.footer.home_page }
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    { props.language === "en" ? translations.en.header.about_us : translations.mn.header.about_us }
                </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ marginTop: '24px' }}>               
                <div style={{ position: 'relative' }}>
                    <Carousel autoplay autoplaySpeed={9000} ref={ref} style={{ zIndex: '1' }}>                
                        
                    </Carousel>        
                    <Button       
                        icon={<LeftOutlined />}                  
                        type="text"                        
                        size="large"
                        style={{ position: 'absolute', left: '8px', top: '5%', zIndex: '2', height: '90%', opacity: '0.5' }}
                        onClick={() => ref.current.prev()}
                    />          
                    <Button       
                        icon={<RightOutlined />}                  
                        type="text"                        
                        size="large"
                        style={{ position: 'absolute', right: '8px', top: '5%', zIndex: '2', height: '90%', opacity: '0.5' }}
                        onClick={() => ref.current.next()}
                    />                                        
                </div>
                <Row gutter={[16, 16]} style={{ marginTop: '24px', textAlign: 'center', padding: '24px' }}>
                    <Col xs={12} sm={12} md={12} lg={6}>
                        <Avatar shape="circle" icon={<SafetyCertificateOutlined />} size={140} style={{ color: '#000', marginBottom: '16px' }} />                        
                        <Typography.Title level={4}>{ props.language === "en" ? translations.en.about.feature1 : translations.mn.about.feature1 }</Typography.Title>                                              
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6}>
                        <Avatar shape="circle" icon={<ShoppingCartOutlined />} size={140} style={{ color: '#000', marginBottom: '16px' }} />                                          
                        <Typography.Title level={4}>{ props.language === "en" ? translations.en.about.feature2 : translations.mn.about.feature2 }</Typography.Title>                                                     
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6}>
                        <Avatar shape="circle" icon={<CarOutlined />} size={140} style={{ color: '#000', marginBottom: '16px' }} />                  
                        <Typography.Title level={4}>{ props.language === "en" ? translations.en.about.feature3 : translations.mn.about.feature3 }</Typography.Title>                                                    
                    </Col>                   
                    <Col xs={12} sm={12} md={12} lg={6}>
                        <Avatar shape="circle" icon={<GiftOutlined />} size={140} style={{ color: '#000', marginBottom: '16px' }} />                  
                        <Typography.Title level={4}>{ props.language === "en" ? translations.en.about.feature4 : translations.mn.about.feature4 }</Typography.Title>                                                      
                    </Col>
                </Row>         
                <div style={{background: '#fff', padding: '24px', marginTop: '24px', textAlign: 'center',  }}>
                    <Typography.Title level={2} style={{ marginBottom: '24px' }}><TeamOutlined /> Манай хамт олон</Typography.Title>                    
                    <Row gutter={[16, 16]} style={{ textAlign: 'center' }}>
                        <Col xs={12} sm={12} md={8} lg={4}>
                            <Avatar shape="square" icon={<UserOutlined />} size={140} />
                            <Typography.Title level={4} style={{ marginBottom: 0 }}>John Doe</Typography.Title>
                            <Typography.Text>Role</Typography.Text>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={4}>
                            <Avatar shape="square"  icon={<UserOutlined />} size={140} />
                            <Typography.Title level={4} style={{ marginBottom: 0 }}>John Doe</Typography.Title>
                            <Typography.Text>Role</Typography.Text>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={4}>
                            <Avatar shape="square"  icon={<UserOutlined />} size={140} />
                            <Typography.Title level={4} style={{ marginBottom: 0 }}>John Doe</Typography.Title>
                            <Typography.Text>Role</Typography.Text>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={4}>
                            <Avatar shape="square"  icon={<UserOutlined />} size={140} />
                            <Typography.Title level={4} style={{ marginBottom: 0 }}>John Doe</Typography.Title>
                            <Typography.Text>Role</Typography.Text>
                        </Col>        
                        <Col xs={12} sm={12} md={8} lg={4}>
                            <Avatar shape="square"  icon={<UserOutlined />} size={140} />
                            <Typography.Title level={4} style={{ marginBottom: 0 }}>John Doe</Typography.Title>
                            <Typography.Text>Role</Typography.Text>
                        </Col>        
                        <Col xs={12} sm={12} md={8} lg={4}>
                            <Avatar shape="square"  icon={<UserOutlined />} size={140} />
                            <Typography.Title level={4} style={{ marginBottom: 0 }}>John Doe</Typography.Title>
                            <Typography.Text>Role</Typography.Text>
                        </Col>                        
                    </Row>    
                </div>                       
            </div>        
        </div>
    )
}

const mapStateToProps = state => {
    return {
        language: state.language
    }
}

export default withRouter(connect(mapStateToProps, null)(About));
