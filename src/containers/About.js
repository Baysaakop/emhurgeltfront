import { CarOutlined, GiftOutlined, SafetyCertificateOutlined, ShopOutlined, ShoppingCartOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Divider, Row, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as translations from '../translation';

function About (props) {
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
                <div style={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#2c3e50', marginBottom: '24px', borderRadius: '2px' }}>
                    <div style={{ textAlign: 'center', padding: '32px' }}>
                        <p style={{ color: '#fff', fontSize: '40px', fontWeight: 'bold' }}>{ props.language === "en" ? translations.en.about.mototop : translations.mn.about.mototop } <br /> { props.language === "en" ? translations.en.about.motobot : translations.mn.about.motobot }</p>
                        <Button size="large" type="primary" icon={<ShopOutlined />} style={{ fontWeight: 'bold', background: '#27ae60' }}>{ props.language === "en" ? translations.en.about.shop_now : translations.mn.about.shop_now }</Button>
                    </div>
                </div>
                <div style={{ background: '#fff', padding: '24px', borderRadius: '2px' }}>                    
                    <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
                        <Col xs={24} sm={24} md={12} lg={6} style={{ textAlign: 'center' }}>
                            <SafetyCertificateOutlined style={{ fontSize: '48px' }} />
                            <Typography.Title level={3}>{ props.language === "en" ? translations.en.about.feature1 : translations.mn.about.feature1 }</Typography.Title>                  
                            <div style={{ marginLeft: '24px', marginRight: '24px' }}>
                                Ut volutpat pretium nisl, ac elementum sem ultricies non. Pellentesque rhoncus lectus id massa sollicitudin, at aliquam velit maximus.
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={6} style={{ textAlign: 'center' }}>
                            <ShoppingCartOutlined style={{ fontSize: '48px' }} />
                            <Typography.Title level={3}>{ props.language === "en" ? translations.en.about.feature2 : translations.mn.about.feature2 }</Typography.Title>           
                            <div style={{ marginLeft: '24px', marginRight: '24px' }}>
                                Fusce diam nunc, tincidunt quis lectus a, posuere fermentum velit. Nam et purus congue, fermentum mi vitae, rutrum ligula.
                            </div>               
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={6} style={{ textAlign: 'center' }}>
                            <CarOutlined style={{ fontSize: '48px' }} />
                            <Typography.Title level={3}>{ props.language === "en" ? translations.en.about.feature3 : translations.mn.about.feature3 }</Typography.Title>    
                            <div style={{ marginLeft: '24px', marginRight: '24px' }}>
                                Curabitur facilisis ante urna, quis posuere mauris pellentesque vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </div>                    
                        </Col>                   
                        <Col xs={24} sm={24} md={12} lg={6} style={{ textAlign: 'center' }}>
                            <GiftOutlined style={{ fontSize: '48px' }} />
                            <Typography.Title level={3}>{ props.language === "en" ? translations.en.about.feature4 : translations.mn.about.feature4 }</Typography.Title>        
                            <div style={{ marginLeft: '24px', marginRight: '24px' }}>
                                Sed efficitur diam eu ex semper, gravida lacinia eros laoreet. Nulla facilisi. Quisque vestibulum sollicitudin orci, quis euismod diam.
                            </div>                   
                        </Col>
                    </Row>  
                </div>       
                <div style={{ background: '#fff', padding: '24px', borderRadius: '2px', marginTop: '24px', textAlign: 'center' }}>
                    <Typography.Title level={2}><TeamOutlined /> Манай хамт олон</Typography.Title>
                    <Divider />
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Avatar shape="square" icon={<UserOutlined />} size={240} />
                            <Typography.Title level={4} style={{ marginBottom: 0 }}>John Doe</Typography.Title>
                            <Typography.Text>Role</Typography.Text>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Avatar shape="square"  icon={<UserOutlined />} size={240} />
                            <Typography.Title level={4} style={{ marginBottom: 0 }}>John Doe</Typography.Title>
                            <Typography.Text>Role</Typography.Text>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Avatar shape="square"  icon={<UserOutlined />} size={240} />
                            <Typography.Title level={4} style={{ marginBottom: 0 }}>John Doe</Typography.Title>
                            <Typography.Text>Role</Typography.Text>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Avatar shape="square"  icon={<UserOutlined />} size={240} />
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
