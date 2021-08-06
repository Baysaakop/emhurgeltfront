import React from 'react';
import { Grid, Button, Layout, Typography, Row, Col } from 'antd';
import CustomMenu from '../components/Menu';
import './Layout.css';
import { FacebookFilled, InstagramOutlined, MailOutlined, YoutubeOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import logo from '../components/logo7.png'

const { useBreakpoint } = Grid;
const { Header, Content, Footer } = Layout;

function CustomLayout (props) {    

    const screens = useBreakpoint()

    return(
        <Layout>            
            <Header>                  
                <CustomMenu {...props} />                
            </Header>
            <Content style={{ minHeight: '80vh' }}>                                     
                <div className="content-item" style={ screens.lg ? { padding: '24px 10%' } : { padding: '24px 5%' }}>
                    {props.children}                    
                </div>                
            </Content>
            <Footer>
                <div style={ screens.lg ? { padding: '24px 10%' } : { padding: '24px 5%' }}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={12} lg={8}>
                            <div className="logo" style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'center', marginBottom: '8px' }}>                            
                                <div>
                                    <Avatar size={48} src={logo} style={{ marginRight: '4px' }} />
                                </div>
                                <div>                                    
                                    <div style={{ margin: 0, fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '24px', color: '#000' }}>emhurgelt.mn</div>                       
                                    <div style={{ margin: 0, color: '#2ECC71', fontSize: '14px', marginTop: '-8px' }}>Ирмүүн Аз эмийн сан</div>       
                                </div>                                                                                                                                   
                            </div>
                            <Typography.Title level={5}>Хаяг</Typography.Title>
                            <Typography.Text>ХУД 120 мянгат 1-р хороо Энхтайван хотхон 46А байр 1-р давхар ИРМҮҮН-АЗ эмийн сан, Улаанбаатар</Typography.Text>
                            <Typography.Title level={5}>Утасны дугаар</Typography.Title>
                            <Typography.Text style={{ fontSize: '16px' }}>7607-7722, 8080-2594</Typography.Text>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={6}>
                            <Typography.Title level={4}>Үндсэн цэс</Typography.Title>                            
                            <Button href="/" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>Нүүр хуудас</Button><br/>
                            <Button href="/brandproducts" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>Онцлох бүтээгдэхүүн</Button><br/>
                            <Button href="/about" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>Бидний тухай</Button><br/>
                            <Button href="/products" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>Эмийн сан</Button><br/>
                            <Button href="/news" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>Мэдээлэл</Button><br/>
                            <Button href="/contact" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>Холбогдох</Button><br/>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={6}>
                            <Typography.Title level={4}>Ерөнхий ангилал</Typography.Title>                            
                            <Button href="/products" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>Эмнэлгийн хэрэгсэл</Button><br/>
                            <Button href="/products" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>Гоо сайхан</Button><br/>
                            <Button href="/products" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>Витамин</Button><br/>
                            <Button href="/products" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>Хүүхэд</Button><br/>
                            <Button href="/products" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>Хүнс</Button><br/>
                            <Button href="/products" block type="text" style={{ color: '#8e8e8e', textAlign: 'left' }}>Ковид 19</Button><br/>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={4}>
                            <Typography.Title level={4}>Сошиал сувгууд</Typography.Title>
                            <a href="https://www.facebook.com/%D0%98%D1%80%D0%BC%D2%AF%D2%AF%D0%BD-%D0%B0%D0%B7-%D1%8D%D0%BC%D0%B8%D0%B9%D0%BD-%D1%81%D0%B0%D0%BD-581215945892542">
                                <div style={{ marginTop: '8px' }}>
                                    <Button size="large" shape="circle" type="primary" style={{ background: '#3B5998', paddingTop: '4px' }} icon={<FacebookFilled />} /> 
                                    <Typography.Text style={{ fontSize: '16px', fontWeight: 'bold' }}> Facebook</Typography.Text>
                                </div>       
                            </a>  
                            <a href="/">
                                <div style={{ marginTop: '8px' }}>
                                    <Button size="large" shape="circle" type="primary" style={{ background: '#bb0000', paddingTop: '4px' }} icon={<YoutubeOutlined />} /> 
                                    <Typography.Text style={{ fontSize: '16px', fontWeight: 'bold' }}> YouTube</Typography.Text>
                                </div>  
                            </a>          
                            <a href="/">
                                <div style={{ marginTop: '8px' }}>
                                    <Button size="large" shape="circle" type="primary" style={{ background: '#125688', paddingTop: '4px' }} icon={<InstagramOutlined />} /> 
                                    <Typography.Text style={{ fontSize: '16px', fontWeight: 'bold' }}> Instagram</Typography.Text>
                                </div>   
                            </a>    
                            <a href="mailto:info@dseabi.mn">     
                                <div style={{ marginTop: '8px' }}>
                                    <Button size="large" shape="circle" type="primary" style={{ background: '#dd4b39', paddingTop: '4px' }} icon={<MailOutlined />} /> 
                                    <Typography.Text style={{ fontSize: '16px', fontWeight: 'bold' }}> Email</Typography.Text>
                                </div>    
                            </a>
                        </Col>
                    </Row>                                                   
                </div>                         
                <div style={ screens.lg ? { padding: '8px 10%', borderTop: '1px solid #dedede', background: '#f0f2f5' } : { padding: '8px 5%', borderTop: '1px solid #dedede', background: '#f0f2f5' }}>
                    <Typography.Text style={{ fontSize: '14px', fontWeight: 'bold' }}>© 2021 Ди Эс И Эй Би Ай ХХК. Зохиогчийн эрх хуулиар хамгаалагдсан.</Typography.Text>                            
                </div>                           
            </Footer>
        </Layout>
    );  
};

export default CustomLayout;