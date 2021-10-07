import { CarOutlined, HeartOutlined, MinusOutlined, PlusOutlined, ShopOutlined, ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Grid, Typography, Breadcrumb, Row, Col, Button, InputNumber, message, Divider, Tag, notification, Avatar, Space } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import InfiniteCarousel from 'react-leaf-carousel';
import axios from "axios"; 
import api from "../api";
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import logo from '../components/logo.png'
import * as translations from '../translation';

const { useBreakpoint } = Grid

function ProductDetail (props) {
    const screens = useBreakpoint()
    const [item, setItem] = useState()    
    const [count, setCount] = useState(1)
    const [user, setUser] = useState()
    const [favorite, setFavorite] = useState()
    const [cart, setCart] = useState()
    const [suggestedItems, setSuggestedItems] = useState()
    const [image, setImage] = useState()

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${api.items}/${props.match.params.id}/`,            
        }).then(res => {                        
            setItem(res.data)
            setImage(res.data.image1)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })        
        if (props.token) {
            getUser()
        }
        getSuggestedProducts()
    }, [props.match.params.id]) // eslint-disable-line react-hooks/exhaustive-deps    

    function getUser() {
        axios({
            method: 'GET',
            url: api.profile,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            }
        }).then(res => {                           
            setUser(res.data)
            setFavorite(res.data.profile.favorite)
            setCart(res.data.profile.cart)
        }).catch(err => {
            console.log(err)
        })
    }

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    function getType (types) {
        let res = []
        types.forEach(element => {
            if (props.language === "en") {
                res.push(element.name_en)
            } else {
                res.push(element.name)
            }
            
        })
        if (res.length > 0) {
            return res.toString()
        }
        return "-Ангилал хийгдээгүй-"
    }

    function getSuggestedProducts() {
        axios({
            method: 'GET',
            url: api.items           
        }).then(res => {                        
            setSuggestedItems(res.data.results)            
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }

    function addToSaved () {
        if (user) {  
            axios({
                method: 'PUT',
                url: `${api.profiles}/${user.profile.id}/`,
                headers: {
                    'Content-Type': 'application/json',            
                    'Authorization': `Token ${props.token}`                                  
                },
                data: {
                    favorite: true,
                    item: item.id                           
                }
            })            
            .then(res => {
                if (res.status === 200 || res.status === 201) {            
                    if (res.data.favorite.find(x => x.id === item.id)) {
                        notification['success']({
                            message: 'Бүтээгдэхүүнийг хадгаллаа.',
                            description: `'${item.name}' бүтээгдэхүүн таны хадгалсан бүтээгдэхүүнүүдийн жагсаалтад нэмэгдлээ.`,
                        });
                    } else {
                        notification['warning']({
                            message: 'Бүтээгдэхүүнийг хаслаа.',
                            description: `'${item.name}' бүтээгдэхүүн таны хадгалсан бүтээгдэхүүнүүдийн жагсаалтаас хасагдлаа.`,
                        });
                    }
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
        if (user) {  
            axios({
                method: 'PUT',
                url: `${api.profiles}/${user.profile.id}/`,
                headers: {
                    'Content-Type': 'application/json',      
                    'Authorization': `Token ${props.token}` 
                },
                data: {
                    cart: true,
                    mode: mode,
                    item: item.id,
                    count: count                           
                }
            })            
            .then(res => {
                if (res.status === 200 || res.status === 201) {              
                    if (res.data.cart.find(x => x.item.id === item.id)) {
                        notification['success']({
                            message: 'Сагсанд нэмэгдлээ.',
                            description: `'${item.name}' бүтээгдэхүүн таны сагсанд нэмэгдлээ.`,
                        });
                    } else {
                        notification['warning']({
                            message: 'Сагснаас хасагдлаа.',
                            description: `'${item.name}' бүтээгдэхүүн сагснаас хасагдлаа.`,
                        });
                    }      
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

    function order () {
        if (cart && cart.find(x => x.item.id === item.id)) {
            props.history.push("/profile?key=cart")
        } else {            
            addToCart("create")
            props.history.push("/profile?key=cart")
        }
    }

    function getSliderCount() {
        if (screens.xxl) {
            return 6
        } else if (screens.xl) {
            return 5
        } else if (screens.lg) {
            return 4
        } else if (screens.md) {
            return 3
        } else if (screens.sm) {
            return 2
        } else if (screens.xs) {
            return 1
        }
    }

    return (
        <div>    
            {item ? (
                <>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/">
                                {props.language === "en" ? translations.en.footer.home_page : translations.mn.footer.home_page}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/products">
                                {props.language === "en" ? translations.en.header.pharmacy : translations.mn.header.pharmacy}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>                   
                            {props.language === "en" && item.name_en ? item.name_en : item.name}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Row gutter={ screens.xs ? [8, 8] : [60, 16]} style={{ marginTop: '24px', marginLeft: 0, marginRight: 0, padding: '24px', background: '#fff', borderRadius: '2px' }}>
                        <Col xs={24} sm={24} md={24} lg={10}>
                            <div style={{ border: '1px solid #dedede' }}>
                                <div style={{ position: 'relative', padding: '100% 0 0 0'  }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                                        <img alt={item.name} src={image ? image : "https://epharmacy-bucket.s3.ap-northeast-1.amazonaws.com/static/blank.jpg"} style={{ width: '90%', height: '90%', objectFit: 'scale-down' }} />                            
                                    </div>                            
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '12px' }}>
                                { item.image1 ? (
                                    <div style={ item.image1 === image ? { width: '22%', border: '2px solid #000', cursor: 'pointer' } : { width: '22%', border: '1px solid #dedede', cursor: 'pointer'  }} onClick={() => setImage(item.image1)}>
                                        <div style={{ position: 'relative', padding: '100% 0 0 0' }}>
                                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                                                <img alt={item.image1} src={item.image1} style={{ width: '90%', height: '90%', objectFit: 'scale-down' }} />                            
                                            </div>                            
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                { item.image2 ? (
                                    <div style={ item.image2 === image ? { width: '22%', border: '2px solid #000', marginLeft: '4%', cursor: 'pointer'  } : { width: '22%', border: '1px solid #dedede', marginLeft: '4%', cursor: 'pointer'  }} onClick={() => setImage(item.image2)}>
                                        <div style={{ position: 'relative', padding: '100% 0 0 0' }}>
                                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                                                <img alt={item.image2} src={item.image2} style={{ width: '90%', height: '90%', objectFit: 'scale-down' }} />                            
                                            </div>                            
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}          
                                { item.image3 ? (
                                    <div style={ item.image3 === image ? { width: '22%', border: '2px solid #000', marginLeft: '4%', cursor: 'pointer'  } : { width: '22%', border: '1px solid #dedede', marginLeft: '4%', cursor: 'pointer'  }} onClick={() => setImage(item.image3)}>
                                        <div style={{ position: 'relative', padding: '100% 0 0 0' }}>
                                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                                                <img alt={item.image3} src={item.image3} style={{ width: '90%', height: '90%', objectFit: 'scale-down' }} />                            
                                            </div>                            
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}          
                                { item.image4 ? (
                                    <div style={ item.image4 === image ? { width: '22%', border: '2px solid #000', marginLeft: '4%', cursor: 'pointer'  } : { width: '22%', border: '1px solid #dedede', marginLeft: '4%', cursor: 'pointer'  }} onClick={() => setImage(item.image4)}>
                                        <div style={{ position: 'relative', padding: '100% 0 0 0' }}>
                                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                                                <img alt={item.image4} src={item.image4} style={{ width: '90%', height: '90%', objectFit: 'scale-down' }} />                            
                                            </div>                            
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}                                
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={14} style={{ padding: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <Typography.Title level={3} style={{ margin: 0 }}>{ props.language === "en" && item.name_en ? item.name_en : item.name }</Typography.Title>                            
                                    <Typography.Text type="secondary" style={{ fontSize: '16px' }}>{getType(item.types)}</Typography.Text>
                                </div>
                                <div>
                                    {/* <Typography.Title level={3}>{item.company ? item.company : undefined}</Typography.Title>  */}
                                    { item.is_brand ? <Avatar src={logo} alt="brand" style={{ height: '40px', width: '40px' }} /> : <></> }                
                                </div>
                            </div>                            
                            <Divider style={{ margin: '16px 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>                        
                                <div>                                    
                                    <Typography.Title level={5} style={{ margin: '0' }}>
                                        {props.language === "en" ? translations.en.product_detail.price : translations.mn.product_detail.price}
                                    </Typography.Title>
                                    <Typography.Title level={2} style={{ margin: '0' }}>{formatNumber(item.price)}₮</Typography.Title>
                                </div>                                                       
                                <div style={{ textAlign: 'center' }}>
                                    <Typography.Text style={{ margin: '0' }}>
                                        {props.language === "en" ? translations.en.product_detail.stock : translations.mn.product_detail.stock}
                                    </Typography.Text>                                    
                                    <Typography.Title level={4} style={{ margin: '0' }}>{formatNumber(item.count)}</Typography.Title>
                                </div>
                            </div>                            
                            <Divider style={{ margin: '16px 0' }} />  
                            <Space size={[8, 8]} wrap>
                                <div>
                                    <Button size="large" type="ghost" icon={<MinusOutlined />} onClick={() => count > 1 ? setCount(count - 1) : setCount(count)} />            
                                    <InputNumber readOnly value={count} size="large" min={1} max={item.count} style={{ width: '60px' }} />                                                                       
                                    <Button size="large" type="ghost" icon={<PlusOutlined />} onClick={() => count < item.count ? setCount(count + 1) : setCount(count)} />            
                                </div>    
                                {cart && cart.find(x => x.item.id === item.id) ? (
                                    <Button type="ghost" size="large" icon={<ShoppingCartOutlined />} onClick={() => addToCart("delete")} >
                                        {props.language === "en" ? translations.en.product_card.removecart : translations.mn.product_card.removecart}
                                    </Button>
                                ) : item.count > 0 ? (
                                    <Button type="ghost" size="large" icon={<ShoppingCartOutlined />} onClick={() => addToCart("create")} >
                                        {props.language === "en" ? translations.en.product_card.cart : translations.mn.product_card.cart}
                                    </Button>
                                ) : 
                                    <Button disabled type="ghost" size="large" icon={<ShoppingCartOutlined />} onClick={() => addToCart("create")} >
                                        {props.language === "en" ? translations.en.product_card.cart : translations.mn.product_card.cart}
                                    </Button>
                                }       
                                { item.count > 0 ? (
                                    <Button type="primary" size="large" icon={<ShoppingOutlined />} onClick={order}>
                                        {props.language === "en" ? translations.en.product_detail.order : translations.mn.product_detail.order}
                                    </Button>
                                ) : (
                                    <Button disabled type="primary" size="large" icon={<ShoppingOutlined />} onClick={order}>
                                        {props.language === "en" ? translations.en.product_detail.order : translations.mn.product_detail.order}
                                    </Button>
                                )}                        
                                <Button danger type="primary" size="large" icon={<HeartOutlined />} onClick={addToSaved}>
                                    { favorite && favorite.find(x => x.id === item.id) ? props.language === "en" ? translations.en.product_card.removewatchlist : translations.mn.product_card.removewatchlist :  props.language === "en" ? translations.en.product_card.watchlist : translations.mn.product_card.watchlist }                                    
                                </Button>
                                { item.is_brand ? (
                                    <Link to={`/productshop/${item.id}`}>
                                        <Button type="ghost" size="large" icon={<ShopOutlined />}>
                                            { props.language === "en" ? translations.en.product_detail.shops : translations.mn.product_detail.shops }
                                        </Button>                            
                                    </Link>
                                ) : (
                                    <></>
                                )}                                
                            </Space>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                            <Divider style={{ margin: '16px 0' }} />
                            {item.tags.map(tag => {
                                return (
                                    <Tag key={tag.id}>{tag.name}</Tag>
                                )                                
                            })}
                            <div style={{ border: '1px solid #dedede', width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '16px 8px', marginTop: '16px' }}>
                                <div><Avatar size={64} icon={<CarOutlined />} style={{ background: '#dedede', color: '#000', marginRight: '16px' }} /></div>
                                <div><Typography.Text>14:00 цагаас өмнө захиалсан бүтээгдэхүүн тухайн өдөртөө хүргэгдэх бөгөөд 14:00 цагаас хойш захиалсан бүтээгдэхүүн дараа өдөртөө багтан танд хүргэгдэх болно.</Typography.Text></div>
                            </div>
                            {/* <div style={{ border: '1px solid #dedede', width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '16px 8px', marginTop: '16px' }}>
                                <div><Avatar size={64} icon={<CreditCardOutlined />} style={{ background: '#dedede', color: '#000', marginRight: '16px' }} /></div>
                                <div><Typography.Text>14:00 цагаас өмнө захиалсан бүтээгдэхүүн тухайн өдөртөө хүргэгдэх бөгөөд 14:00 цагаас хойш захиалсан бүтээгдэхүүн дараа өдөртөө багтан танд хүргэгдэх болно.</Typography.Text></div>
                            </div>                             */}
                        </Col>
                    </Row>
                    <div style={{ marginTop: '24px', padding: '24px', background: '#fff', borderRadius: '2px' }}>
                        <Typography.Title level={5} style={{ margin: 0 }}>{props.language === "en" ? translations.en.product_card.description : translations.mn.product_card.description}:</Typography.Title>
                        <Typography.Paragraph>
                        { props.language === "en" && item.description_en ? item.description_en : item.description }                           
                        </Typography.Paragraph>
                        <Typography.Title level={5} style={{ margin: 0 }}>{props.language === "en" ? translations.en.product_card.ingredients : translations.mn.product_card.ingredients}:</Typography.Title>
                        <Typography.Paragraph>
                        { props.language === "en" && item.ingredients_en ? item.ingredients_en : item.ingredients}                                
                        </Typography.Paragraph>
                        <Typography.Title level={5} style={{ margin: 0 }}>{props.language === "en" ? translations.en.product_card.usage : translations.mn.product_card.usage}:</Typography.Title>
                        <Typography.Paragraph>
                        { props.language === "en" && item.usage_en ? item.usage_en : item.usage}                                                             
                        </Typography.Paragraph>
                        <Typography.Title level={5} style={{ margin: 0 }}>{props.language === "en" ? translations.en.product_card.storage : translations.mn.product_card.storage}:</Typography.Title>
                        <Typography.Paragraph>
                        { props.language === "en" && item.storage_en ? item.storage_en : item.storage}                                               
                        </Typography.Paragraph>
                        <Typography.Title level={5} style={{ margin: 0 }}>{props.language === "en" ? translations.en.product_card.caution : translations.mn.product_card.caution}:</Typography.Title>
                        <Typography.Paragraph>
                        { props.language === "en" && item.caution_en ? item.caution_en : item.caution}                                                   
                        </Typography.Paragraph>
                    </div>           
                    <Typography.Title level={4} style={{ marginTop: '24px' }}>Төстэй бүтээгдэхүүнүүд:</Typography.Title>
                    <div>                        
                        {suggestedItems ? (
                            <InfiniteCarousel                    
                                dots={false}
                                showSides={true}
                                sidesOpacity={.5}
                                sideSize={.1}
                                slidesToScroll={2}
                                slidesToShow={getSliderCount()}
                                scrollOnDevice={true}                    
                            >
                                {suggestedItems.map(item => {
                                    return (
                                        <ProductCard key={item.id} history={props.history} item={item} user={user} type="" />
                                    )
                                })}
                            </InfiniteCarousel>
                        ) : (
                            <></>
                        )}            
                    </div>         
                </>
            ) : (
                <></>
            )}                      
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token,
        language: state.language
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateCart: (cart) => dispatch(actions.updateCart(cart)),
        onUpdateSaved: (saved) => dispatch(actions.updateSaved(saved))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)