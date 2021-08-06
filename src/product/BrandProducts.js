import { useEffect, useState } from "react"
import axios from "axios";
import api from "../api";
import { Breadcrumb, Button, Col, message, Row } from "antd";
import { Link } from "react-router-dom";
import img1 from './1.jpg'
import img2 from './2.jpg'
import img3 from './3.jpg'
import img4 from './4.jpg'
import img5 from './5.jpg'
import img6 from './6.jpg'
import './BrandProducts.css'
import { PlayCircleOutlined, ShoppingOutlined } from "@ant-design/icons";

function BrandProducts (props) {

    useEffect(() => {        
        getProducts()        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const [items, setItems] = useState()

    function getProducts () {        
        let url = `${api.items}/?is_brand=true`        
        axios({
            method: 'GET',
            url: url           
        }).then(res => {                                    
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
                <div style={{ display: 'flex', flexWrap: 'wrap', padding: '0 4px' }}>
                    {/* {data ? data.map(item => {
                        return (
                            <div style={{ flex: '33%', maxWidth: '33%', padding: '0 4px' }}>
                                <img src={`${item}.jpg`} alt="image" style={{ width: '100%', height: 'auto', marginTop: '8px', verticalAlign: 'middle' }} />
                            </div>
                        )
                    }) : <></>} */}                                        
                </div> 
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={16}>
                        <div className="ad" style={{ width: '100%', height: '500px', overflow: 'hidden', position: 'relative' }}>
                            <img src={img1} alt="img1" style={{ width: '100%', height: 'auto', objectFit: 'fill' }} />
                            <div className="overlay" style={{ position: 'absolute', right: '8px', bottom: '8px' }}>
                                <Button type="primary" size="large" shape="round" icon={<PlayCircleOutlined />} style={{ marginRight: '8px', background: '#2c3e50' }}>Watch Video</Button>
                                <Button type="primary" size="large" shape="round" icon={<ShoppingOutlined />}>Shop Now</Button>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <div className="ad" style={{ width: '100%', height: '242px', overflow: 'hidden' }}>
                            <img src={img2} alt="img2" style={{ width: '100%', height: 'auto', objectFit: 'fill' }} />
                        </div>
                        <div className="ad" style={{ marginTop: '16px', width: '100%', height: '242px', overflow: 'hidden' }}>
                            <img src={img3} alt="img3" style={{ width: '100%', height: 'auto', objectFit: 'fill' }} />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <div className="ad" style={{ width: '100%', height: '242px', overflow: 'hidden' }}>
                            <img src={img4} alt="img4" style={{ width: '100%', height: 'auto', objectFit: 'fill' }} />
                        </div>
                        <div className="ad" style={{ marginTop: '16px', width: '100%', height: '242px', overflow: 'hidden' }}>
                            <img src={img5} alt="img5" style={{ width: '100%', height: 'auto', objectFit: 'fill' }} />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={16}>
                        <div className="ad" style={{ width: '100%', height: '500px', overflow: 'hidden' }}>
                            <img src={img6} alt="img6" style={{ width: '100%', height: 'auto', objectFit: 'fill' }} />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default BrandProducts