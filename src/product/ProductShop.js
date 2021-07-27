import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../api'
import { Breadcrumb, Col, message, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'

function ProductShop (props) {

    const [item, setItem] = useState() 

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${api.items}/${props.match.params.id}/`,            
        }).then(res => {                        
            setItem(res.data)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })                        
    }, [props.match.params.id]) // eslint-disable-line react-hooks/exhaustive-deps

    function getAddress (address_obj) {
        if (!address_obj || address_obj == null) {
            return ""
        }
        let result = address_obj.city.name + ", " + address_obj.district.name + " дүүрэг"
        if (address_obj.section) {
            result = result + ", " + address_obj.section + "-р хороо"
        }
        if (address_obj.address) {
            result = result + ", " + address_obj.address
        }        
        return result
    }

    return (
        <div>
            {item ? (
                <>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/">
                                Нүүр хуудас
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/products">
                                Эмийн сан
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>       
                            <Link to={`/products/${item.id}`}>
                                {item.name}
                            </Link>            
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Зарагдаж буй салбарууд
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Typography.Title level={5} style={{ marginTop: '24px' }}>{item.name} бүтээгдэхүүний зарагдаж буй салбарууд</Typography.Title>
                    <Row gutter={[16, 16]}>
                    {item.shops.map(shop => {
                        return (
                            <Col xs={24} sm={24} md={24} lg={12} style={{ background: '#fff', padding: '16px' }}>
                                <Row gutter={[8, 8]}>
                                    <Col span={12}>
                                        <img src={shop.image} alt={shop.name} style={{ width: '100%', height: 'auto' }} />
                                    </Col>
                                    <Col span={12}>
                                        <Typography.Title level={5}>{shop.name}</Typography.Title>
                                        <p>Утас: {shop.phone_number}</p>
                                        <p>Хаяг: {getAddress(shop.address)}</p>
                                    </Col>
                                </Row>
                            </Col>
                        )
                    })}
                    </Row>
                </>
            ) : (
                <></>
            )}            
        </div>
    )
}

export default ProductShop