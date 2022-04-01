import React, { useEffect, useState } from 'react';
import { Button, Grid, Menu, Badge, Tooltip, Tag, Avatar, Input, Typography, Affix, Select, Space } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { GlobalOutlined, GiftOutlined, HeartOutlined, InfoCircleOutlined, MenuOutlined, PhoneOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined, StarOutlined, FacebookFilled, GoogleOutlined, SettingOutlined, AppstoreAddOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import axios from 'axios';
import api from '../api';
import logo from './logo.png'
import FlowerIcon from './FlowerIcon';
import * as translations from '../translation';
import './Menu.css'

const { useBreakpoint } = Grid;

function CustomMenu (props) {    
    const screens = useBreakpoint()
    const [current, setCurrent] = useState('home')
    const [collapsed, setCollapsed] = useState(true)
    const [user, setUser] = useState()    
    const [cart, setCart] = useState([])
    const [saved, setSaved] = useState([])
    const [language, setLanguage] = useState()

    useEffect(() => {
        const menuItem = props.location.pathname.toString().split('/')[1]
        setCurrent(menuItem === '' ? 'home' : menuItem)
        if (props.token && props.token !== null) {
            if (!user) {
                getUser()
            }            
        } else {
            setUser(undefined)
        }
        if (props.cart && props.cart !== null && props.cart.length !== cart.length) {
            setCart(props.cart)
            getUser()
        }
        if (props.saved && props.saved !== null && props.saved.length !== saved.length) {
            setSaved(props.saved)
            getUser()
        }   
        setLanguage(props.language)
    }, [props.location, props.token, props.cart, props.saved, props.language]) // eslint-disable-line react-hooks/exhaustive-deps

    function getUser () {
        axios({
            method: 'GET',
            url: api.profile,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            }
        }).then(res => {                                
            setUser(res.data)            
        }).catch(err => {
            console.log(err.message)
        })
    }    

    const handleMenuClick = (e) => {               
        setCurrent(e.key);
        setCollapsed(true);        
    };

    const handleMenuCollapsed = () => {
        setCollapsed(!collapsed);
    }     

    function onSearch (val) {
        props.history.push(`/products?name=${val}`)
    }

    function onChangeLanguage (val) {                
        setLanguage(val)
        props.onChangeLanguage(val)
    }

    return (
        <div className="menu">              
            {screens.xxl || screens.xl ||screens.lg ? (
                <div>                  
                    <div style={
                        screens.xxl ? { height: '40px', width: '100%', background: '#009432', padding: '0 12%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
                        : screens.xl ? { height: '40px', width: '100%', background: '#009432', padding: '0 8%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
                        : { height: '40px', width: '100%', background: '#009432', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
                    }>
                        <div>                           
                            <GlobalOutlined style={{ color: '#fff', marginLeft: '8px', marginRight: '-4px' }} />
                            <Select defaultValue={props.language ? props.language : 'mn'} bordered={false} style={{ color: '#fff' }} onChange={onChangeLanguage} >
                                <Select.Option value="mn">Монгол</Select.Option>
                                <Select.Option value="en">English</Select.Option>
                            </Select>                            
                        </div>
                        <div>
                            <Space className="menu-social-icons" size={[0, 0]} wrap>
                                <Button className="facebook" shape="circle" type="link" target="_blank" rel="noreferrer" href="https://www.facebook.com/dseabi.mn" icon={<FacebookFilled />} />
                                <Button className="google" shape="circle" type="link" icon={<GoogleOutlined />} />
                            </Space>
                            <Typography.Text style={{ fontWeight: 'bold', color: '#fff' }}>
                            { language === "en" ? translations.en.header.dseabi_llc : translations.mn.header.dseabi_llc }      
                            </Typography.Text>
                            <Avatar size={32} src="https://epharmacy-bucket.s3.ap-northeast-1.amazonaws.com/static/dseabi-logo.png" style={{ marginBottom: '4px', marginLeft: '4px' }} />
                        </div>
                    </div>           
                    <Affix offsetTop={0}>                                    
                        <div style={
                            screens.xxl ? { background: '#fff', height: '80px', width: '100%', borderBottom: '1px solid #dedede', padding: '0 12%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
                            : screens.xl ? { background: '#fff', height: '80px', width: '100%', borderBottom: '1px solid #dedede', padding: '0 8%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
                            : { background: '#fff', height: '80px', width: '100%', borderBottom: '1px solid #dedede', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
                        }>
                            <Link to="/">
                                <div className="logo" style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'center' }}>                            
                                    <div>
                                        <Avatar size={48} src={logo} style={{ marginRight: '4px', marginTop: '4px' }} />
                                    </div>
                                    <div>                                    
                                        <div style={{ margin: 0, fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '24px', color: '#000' }}>DSEABI LLC</div>                       
                                        <div style={{ margin: 0, color: '#4c4c4c', fontSize: '14px', marginTop: '-8px' }}>
                                        {/* { language === "en" ? translations.en.header.irmuun_az_pharmacy : translations.mn.header.irmuun_az_pharmacy } */}
                                        Эм ханган нийлүүлэх төв
                                        </div>       
                                    </div>                                                                                                                                   
                                </div>
                            </Link>
                            <div className="user" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>                                
                                { user ? (
                                    <>
                                        <Input.Search size="default" placeholder={ language === "en" ? translations.en.header.search_with_dots : translations.mn.header.search_with_dots } style={{ width: '300px' }} onSearch={onSearch} />                                                                                                                                             
                                        {user.role === "1" ? (
                                            <>
                                                <Link to="/admin">
                                                    <Button danger type="primary" size="middle" icon={<SettingOutlined />} style={{ marginLeft: '12px' }}>
                                                        Админ
                                                    </Button>
                                                </Link>
                                                <Link to="/staff">
                                                    <Button type="primary" size="middle" icon={<AppstoreAddOutlined />} style={{ marginLeft: '12px' }}>
                                                        Ажилтан
                                                    </Button>
                                                </Link>
                                            </>
                                        ) : user.role === "2" ? (
                                            <Link to="/staff">
                                                <Tooltip placement="bottom" title="Ажилтан">                                           
                                                    <Button type="primary" size="middle" icon={<AppstoreAddOutlined />} style={{ marginLeft: '12px' }}>
                                                        Ажилтан
                                                    </Button>
                                                </Tooltip>
                                            </Link>
                                        ) : (
                                            <>
                                                <Link to="/profile?key=favorite">
                                                    <Badge count={user && user.favorite.length ? user.favorite.length : 0} overflowCount={9} size="default" style={{ background: '#009432' }} >
                                                        <Tooltip placement="bottom" title={ language === "en" ? translations.en.header.watchlist : translations.mn.header.watchlist }>                                               
                                                            <Button size="default" icon={<HeartOutlined />} style={{ marginLeft: '12px' }} />                                                                    
                                                        </Tooltip>
                                                    </Badge>
                                                </Link>                                               
                                                <Link to="/profile?key=cart">
                                                    <Badge count={user && user.cart.length ? user.cart.length : 0} overflowCount={9} size="default" style={{ background: '#009432' }} >
                                                        <Tooltip placement="bottom" title={ language === "en" ? translations.en.header.cart : translations.mn.header.cart }>
                                                            <Button size="default" icon={<ShoppingCartOutlined />} style={{ marginLeft: '12px' }} />                                        
                                                        </Tooltip>
                                                    </Badge>
                                                </Link>
                                                <Link to="/profile">
                                                    <Tooltip placement="bottom" title={ language === "en" ? translations.en.header.profile : translations.mn.header.profile }>                                        
                                                        <Button type="primary" size="default" icon={<UserOutlined />} style={{ marginLeft: '12px' }} />
                                                    </Tooltip>
                                                </Link> 
                                            </>
                                        )}                                                                                      
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login">
                                            <Button size="middle" type="primary" style={{ marginLeft: '12px' }}>
                                            { language === "en" ? translations.en.header.signin : translations.mn.header.signin }
                                            </Button>                                                
                                        </Link>  
                                        <Link to="/signup">
                                            <Button size="middle" type="dashed" style={{ marginLeft: '12px' }}>
                                            { language === "en" ? translations.en.header.signup : translations.mn.header.signup }
                                            </Button>                                                
                                        </Link>  
                                    </>
                                )}                                                                     
                            </div>
                        </div>    
                    </Affix>                             
                    <div style={
                        screens.xxl ? { height: '60px', width: '100%', padding: '0 12%', border: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
                        : screens.xl ? { height: '60px', width: '100%', padding: '0 8%', border: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
                        : { height: '60px', width: '100%', padding: '0 24px', border: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
                    }>
                        <Menu                                                     
                            mode="horizontal" 
                            onClick={handleMenuClick} 
                            selectedKeys={[current]}        
                            style={{ lineHeight: '36px', border: 0 }}                 
                        >   
                            <Menu.Item key="brandproducts" style={{ margin: '0 8px 0 0' }}>
                                <Link to="/brandproducts">
                                    <Tag color="#009432" style={{ fontSize: '14px', padding: '4px 8px', width: '100%' }}>                                    
                                        <StarOutlined style={{ marginRight: '4px', color: '#fff', fontSize: '14px',  }} /> { language === "en" ? translations.en.header.featured_products : translations.mn.header.featured_products }
                                    </Tag>
                                </Link>
                            </Menu.Item>         
                            <Menu.Item key="about" style={{ margin: '0 16px', fontSize: '14px' }}>
                                <Link to="/about">{ language === "en" ? translations.en.header.about_us : translations.mn.header.about_us }</Link>
                            </Menu.Item>             
                            { user ?
                            <Menu.Item key="products" style={{ margin: '0 16px', fontSize: '14px' }}>
                                <Link to="/products">{ language === "en" ? translations.en.header.products : translations.mn.header.products }</Link>
                            </Menu.Item>
                            : []}
                            {/* <Menu.Item key="posts" style={{ margin: '0 16px', fontSize: '14px' }}>
                                <Link to="/posts">{ language === "en" ? translations.en.header.blog : translations.mn.header.blog }</Link>
                            </Menu.Item> */}
                            <Menu.Item key="contact" style={{ margin: '0 16px', fontSize: '14px' }}>
                                <Link to="/contact">{ language === "en" ? translations.en.header.contact : translations.mn.header.contact }</Link>
                            </Menu.Item>         
                            <Menu.Item key="bonus" style={{ margin: '0 8px 0 0' }}>
                                <Link to="/bonus">
                                    <Tag color="#009432" style={{ fontSize: '14px', padding: '4px 8px', width: '100%' }}>                                    
                                        <GiftOutlined style={{ marginRight: '4px', color: '#fff', fontSize: '14px',  }} /> { language === "en" ? translations.en.header.bonus : translations.mn.header.bonus }
                                    </Tag>
                                </Link>
                            </Menu.Item>         
                            <Menu.Item key="videos" style={{ margin: '0 16px', fontSize: '14px' }}>
                                <Link to="/videos">{ language === "en" ? translations.en.header.videos : translations.mn.header.videos }</Link>
                            </Menu.Item>                 
                        </Menu>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <div>
                                    <Avatar shape="square" size={40} icon={<PhoneOutlined />} style={{ background: '#2C3E50' }} />
                                </div>
                                <div style={{ marginLeft: '8px' }}>
                                    <Typography.Title level={5} style={{ margin: 0 }}>Call now</Typography.Title>
                                    <Typography.Text style={{ fontSize: '14px' }}>1132-2817</Typography.Text>
                                </div>
                            </div>
                        </div>
                    </div>       
                </div>                                             
            ) : (
                <div>
                    <div style={{ height: '40px', width: '100%', background: '#009432', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <GlobalOutlined style={{ color: '#fff', marginLeft: '4px', marginRight: '-4px' }} />
                            <Select defaultValue="mn" bordered={false} style={{ color: '#fff' }} onChange={onChangeLanguage} >
                                <Select.Option value="mn">Монгол</Select.Option>
                                <Select.Option value="en">English</Select.Option>
                            </Select>                  
                        </div>
                        <div style={{ color: '#fff', fontWeight: 'bold' }}>
                            { language === "en" ? translations.en.header.dseabi_llc : translations.mn.header.dseabi_llc }
                            <Avatar size={32} src="https://epharmacy-bucket.s3.ap-northeast-1.amazonaws.com/static/dseabi-logo.png" style={{ marginBottom: '4px', marginLeft: '4px' }} />
                        </div>
                    </div>     
                    <Affix offsetTop={0}>
                        <div style={{ background: '#fff', height: '80px', width: '100%', borderBottom: '1px solid #dedede', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Link to="/">
                                <div className="logo" style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'center' }}>                            
                                    <div>
                                        <Avatar size={48} src={logo} style={{ marginBottom: '8px', marginRight: '4px' }} />
                                    </div>
                                    <div>                                    
                                        <div style={{ margin: 0, fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '24px', color: '#000' }}>DSEABI LLC</div>                       
                                        <div style={{ margin: 0, color: '#4c4c4c', fontSize: '14px', marginTop: '-8px' }}>
                                        {/* { language === "en" ? translations.en.header.irmuun_az_pharmacy : translations.mn.header.irmuun_az_pharmacy } */}
                                        Эм ханган нийлүүлэх төв
                                        </div>       
                                    </div>                                                                                                                                    
                                </div>
                            </Link>
                            <Button type="primary" onClick={handleMenuCollapsed}>
                                <MenuOutlined />
                            </Button>                            
                        </div>
                        <Menu 
                            theme="light"
                            mode="inline" 
                            hidden={collapsed} 
                            onClick={handleMenuClick}
                            selectedKeys={[current]}
                            style={{ height: '100vh' }}
                        >                
                            <Menu.Item key="brandproducts" style={{ fontSize: '16px', background: '#009432', color: '#fff' }} icon={<FlowerIcon />}>
                                <Link to="/brandproducts" style={{ color: '#fff' }}>{ language === "en" ? translations.en.header.featured_products : translations.mn.header.featured_products }</Link>
                            </Menu.Item>          
                            <Menu.Item key="about" style={{ fontSize: '16px' }} icon={<InfoCircleOutlined />} >
                                <Link to="/about">{ language === "en" ? translations.en.header.about_us : translations.mn.header.about_us }</Link>
                            </Menu.Item>       
                            { user ?       
                            <Menu.Item key="products" style={{ fontSize: '16px' }} icon={<ShopOutlined />}>
                                <Link to="/products">{ language === "en" ? translations.en.header.products : translations.mn.header.products }</Link>
                            </Menu.Item>
                            : []}
                            {/* <Menu.Item key="posts" style={{ fontSize: '16px' }} icon={<ReadOutlined />}>
                                <Link to="/posts">{ language === "en" ? translations.en.header.blog : translations.mn.header.blog }</Link>
                            </Menu.Item> */}
                            <Menu.Item key="contact" style={{ fontSize: '16px' }} icon={<PhoneOutlined />}>
                                <Link to="/contact">{ language === "en" ? translations.en.header.contact : translations.mn.header.contact }</Link>
                            </Menu.Item>  
                            <Menu.Item key="bonus" style={{ fontSize: '16px', background: '#009432', color: '#fff' }} icon={<GiftOutlined />}>
                                <Link to="/bonus" style={{ color: '#fff' }}>{ language === "en" ? translations.en.header.bonus : translations.mn.header.bonus }</Link>
                            </Menu.Item> 
                            <Menu.Item key="videos" style={{ fontSize: '16px' }} icon={<VideoCameraOutlined />}>
                                <Link to="/videos">{ language === "en" ? translations.en.header.videos : translations.mn.header.videos }</Link>
                            </Menu.Item>                                                                                                                                    
                        </Menu>
                    </Affix>
                    <div style={{ height: '60px', width: '100%', padding: '6px 16px', border: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <div>
                                <Avatar shape="square" size={40} icon={<PhoneOutlined />} style={{ background: '#2C3E50' }} />
                            </div>
                            <div style={{ marginLeft: '8px' }}>
                                <Typography.Title level={5} style={{ margin: 0 }}>Call now</Typography.Title>
                                <Typography.Text style={{ fontSize: '14px' }}>1132-2817</Typography.Text>
                            </div>
                        </div>                             
                        { user ? (
                            <div>
                                {user.role === "1" ? (
                                    <>
                                        <Link to="/admin">
                                            <Button danger type="primary" size="middle" icon={<SettingOutlined />} style={{ marginLeft: '12px' }}>
                                                Админ
                                            </Button>
                                        </Link>
                                        <Link to="/staff">
                                            <Button type="primary" size="middle" icon={<AppstoreAddOutlined />} style={{ marginLeft: '12px' }}>
                                                Ажилтан
                                            </Button>
                                        </Link>
                                    </>
                                ) : user.role === "2" ? (
                                    <Link to="/staff">
                                        <Tooltip placement="bottom" title="Ажилтан">                                           
                                            <Button type="primary" size="middle" icon={<AppstoreAddOutlined />} style={{ marginLeft: '12px' }}>
                                                Ажилтан
                                            </Button>
                                        </Tooltip>
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/profile?key=favorite">
                                            <Badge count={user && user.favorite.length ? user.favorite.length : 0} overflowCount={9} size="default" style={{ background: '#009432' }} >
                                                <Tooltip placement="bottom" title={ language === "en" ? translations.en.header.watchlist : translations.mn.header.watchlist }>                                               
                                                    <Button size="default" icon={<HeartOutlined />} style={{ marginLeft: '12px' }} />                                                                    
                                                </Tooltip>
                                            </Badge>
                                        </Link>                                               
                                        <Link to="/profile?key=cart">
                                            <Badge count={user && user.cart.length ? user.cart.length : 0} overflowCount={9} size="default" style={{ background: '#009432' }} >
                                                <Tooltip placement="bottom" title={ language === "en" ? translations.en.header.cart : translations.mn.header.cart }>
                                                    <Button size="default" icon={<ShoppingCartOutlined />} style={{ marginLeft: '12px' }} />                                        
                                                </Tooltip>
                                            </Badge>
                                        </Link>
                                        <Link to="/profile">
                                            <Tooltip placement="bottom" title={ language === "en" ? translations.en.header.profile : translations.mn.header.profile }>                                        
                                                <Button type="primary" size="default" icon={<UserOutlined />} style={{ marginLeft: '12px' }} />
                                            </Tooltip>
                                        </Link> 
                                    </>
                                )}                                                                            
                            </div>
                        ) : (
                            <div>
                                <Link to="/login">
                                    <Button type="primary" size="default" style={{ marginLeft: '12px' }}>
                                    { language === "en" ? translations.en.header.signin : translations.mn.header.signin }
                                    </Button>
                                </Link> 
                                <Link to="/signup">
                                    <Button type="dashed" size="default" style={{ marginLeft: '12px' }}>
                                    { language === "en" ? translations.en.header.signup : translations.mn.header.signup }
                                    </Button>
                                </Link> 
                            </div>
                        )}                                          
                    </div>                    
                </div>
            )}                        
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token,
        cart: state.cart,
        saved: state.saved,
        language: state.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeLanguage: (language) => dispatch(actions.changeLanguage(language))        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomMenu));