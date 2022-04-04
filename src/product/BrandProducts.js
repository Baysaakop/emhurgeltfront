import { useEffect, useState } from "react"
import axios from "axios";
import api from "../api";
import { Avatar, Badge, Breadcrumb, Button, Col, message, Row, Tooltip } from "antd";
import { Link } from "react-router-dom";
import './BrandProducts.css'
import { GiftOutlined, ShoppingOutlined } from "@ant-design/icons";
import ProductPoster from './ProductPoster'

function BrandProducts (props) {

    const [items, setItems] = useState([])
    const [selected, setSelected] = useState()

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

    function onSelect (item) {
        setSelected(item)
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
                {selected ? <ProductPoster name={selected.name} poster={selected.poster} hide={() => setSelected(undefined)} /> : <></> } 
                <Row gutter={[24, 24]}>
                    {items.map(item => {
                        return (
                            <Col xs={24} sm={24} md={12} lg={8}>                                
                                <div className="poster">
                                    <img alt={item.name} src={item.poster} onClick={() => onSelect(item)} />
                                    <div className="overlay-bonus">         
                                        <Tooltip title={`Уг барааг захиалвал ${item.multiplier} хувийн урамшуулалтай`}>
                                            <Badge count={`${item.multiplier}X`}>
                                                <Avatar icon={<GiftOutlined />} shape="square" size={40} style={{ background: '#130f40' }}></Avatar>
                                            </Badge>
                                        </Tooltip>                                                                       
                                    </div>
                                    <div className="overlay-order">                                        
                                        <Button type="primary" shape="round" icon={<ShoppingOutlined />} style={{ background: '#009432' }} href={`products/${item.id}`}>Захиалах</Button>
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