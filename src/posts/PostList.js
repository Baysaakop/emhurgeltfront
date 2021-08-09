import { Breadcrumb, Col, Row, message, Typography, Button, Pagination, Input, Divider } from "antd"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import api from "../api"
import moment from 'moment'
import CheckableTag from "antd/lib/tag/CheckableTag";
import { FacebookFilled, InstagramOutlined, MailOutlined, YoutubeOutlined } from '@ant-design/icons';

const { Search } = Input

function PostList (props) {

    const [posts, setPosts] = useState()    
    const [page, setPage] = useState(1)    
    const [total, setTotal] = useState()
    const [search, setSearch] = useState()

    useEffect(() => {
        getPosts(page)
    }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

    function getPosts (page) {
        let url = `${api.posts}/?`
        url += `&page=${page}`    
        axios({
            method: 'GET',
            url: url           
        }).then(res => {                        
            setPosts(res.data.results)          
            setTotal(res.data.count)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }

    function onPageChange (pageNum, pageSize) {        
        setPage(pageNum)
    }

    function onSearch (val) {
        setSearch(val)
    }

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/">
                        Нүүр хуудас
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Мэдээлэл
                </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ marginTop: '24px' }}>
                <Row gutter={[48, 16]}>
                    <Col xs={24} sm={24} md={24} lg={16}>
                        { posts ? posts.map(post => {
                            return (
                                <div style={{ marginBottom: '24px', padding: '24px', background: '#fff', borderRadius: '2px' }}>
                                    <Link to={`/posts/${post.id}`}>
                                        <img src={post.thumbnail} alt={post.title} style={{ width: '100%', height: 'auto', borderRadius: '2px' }} />
                                    </Link>                                    
                                    <div style={{ marginTop: '24px' }}>
                                        <Typography.Title level={3}>{post.title}</Typography.Title>
                                        <Typography.Paragraph ellipsis={{ rows: 3 }} style={{ fontSize: '16px' }}>
                                            <div dangerouslySetInnerHTML={{__html: post.content }} />
                                        </Typography.Paragraph>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Link to={`/posts/${post.id}`}>
                                                <Button type="primary">Дэлгэрэнгүй</Button>
                                            </Link>
                                            <div style={{ fontStyle: 'italic' }}>
                                                Нийтлэгдсэн: {moment(post.created_at).format("YYYY-MM-DD")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <></>}
                        <Pagination
                            current={page}
                            total={total}
                            pageSize={24}
                            showSizeChanger={false}
                            showTotal={false}
                            size="small"
                            onChange={onPageChange}
                        />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={8}>
                        <div style={{ width: '100%', padding: '24px', background: '#fff', borderRadius: '2px' }}>
                            <Typography.Title level={5}>Мэдээлэл хайх</Typography.Title>
                            <Search placeholder="Мэдээлэл хайх..." onSearch={onSearch} enterButton />
                            <Divider />
                            <Typography.Title level={5}>Зориулалт:</Typography.Title>
                            <CheckableTag
                                key={1}
                                checked={false}                
                                style={{ fontSize: '14px', marginTop: '8px' }}                
                            >
                                Зөвлөгөө
                            </CheckableTag>
                            <CheckableTag
                                key={1}
                                checked={false}                
                                style={{ fontSize: '14px', marginTop: '8px' }}                
                            >
                                Мэдээлэл
                            </CheckableTag>
                            <CheckableTag
                                key={1}
                                checked={false}                
                                style={{ fontSize: '14px', marginTop: '8px' }}                
                            >
                                Бүтээгдэхүүн танилцуулга
                            </CheckableTag>
                            <CheckableTag
                                key={1}
                                checked={false}                
                                style={{ fontSize: '14px', marginTop: '8px' }}                
                            >
                                Гоо сайхан
                            </CheckableTag>
                            <CheckableTag
                                key={1}
                                checked={false}                
                                style={{ fontSize: '14px', marginTop: '8px' }}                
                            >
                                Эрүүл мэнд
                            </CheckableTag>
                            <CheckableTag
                                key={1}
                                checked={false}                
                                style={{ fontSize: '14px' }}                
                            >
                                Бусад
                            </CheckableTag>
                            <Divider />
                            <Typography.Title level={5}>Мэдээлэл авах суваг:</Typography.Title>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <a href="https://www.facebook.com/%D0%98%D1%80%D0%BC%D2%AF%D2%AF%D0%BD-%D0%B0%D0%B7-%D1%8D%D0%BC%D0%B8%D0%B9%D0%BD-%D1%81%D0%B0%D0%BD-581215945892542">
                                    <div style={{ marginTop: '8px', textAlign: 'center' }}>
                                        <Button size="large" shape="circle" type="primary" style={{ background: '#3B5998', paddingTop: '4px' }} icon={<FacebookFilled />} /> 
                                        <Typography.Text style={{ fontSize: '16px', fontWeight: 'bold' }}> Facebook</Typography.Text>
                                    </div>       
                                </a>  
                                <a href="/">
                                    <div style={{ marginTop: '8px', textAlign: 'center' }}>
                                        <Button size="large" shape="circle" type="primary" style={{ background: '#bb0000', paddingTop: '4px' }} icon={<YoutubeOutlined />} /> 
                                        <Typography.Text style={{ fontSize: '16px', fontWeight: 'bold' }}> YouTube</Typography.Text>
                                    </div>  
                                </a>        
                                <a href="/">
                                    <div style={{ marginTop: '8px', textAlign: 'center' }}>
                                        <Button size="large" shape="circle" type="primary" style={{ background: '#125688', paddingTop: '4px' }} icon={<InstagramOutlined />} /> 
                                        <Typography.Text style={{ fontSize: '16px', fontWeight: 'bold' }}> Instagram</Typography.Text>
                                    </div>   
                                </a>    
                                <a href="mailto:info@dseabi.mn">     
                                    <div style={{ marginTop: '8px', textAlign: 'center' }}>
                                        <Button size="large" shape="circle" type="primary" style={{ background: '#dd4b39', paddingTop: '4px' }} icon={<MailOutlined />} /> 
                                        <Typography.Text style={{ fontSize: '16px', fontWeight: 'bold' }}> Email</Typography.Text>
                                    </div>    
                                </a>           
                            </div>                                                       
                        </div>                            
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default PostList