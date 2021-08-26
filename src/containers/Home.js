import { DoubleRightOutlined, MenuOutlined } from '@ant-design/icons';
import { Col, Row, Typography, Card, message, Button, Divider } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import api from '../api';
import { Link } from 'react-router-dom';
import ProductScroll from '../product/ProductScroll';
import moment from 'moment'
import HomeSlider from './HomeSlider';
import HomeTimeline from './HomeTimeline';

function Home (props) {        
    const [categories, setCategories] = useState()  
    const [posts, setPosts] = useState()  

    useEffect(() => {
        getCategories()
        getPosts()       
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getCategories() {
        let url = `${api.categories}/`         
        axios({
            method: 'GET',
            url: url           
        }).then(res => {                        
            setCategories(res.data.results)                      
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }

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
            <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={24} lg={18}>
                    <HomeSlider />
                </Col>   
                <Col xs={24} sm={24} md={24} lg={6}>
                    <div style={{ background: '#fff', borderRadius: '2px', padding: '16px', height: '100%' }}>
                        <Typography.Title level={3}><MenuOutlined style={{ fontSize: '20px', marginRight: '8px' }} />Бүх ангилал</Typography.Title>      
                        <Divider style={{ margin: '8px 0' }} />   
                        {categories ? categories.map(item => (
                            <div>
                                <Button block size="large" type="text" href={`/products?category=${item.id}`} style={{ textAlign: 'left' }}>{item.name}</Button>
                            </div>
                        )) : []}
                    </div>
                </Col>                             
            </Row>                       
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
            <ProductScroll type="brand" />            
            {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
                <Typography.Title level={3}>Хямдралтай бүтээгдэхүүн</Typography.Title>            
                <Button type="primary" icon={<DoubleRightOutlined />} href="/products?on_sale=true">Бүгд</Button>
            </div>            
            <ProductScroll type="brand" />  */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
                <Typography.Title level={3}>Шинэ мэдээлэл</Typography.Title>        
                <Button type="primary" icon={<DoubleRightOutlined />} href="/posts">Бүгд</Button>
            </div>            
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
                                        <div>
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