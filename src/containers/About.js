import { CarOutlined, GiftOutlined, SafetyCertificateOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Row, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { Link } from "react-router-dom";

function About () {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/">
                        Нүүр хуудас
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Бидний тухай
                </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ marginTop: '24px' }}>
                <div style={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#34495e', marginBottom: '24px', borderRadius: '2px' }}>
                    <div style={{ textAlign: 'center', padding: '32px' }}>
                        <p style={{ color: '#fff', fontSize: '40px', fontWeight: 'bold' }}>Эрүүл чанартай бүтээгдэхүүнийг <br /> emhurgelt.mn-ээс</p>
                        <Button size="large" type="primary" icon={<ShopOutlined />} style={{ fontWeight: 'bold' }}>Эмийн сан</Button>
                    </div>
                </div>
                <div style={{ background: '#fff', padding: '24px', borderRadius: '2px' }}>
                    {/* <Typography.Title level={2}>Бидний тухай</Typography.Title>
                    <Typography.Paragraph>
                        Sed pulvinar tincidunt nulla, ut tempus dolor facilisis sed. Quisque varius nisl velit, quis maximus magna dapibus et. Maecenas consectetur dapibus nisl, vitae suscipit nunc porttitor eu. Aenean ut felis erat. 
                    </Typography.Paragraph> */}
                    <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
                        <Col xs={24} sm={24} md={12} lg={6} style={{ textAlign: 'center' }}>
                            <SafetyCertificateOutlined style={{ fontSize: '48px' }} />
                            <Typography.Title level={3}>Чанартай бүтээгдэхүүн</Typography.Title>                  
                            <div style={{ marginLeft: '24px', marginRight: '24px' }}>
                                Ut volutpat pretium nisl, ac elementum sem ultricies non. Pellentesque rhoncus lectus id massa sollicitudin, at aliquam velit maximus.
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={6} style={{ textAlign: 'center' }}>
                            <ShoppingCartOutlined style={{ fontSize: '48px' }} />
                            <Typography.Title level={3}>Хялбар захиалга</Typography.Title>           
                            <div style={{ marginLeft: '24px', marginRight: '24px' }}>
                                Fusce diam nunc, tincidunt quis lectus a, posuere fermentum velit. Nam et purus congue, fermentum mi vitae, rutrum ligula.
                            </div>               
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={6} style={{ textAlign: 'center' }}>
                            <CarOutlined style={{ fontSize: '48px' }} />
                            <Typography.Title level={3}>Шуурхай хүргэлт</Typography.Title>    
                            <div style={{ marginLeft: '24px', marginRight: '24px' }}>
                                Curabitur facilisis ante urna, quis posuere mauris pellentesque vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </div>                    
                        </Col>                   
                        <Col xs={24} sm={24} md={12} lg={6} style={{ textAlign: 'center' }}>
                            <GiftOutlined style={{ fontSize: '48px' }} />
                            <Typography.Title level={3}>Урамшууллын оноо</Typography.Title>        
                            <div style={{ marginLeft: '24px', marginRight: '24px' }}>
                                Sed efficitur diam eu ex semper, gravida lacinia eros laoreet. Nulla facilisi. Quisque vestibulum sollicitudin orci, quis euismod diam.
                            </div>                   
                        </Col>
                    </Row>  
                </div>       
                <div style={{ background: '#fff', padding: '24px', borderRadius: '2px', marginTop: '24px' }}>
                    <Typography.Title level={2} style={{ marginTop: '24px' }}>Манай хамт олон</Typography.Title>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={8} lg={6} style={{ textAlign: 'center' }}>
                            <Avatar shape="square" icon={<UserOutlined />} size={240} />
                            <Typography.Title level={4} style={{ marginBottom: 0 }}>John Doe</Typography.Title>
                            <Typography.Text>Role</Typography.Text>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} style={{ textAlign: 'center' }}>
                            <Avatar shape="square"  icon={<UserOutlined />} size={240} />
                            <Typography.Title level={4} style={{ marginBottom: 0 }}>John Doe</Typography.Title>
                            <Typography.Text>Role</Typography.Text>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} style={{ textAlign: 'center' }}>
                            <Avatar shape="square"  icon={<UserOutlined />} size={240} />
                            <Typography.Title level={4} style={{ marginBottom: 0 }}>John Doe</Typography.Title>
                            <Typography.Text>Role</Typography.Text>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} style={{ textAlign: 'center' }}>
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

export default About