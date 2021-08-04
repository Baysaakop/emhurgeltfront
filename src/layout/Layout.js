import React from 'react';
import { Grid, Button, Layout, Tooltip, Typography, Row, Col } from 'antd';
import CustomMenu from '../components/Menu';
import './Layout.css';
import { FacebookFilled, InstagramOutlined, YoutubeFilled } from '@ant-design/icons';

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
                <div style={ screens.lg ? { padding: '32px 10%' } : { padding: '24px 5%' }}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={24} lg={12}>
                            <Typography.Text style={{ fontSize: '16px', marginRight: '8px', fontWeight: 'bold' }}>Follow us on social media:</Typography.Text>
                            <Tooltip title="Facebook">
                                <Button href="https://www.facebook.com/%D0%98%D1%80%D0%BC%D2%AF%D2%AF%D0%BD-%D0%B0%D0%B7-%D1%8D%D0%BC%D0%B8%D0%B9%D0%BD-%D1%81%D0%B0%D0%BD-581215945892542" type="text" icon={<FacebookFilled />} style={{ marginRight: '8px' }} size="large" /> 
                            </Tooltip>
                            <Tooltip title="Instagram">
                                <Button type="text" icon={<InstagramOutlined />} style={{ marginRight: '8px' }} size="large" /> 
                            </Tooltip>
                            <Tooltip title="YouTube">
                                <Button type="text" icon={<YoutubeFilled />} size="large" /> 
                            </Tooltip>                                  
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} style={ screens.lg ? { display: 'flex', justifyContent: 'flex-end', alignItems: 'center' } : { display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>© 2021 Dseabi Company</Typography.Text>                            
                        </Col>
                    </Row>                 
                </div>                
            </Footer>
        </Layout>
    );  
};

export default CustomLayout;