import { DoubleRightOutlined } from '@ant-design/icons';
import { Col, Row, Typography, Button } from 'antd';
import React from 'react';
import { withRouter } from 'react-router-dom';
import HomeSlider from './HomeSlider';
import HomeTimeline from './HomeTimeline';
// import * as translations from '../translation';
import { connect } from 'react-redux';

function Home (props) {        

    return (
        <div>
            <HomeSlider />                 
            <Row gutter={[32, 32]} style={{ marginTop: '32px' }}>
                <Col xs={24} sm={24} md={24} lg={8}>
                    <div style={{ background: '#eb4d4b', height: '200px', width: '100%', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography.Title level={3} style={{ color: '#fff' }}>Онцлох бүтээгдэхүүн 1</Typography.Title>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={8}>
                    <div style={{ background: '#6ab04c', height: '200px', width: '100%', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography.Title level={3} style={{ color: '#fff' }}>Онцлох бүтээгдэхүүн 2</Typography.Title>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={8}>
                    <div style={{ background: '#30336b', height: '200px', width: '100%', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography.Title level={3} style={{ color: '#fff' }}>Онцлох бүтээгдэхүүн 3</Typography.Title>
                    </div>
                </Col>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
                <Typography.Title level={3}>Онцлох бүтээгдэхүүн</Typography.Title>
                <Button type="primary" icon={<DoubleRightOutlined />} href="/products?is_featured=true">Бүгд</Button>
            </div>                                
            <HomeTimeline />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        language: state.language
    }
}

export default withRouter(connect(mapStateToProps, null)(Home));