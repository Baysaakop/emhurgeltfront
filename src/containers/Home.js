import { CarOutlined, GiftOutlined, SafetyCertificateOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Col, Row, Typography, Card, message, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import api from '../api';
import { Link } from 'react-router-dom';
import ProductScroll from '../product/ProductScroll';
import moment from 'moment'
import Categories from './Categories';
import HomeSlider from './HomeSlider';
import HomeTimeline from './HomeTimeline';

function Home (props) {        
    const [posts, setPosts] = useState()  

    useEffect(() => {
        getPosts()       
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getPosts() {
        let url = `${api.posts}/`         
        axios({
            method: 'GET',
            url: url           
        }).then(res => {                        
            setPosts(res.data.results)                      
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }

    return (
        <div>
            <HomeSlider />
            <Typography.Title level={3} style={{ marginTop: '24px' }}>Бүтээгдэхүүний ангилал</Typography.Title>      
            <Categories />                  
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
                        <Typography.Title level={3} style={{ color: '#fff' }}>Онцлох бүтээгдэхүүн c3</Typography.Title>
                    </div>
                </Col>
            </Row>
            <Typography.Title level={3} style={{ marginTop: '24px' }}>Онцлох бүтээгдэхүүн</Typography.Title>
            <ProductScroll type="brand" />
            <div style={{ background: '#fff', padding: '24px', borderRadius: '2px', marginTop: '24px' }}>
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
            <Typography.Title level={3} style={{ marginTop: '24px' }}>Хямдралтай бүтээгдэхүүн</Typography.Title>            
            <ProductScroll type="brand" />                                  
            <Typography.Title level={3} style={{ marginTop: '24px' }}>Шинэ мэдээлэл</Typography.Title>        
            <Row gutter={[24, 24]}>
                { posts ? posts.slice(0, 3).map(post => {
                    return (
                        <Col xs={24} sm={24} md={24} lg={8}>
                            <Link to={`/posts/${post.id}`}>
                                <Card 
                                    hoverable
                                    style={{ width: '100%' }}
                                    cover={
                                        <div style={{ position: 'relative', paddingTop: '50%' }}>                                            
                                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                                                <img alt="asd" src={post.thumbnail} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'scale-down' }} />
                                            </div>                                            
                                        </div>
                                    }
                                >
                                    <Card.Meta
                                        title={post.title}
                                        description={
                                            <Typography.Paragraph ellipsis={{ rows: 3 }} style={{ fontSize: '16px' }}>
                                                <div dangerouslySetInnerHTML={{__html: post.content }} />
                                            </Typography.Paragraph>
                                        }
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Link to={`/posts/${post.id}`}>
                                            <Button type="primary">Дэлгэрэнгүй</Button>
                                        </Link>
                                        <div style={{ fontStyle: 'italic' }}>
                                            {moment(post.created_at).format("YYYY-MM-DD")}
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </Col>
                    )
                }) : <></>}                
            </Row>            
            <HomeTimeline />
        </div>
    )
}

export default Home;