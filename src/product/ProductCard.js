import { EllipsisOutlined, HeartOutlined, MinusCircleOutlined, ShoppingCartOutlined, StarFilled } from "@ant-design/icons";
import { Card, Tooltip, Typography, Modal, message, Button } from "antd";
import { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios"; 
import api from "../api";
import './ProductCard.css'
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import logo from '../components/logo.png';
import './ProductCard.css'

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
                    'Authorization': `Token ${props.token}`                                                
                },
                data: {
                    favorite: true,
                    item: props.item.id                           
                }
            })            
            .then(res => {
                if (res.status === 200 || res.status === 201) {                    
                    setFavorite(res.data.favorite)          
                    props.onUpdateSaved(res.data.favorite)           
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
            if ((cart && cart.find(x => x.item.id === props.item.id)) || props.item.count > 0) {
                axios({
                    method: 'PUT',
                    url: `${api.profiles}/${props.user.profile.id}/`,
                    headers: {
                        'Content-Type': 'application/json',     
                        'Authorization': `Token ${props.token}`                                              
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
                message.error("Уучлаарай. Бүтээгдэхүүн дууссан байна.")            
            }                                 
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
                    'Authorization': `Token ${props.token}`                                                    
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
                    props.onUpdateSaved(res.data.favorite)           
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

    function getType (types) {
        let res = []
        types.forEach(element => {
            res.push(element.name)
        })
        if (res.length > 0) {
            return res.toString()
        }
        return "-Ангилал хийгдээгүй-"
    }

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <div>            
            <Card     
                className="product-card"
                style={{ borderRadius: '2px' }}
                hoverable
                size="small"                           
                cover={
                    <Link to={`/products/${props.item.id}`}>
                        <div style={{ position: 'relative', paddingTop: '100%' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                                <img 
                                    alt={props.item.name} 
                                    src={props.item.image1 ? props.item.image1 : "https://epharmacy-bucket.s3.ap-northeast-1.amazonaws.com/static/blank.jpg"} 
                                    style={{ width: '90%', height: '90%', objectFit: 'scale-down' }} 
                                />                            
                                { props.item.is_featured === true ?                                    
                                    <div style={{ position: 'absolute', top: '8px', right: '8px', width: '32px' }}>
                                        <img alt="featured" src={logo} style={{ width: '100%', height: 'auto' }} />                                        
                                    </div>
                                    // <Tag color="geekblue" style={{ position: 'absolute', top: '8px', right: '0px' }}>Онцлох</Tag>
                                : <></>}    
                            </div>                            
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
                        title={
                            <Tooltip title={props.item.name}>{ props.language === "en" && props.item.name_en ? props.item.name_en : props.item.name }</Tooltip>
                        }    
                        description={getType(props.item.types)}                    
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>                        
                        <div>
                            <Typography.Title level={5} style={{ margin: '0', color: '#000' }}>{formatNumber(props.item.price)}₮</Typography.Title>
                        </div>
                        <div>
                            <StarFilled style={{ color: '#f9ca24' }} />
                            {/* <Typography.Text> 4.7</Typography.Text> */}
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
                        {props.item.storage}                                
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

const mapStateToProps = state => {
    return {
        language: state.language
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateCart: (cart) => dispatch(actions.updateCart(cart)),
        onUpdateSaved: (saved) => dispatch(actions.updateSaved(saved))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductCard));