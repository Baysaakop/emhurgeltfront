import { useEffect, useState } from "react"
import axios from "axios";
import api from "../api";
import { Breadcrumb, Button, Col, message, Row } from "antd";
import { Link } from "react-router-dom";
import './BrandProducts.css'
import { PlayCircleOutlined, ShoppingOutlined } from "@ant-design/icons";
import ProductVideo from './ProductVideo'

function BrandProducts (props) {

    const [items, setItems] = useState([])
    const [visible, setVisible] = useState(false)

    useEffect(() => {        
        getProducts()                 
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getProducts () {        
        let url = `${api.items}/?is_featured=true`        
        axios({
            method: 'GET',
            url: url           
        }).then(res => {            
            console.log(res.data.results)                               
            setItems(res.data.results)            
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
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
                <Row gutter={[24, 24]}>
                    {items.map(item => {
                        return (
                            <Col xs={24} sm={24} md={12} lg={8}>
                                {visible ? <ProductVideo title={item.name} video={item.video !== null && item.video !== "" ? item.video : "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fdseabi.mn%2Fvideos%2F510778073510439%2F&show_text=false&width=560&t=0"} hide={() => setVisible(false)} /> : <></> } 
                                <div className="poster">
                                    <img alt={item.name} src={item.poster} />
                                    <div className="overlay">
                                        <Button type="primary" shape="round" icon={<PlayCircleOutlined />} style={{ marginRight: '8px', background: '#30336b' }} onClick={() => setVisible(true)}>Видео үзэх</Button>
                                        <Button type="primary" shape="round" icon={<ShoppingOutlined />} style={{ background: '#130f40' }} href={`products/${item.id}`}>Захиалах</Button>
                                    </div>
                                </div>
                            </Col>
                        )
                    })}                    
                </Row>                                    
            </div>
        </div>
    )
}

export default BrandProducts