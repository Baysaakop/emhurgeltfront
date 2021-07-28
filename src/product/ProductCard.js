import { EllipsisOutlined, HeartOutlined, MinusCircleOutlined, ShoppingCartOutlined, StarFilled } from "@ant-design/icons";
import { Card, Tooltip, Typography, Modal, message, Button, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import api from "../api";
import './ProductCard.css'
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

function ProductCard (props) {
    const [visible, setVisible] = useState(false)
    const [favorite, setFavorite] = useState()
    const [cart, setCart] = useState()

    useEffect(() => {
        if (props.user) {
            setFavorite(props.user.profile.favorite)
            setCart(props.user.profile.cart)
        }        
    }, [props.user])

    function addToSaved () {
        if (props.user) {  
            axios({
                method: 'PUT',
                url: `${api.profiles}/${props.user.profile.id}/`,
                headers: {
                    'Content-Type': 'application/json',                                              
                },
                data: {
                    favorite: true,
                    item: props.item.id                           
                }
            })            
            .then(res => {
                if (res.status === 200 || res.status === 201) {                    
                    setFavorite(res.data.favorite)          
                }                                                         
            })
            .catch(err => {                      
                console.log(err.message)         
                message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
            })             
        } else {
            props.history.push('/login')            
        }
    }

    function addToCart(mode) {        
        if (props.user) {                          
            axios({
                method: 'PUT',
                url: `${api.profiles}/${props.user.profile.id}/`,
                headers: {
                    'Content-Type': 'application/json',                                              
                },
                data: {
                    cart: true,
                    mode: mode,
                    item: props.item.id,
                    count: 1                                               
                }
            })            
            .then(res => {
                if (res.status === 200 || res.status === 201) {                                  
                    setCart(res.data.cart)            
                    props.onUpdateCart(res.data.cart)                  
                }                                                         
            })
            .catch(err => {                      
                console.log(err.message)         
                message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
            })             
        } else {
            props.history.push('/login')            
        }        
    }

    function onRemove() {
        if (props.user) {  
            axios({
                method: 'PUT',
                url: `${api.profiles}/${props.user.profile.id}/`,
                headers: {
                    'Content-Type': 'application/json',                                              
                },
                data: {
                    favorite: true,
                    item: props.item.id                           
                }
            })            
            .then(res => {
                if (res.status === 200 || res.status === 201) {                    
                    setFavorite(res.data.favorite)      
                    props.onRemove(res.data.favorite)    
                }                                                         
            })
            .catch(err => {                      
                console.log(err.message)         
                message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
            })             
        } else {
            props.history.push('/login')            
        }
    }

    function getCategory (categories) {
        let res = []
        categories.forEach(element => {
            res.push(element.name)
        })
        return res.toString()
    }

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <div>            
            <Card     
                className="product-card"
                hoverable
                size="small"                           
                cover={
                    <Link to={`/products/${props.item.id}`}>
                        <div style={{ position: 'relative' }}>
                            <img 
                                alt={props.item.name} 
                                src={props.item.images.length > 0 ? props.item.images[0].image : "https://epharmacy-bucket.s3.ap-northeast-1.amazonaws.com/static/blank.jpg"} 
                                style={{ width: '100%', height: 'auto' }} 
                            />
                            <Tag color="#2d2d2d" style={{ position: 'absolute', top: '8px', left: '8px' }}>Dseabi</Tag>
                            { props.item.is_brand === true ?
                                <Tag color="volcano" style={{ position: 'absolute', top: '8px', right: '0px' }}>Брэнд</Tag>
                            : <></>}                            
                        </div>
                    </Link>
                }                
                actions={ props.type === "list" ? [
                    favorite && favorite.find(x => x.id === props.item.id) ? (
                        <Tooltip title="Хадгалсан">
                            <HeartOutlined style={{ color: '#FF0000' }} key="save" onClick={addToSaved} />
                        </Tooltip>
                    ) : (
                        <Tooltip title="Хадгалах">
                            <HeartOutlined key="save" onClick={addToSaved} />
                        </Tooltip>
                    ),               
                    cart && cart.find(x => x.item.id === props.item.id) ? (                        
                        <Tooltip title="Сагсанд байгаа">
                            <ShoppingCartOutlined style={{ color: '#000' }} key="cart" onClick={() => addToCart("delete")} />
                        </Tooltip>                        
                    ) : (
                        <Tooltip title="Сагслах">
                            <ShoppingCartOutlined key="cart" onClick={() => addToCart("create")} />
                        </Tooltip>
                    ),                         
                    <Tooltip title="Дэлгэрэнгүй">
                        <EllipsisOutlined key="ellip" onClick={() => setVisible(true)} />
                    </Tooltip>,                                        
                ] : props.type === "favorite" ? [
                    <Button danger icon={<MinusCircleOutlined />} type="text" onClick={onRemove}>Хасах</Button>
                ] : <></>}
            >
                <Link to={`/products/${props.item.id}`}>
                    <Card.Meta 
                        title={<Tooltip title={props.item.name}>{props.item.name}</Tooltip>}    
                        description={getCategory(props.item.category)}                    
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>                        
                        <div>
                            <Typography.Title level={5} style={{ margin: '0', color: '#000' }}>{formatNumber(props.item.price)}₮</Typography.Title>
                        </div>
                        <div>
                            <StarFilled style={{ color: '#f9ca24' }} />
                            <Typography.Text> 4.7</Typography.Text>
                        </div>
                    </div>
                </Link>
                <Modal title={props.item.name} visible={visible} footer={false} onCancel={() => setVisible(false)}>
                    <Typography.Title level={5}>Тайлбар:</Typography.Title>
                    <Typography.Paragraph>
                        {props.item.description}
                    </Typography.Paragraph>
                    <Typography.Title level={5} style={{ margin: 0 }}>Найрлага:</Typography.Title>
                    <Typography.Paragraph>
                        {props.item.ingredients}                                
                    </Typography.Paragraph>
                    <Typography.Title level={5} style={{ margin: 0 }}>Хэрэглэх заавар:</Typography.Title>
                    <Typography.Paragraph>
                        {props.item.usage}                                
                    </Typography.Paragraph>
                    <Typography.Title level={5} style={{ margin: 0 }}>Хадгалах нөхцөл:</Typography.Title>
                    <Typography.Paragraph>
                        {props.item.caution}                                
                    </Typography.Paragraph>
                    <Typography.Title level={5} style={{ margin: 0 }}>Анхааруулга:</Typography.Title>
                    <Typography.Paragraph>
                        {props.item.caution}                                
                    </Typography.Paragraph>
                </Modal>
            </Card>            
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateCart: (cart) => dispatch(actions.updateCart(cart))
    }
}

export default connect(null, mapDispatchToProps)(ProductCard);