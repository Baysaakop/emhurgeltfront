import { useEffect, useState } from "react"
import axios from "axios";
import api from "../api";
import { Breadcrumb, Button, Col, message, Modal, Row } from "antd";
import { Link } from "react-router-dom";
import './BrandProducts.css'
import { PlayCircleOutlined, ShoppingOutlined } from "@ant-design/icons";

function BrandProducts (props) {

    const [items, setItems] = useState()
    const [visible, setVisible] = useState(false)
    const [name, setName] = useState()
    const [video, setVideo] = useState()

    useEffect(() => {        
        getProducts()                 
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getProducts () {        
        let url = `${api.items}/?is_featured=true`        
        axios({
            method: 'GET',
            url: url           
        }).then(res => {                                           
            setItems(res.data.results)            
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }    

    function showVideo (name, video) {        
        setName(name)
        setVideo(video)        
        setVisible(true)   
    }

    function handleCancel () {
        setVisible(false)
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
                    Онцлох бүтээгдэхүүн
                </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ margin: '24px 0' }}>                
                <Modal title={name} visible={visible} footer={null} onCancel={handleCancel} width={window.screen.availWidth / 2}>
                    <iframe 
                        title={name}
                        src={video ? video : "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fdseabi.mn%2Fvideos%2F510778073510439%2F&show_text=false&width=560&t=0"} 
                        width={window.screen.availWidth / 2 - 48} 
                        height={window.screen.availWidth / 4}
                        scrolling="no" 
                        frameborder="0" 
                        allowfullscreen="true" 
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
                        allowFullScreen="true">
                    </iframe>
                </Modal>
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={24} md={6}>
                    { items ? items.slice(0, 3).map(item => {
                        return (
                            <div className="poster">
                                <img alt={item.name} src={item.poster} />
                                <div className="overlay">
                                    <Button type="primary" shape="round" icon={<PlayCircleOutlined />} style={{ marginRight: '8px', background: '#30336b' }} onClick={() => showVideo(item.name, item.video)}>Видео үзэх</Button>
                                    <Button type="primary" shape="round" icon={<ShoppingOutlined />} style={{ background: '#130f40' }} href={`products/${item.id}`}>Захиалах</Button>
                                </div>
                            </div>
                        )       
                    }) : <></>} 
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                    { items ? items.slice(3, 6).map(item => {
                        return (
                            <div className="poster">
                                <img alt={item.name} src={item.poster} />
                                <div className="overlay">
                                    <Button type="primary" shape="round" icon={<PlayCircleOutlined />} style={{ marginRight: '8px', background: '#30336b' }} onClick={() => showVideo(item.name, item.video)}>Видео үзэх</Button>
                                    <Button type="primary" shape="round" icon={<ShoppingOutlined />} style={{ background: '#130f40' }} href={`products/${item.id}`}>Захиалах</Button>
                                </div>
                            </div>
                        )       
                    }) : <></>} 
                    </Col>
                    <Col xs={24} sm={24} md={6}>
                    { items ? items.slice(6, 9).map(item => {
                        return (
                            <div className="poster">
                                <img alt={item.name} src={item.poster} />
                                <div className="overlay">
                                    <Button type="primary" shape="round" icon={<PlayCircleOutlined />} style={{ marginRight: '8px', background: '#30336b' }} onClick={() => showVideo(item.name, item.video)}>Видео үзэх</Button>
                                    <Button type="primary" shape="round" icon={<ShoppingOutlined />} style={{ background: '#130f40' }} href={`products/${item.id}`}>Захиалах</Button>
                                </div>
                            </div>
                        )       
                    }) : <></>} 
                    </Col>
                </Row>                                    
            </div>
        </div>
    )
}

export default BrandProducts