import { useEffect, useState } from "react"
import axios from "axios"; 
import api from "../api";
import { message, Breadcrumb, Row, Col, Typography, Tag, Divider } from "antd";
import { Link } from "react-router-dom";
import moment from 'moment'

function PostDetail (props) {

    const [post, setPost] = useState()    
    const [latest, setLatest] = useState()

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${api.posts}/${props.match.params.id}/`,            
        }).then(res => {                        
            setPost(res.data)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })        
        getLatest()                
    }, [props.match.params.id]) // eslint-disable-line react-hooks/exhaustive-deps    

    function getLatest () {
        axios({
            method: 'GET',
            url: `${api.posts}/`,            
        }).then(res => {                        
            setLatest(res.data.results)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })      
    }

    return (
        <div>
            { post ? (
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/">
                                Нүүр хуудас
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/posts">
                                Мэдээлэл
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>                   
                            {post.title}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ marginTop: '24px' }}>
                        <Row gutter={[48, 16]}>
                            <Col xs={24} sm={24} md={24} lg={16}>
                                <div style={{ marginBottom: '24px', padding: '24px', background: '#fff', borderRadius: '2px' }}>
                                    <img src={post.thumbnail} alt={post.title} style={{ width: '100%', height: 'auto', borderRadius: '2px' }} />                                    
                                    <div style={{ marginTop: '24px' }}>
                                        <Typography.Title level={3}>{post.title}</Typography.Title>
                                        <Typography.Paragraph style={{ fontSize: '16px' }}>
                                            <div dangerouslySetInnerHTML={{__html: post.content }} />
                                        </Typography.Paragraph>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>       
                                            <div>
                                                <Tag color="green" style={{ margin: '8px' }}>Зөвлөгөө</Tag>
                                                <Tag color="green">Эрүүл мэнд</Tag>
                                            </div>                                    
                                            <div style={{ fontStyle: 'italic' }}>
                                                Нийтлэгдсэн: {moment(post.created_at).format("YYYY-MM-DD")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={8}>
                                <div style={{ width: '100%', padding: '24px', background: '#fff', borderRadius: '2px' }}>
                                    <Typography.Title level={5}>Шинэ мэдээлэл</Typography.Title>
                                    { latest ? latest.slice(0, 3).map(item => {
                                        return (
                                            <div>
                                                <Divider /> 
                                                <Row gutter={[16, 16]}>
                                                    <Col span={12}>
                                                        <img alt={item.title} src={item.thumbnail} style={{ width: '100%', height: 'auto', borderRadius: '2px' }} />
                                                    </Col>
                                                    <Col span={12}>
                                                        <Typography.Title level={4} style={{ marginTop: '16px' }}>{item.title}</Typography.Title>
                                                        <Typography.Text type="secondary" style={{ display: 'block', textAlign: 'right' }}>{moment(post.created_at).format("YYYY-MM-DD")}</Typography.Text>
                                                    </Col>
                                                </Row>                                                
                                            </div>                                           
                                        )
                                    }) : <></>}
                                    <Divider />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default PostDetail