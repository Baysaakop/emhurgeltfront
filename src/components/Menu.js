import React, { useEffect, useState } from 'react';
import { Button, Grid, Menu, Badge, Tooltip, Tag, Avatar, Input, Typography, Divider, Affix, Select } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { GlobalOutlined, HeartOutlined, InfoCircleOutlined, MenuOutlined, PhoneOutlined, ReadOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined, MailOutlined, SettingOutlined, StarOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import axios from 'axios';
import api from '../api';
import logo from './logo.png'
import FlowerIcon from './FlowerIcon';
import * as translations from '../translation';

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

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <div className="menu">              
            {screens.xs ? (
                <div>
                    <div style={{ height: '40px', width: '100%', background: '#2ECC71', padding: '0 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                        <div style={{ background: '#fff', height: '80px', width: '100%', borderBottom: '1px solid #dedede', padding: '0 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Link to="/">
                                <div className="logo" style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'center' }}>                            
                                    <div>
                                        <Avatar size={48} src={logo} style={{ marginBottom: '8px', marginRight: '4px' }} />
                                    </div>
                                    <div>                                    
                                        <div style={{ margin: 0, fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '24px', color: '#000' }}>emhurgelt.mn</div>                       
                                        <div style={{ margin: 0, color: '#8e8e8e', fontSize: '14px', marginTop: '-8px' }}>
                                        { language === "en" ? translations.en.header.irmuun_az_pharmacy : translations.mn.header.irmuun_az_pharmacy }
                                        </div>       
                                    </div>                                                                                                                                    
                                </div>
                            </Link>
                            <Button type="primary" onClick={handleMenuCollapsed} style={{ background: '#2ECC71', color: '#fff', border: '1px solid #2ECC71' }}>
                                <MenuOutlined />
                            </Button>                            
                        </div>
                        <Menu 
                            theme="light"
                            mode="inline" 
                            hidden={collapsed} 
                            onClick={handleMenuClick}
                            selectedKeys={[current]}
                        >                
                            <Menu.Item key="about" style={{ fontSize: '16px' }} icon={<InfoCircleOutlined />} >
                                <Link to="/about">{ language === "en" ? translations.en.header.about_us : translations.mn.header.about_us }</Link>
                            </Menu.Item>             
                            <Menu.Item key="products" style={{ fontSize: '16px' }} icon={<ShopOutlined />}>
                                <Link to="/products">{ language === "en" ? translations.en.header.pharmacy : translations.mn.header.pharmacy }</Link>
                            </Menu.Item>
                            <Menu.Item key="posts" style={{ fontSize: '16px' }} icon={<ReadOutlined />}>
                                <Link to="/posts">{ language === "en" ? translations.en.header.blog : translations.mn.header.blog }</Link>
                            </Menu.Item>
                            <Menu.Item key="contact" style={{ fontSize: '16px' }} icon={<PhoneOutlined />}>
                                <Link to="/contact">{ language === "en" ? translations.en.header.contact : translations.mn.header.contact }</Link>
                            </Menu.Item>      
                            <Menu.Item key="saved" style={{ fontSize: '16px' }} icon={<HeartOutlined />}>
                                <Link to="/profile?key=saved" style={{ width: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>{ language === "en" ? translations.en.header.watchlist : translations.mn.header.watchlist }</div>
                                        <Avatar shape="square" style={{ background: '#2ed573', color: 'white' }}>
                                        {user && user.profile.favorite.length ? user.profile.favorite.length : 0}
                                        </Avatar>
                                    </div>
                                </Link>
                            </Menu.Item>      
                            <Menu.Item key="cart" style={{ fontSize: '16px' }} icon={<ShoppingCartOutlined />}>
                                <Link to="/profile?key=cart" style={{ width: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>{ language === "en" ? translations.en.header.cart : translations.mn.header.cart }</div>
                                        <Avatar shape="square" style={{ background: '#2ed573', color: 'white' }}>
                                        {user && user.profile.cart.length ? user.profile.cart.length : 0}
                                        </Avatar>
                                    </div>
                                </Link>
                            </Menu.Item>      
                            <Menu.Item key="brandproducts" style={{ fontSize: '16px', background: '#2ed573', color: '#fff' }} icon={<FlowerIcon />}>
                                <Link to="/brandproducts" style={{ color: '#fff' }}>{ language === "en" ? translations.en.header.featured_products : translations.mn.header.featured_products }</Link>
                            </Menu.Item>                          
                        </Menu>
                    </Affix>
                    <div style={{ height: '40px', width: '100%', padding: '0 5%', border: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <Input.Search placeholder={ language === "en" ? translations.en.header.search_with_dots : translations.mn.header.search_with_dots } style={{ width: '100%' }} onSearch={onSearch} />                                                          
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>                                                                                        
                            { user ? (
                                <>                               
                                    <Link to="/profile">
                                        <Tooltip title={ language === "en" ? translations.en.header.profile : translations.mn.header.profile }>                                        
                                            <Button type="primary" size="middle" icon={<UserOutlined />} style={{ marginLeft: '8px', border: 0 }} />
                                        </Tooltip>
                                    </Link> 
                                    <div style={{ marginLeft: '4px' }}>
                                        <div style={{ margin: 0, color: '#8e8e8e', fontSize: '12px' }}>
                                        { language === "en" ? translations.en.header.my_wallet : translations.mn.header.my_wallet }
                                        </div>      
                                        <div style={{ margin: 0, fontWeight: 'bold' }}>{formatNumber(user.profile.bonus)}₮</div>                       
                                    </div>                                                   
                                </>
                            ) : (
                                <Link to="/login">
                                    <Tooltip title="Нэвтрэх">
                                        <Button size="middle" icon={<UserOutlined />} style={{ marginLeft: '8px' }}>
                                        { language === "en" ? translations.en.header.signin : translations.mn.header.signin }
                                        </Button>                                                
                                    </Tooltip>
                                </Link>  
                            )} 
                        </div>                        
                    </div>                    
                </div>
            ) : (
                <div>                  
                    <div style={{ height: '40px', width: '100%', background: '#2ECC71', padding: '0 10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <GlobalOutlined style={{ color: '#fff', marginLeft: '4px', marginRight: '-4px' }} />
                            <Select defaultValue={props.language ? props.language : 'mn'} bordered={false} style={{ color: '#fff' }} onChange={onChangeLanguage} >
                                <Select.Option value="mn">Монгол</Select.Option>
                                <Select.Option value="en">English</Select.Option>
                            </Select>                            
                            <Divider type="vertical" style={{ background: '#fff' }} />
                            <Typography.Text style={{ color: '#fff', marginLeft: '8px', marginRight: '8px' }}><PhoneOutlined /> 7607-7722</Typography.Text>           
                            <Divider type="vertical" style={{ background: '#fff' }} />
                            <Typography.Text style={{ color: '#fff', marginLeft: '12px' }}><MailOutlined /> info@dseabi.mn</Typography.Text>                 
                        </div>
                        <div style={{ color: '#fff', fontWeight: 'bold' }}>
                            { language === "en" ? translations.en.header.dseabi_llc : translations.mn.header.dseabi_llc }      
                            <Avatar size={32} src="https://epharmacy-bucket.s3.ap-northeast-1.amazonaws.com/static/dseabi-logo.png" style={{ marginBottom: '4px', marginLeft: '4px' }} />
                        </div>
                    </div>           
                    <Affix offsetTop={0}>
                        <div style={{ background: '#fff', height: '80px', width: '100%', borderBottom: '1px solid #dedede', padding: '0 10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Link to="/">
                                <div className="logo" style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'center' }}>                            
                                    <div>
                                        <Avatar size={48} src={logo} style={{ marginRight: '4px' }} />
                                    </div>
                                    <div>                                    
                                        <div style={{ margin: 0, fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '24px', color: '#000' }}>emhurgelt.mn</div>                       
                                        <div style={{ margin: 0, color: '#8e8e8e', fontSize: '14px', marginTop: '-8px' }}>
                                        { language === "en" ? translations.en.header.irmuun_az_pharmacy : translations.mn.header.irmuun_az_pharmacy }
                                        </div>       
                                    </div>                                                                                                                                   
                                </div>
                            </Link>
                            <div className="user" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Input.Search placeholder={ language === "en" ? translations.en.header.search_with_dots : translations.mn.header.search_with_dots } style={{ width: '400px' }} onSearch={onSearch} />                                                                                     
                                <Link to="/profile?key=saved">
                                    <Badge count={user && user.profile.favorite.length ? user.profile.favorite.length : 0} overflowCount={9} size="default" style={{ background: '#2ed573' }} >
                                        <Tooltip placement="bottom" title={ language === "en" ? translations.en.header.watchlist : translations.mn.header.watchlist }>                                               
                                            <Button size="middle" icon={<HeartOutlined />} style={{ marginLeft: '12px' }} />                                                                    
                                        </Tooltip>
                                    </Badge>
                                </Link>                                               
                                <Link to="/profile?key=cart">
                                    <Badge count={user && user.profile.cart.length ? user.profile.cart.length : 0} overflowCount={9} size="default" style={{ background: '#2ed573' }} >
                                        <Tooltip placement="bottom" title={ language === "en" ? translations.en.header.cart : translations.mn.header.cart }>
                                            <Button size="middle" icon={<ShoppingCartOutlined />} style={{ marginLeft: '12px' }} />                                        
                                        </Tooltip>
                                    </Badge>
                                </Link>                        
                                { user ? (
                                    <>
                                        {parseInt(user.profile.role) < 3 ? (
                                            <Link to="/staff">
                                                <Tooltip placement="bottom" title="Ажилтан">                                           
                                                    <Button size="middle" icon={<SettingOutlined />} style={{ marginLeft: '12px' }} />
                                                </Tooltip>
                                            </Link>
                                        ) : (<></>)}
                                        <Link to="/profile">
                                            <Tooltip placement="bottom" title={ language === "en" ? translations.en.header.profile : translations.mn.header.profile }>                                        
                                                <Button type="primary" size="middle" icon={<UserOutlined />} style={{ marginLeft: '12px' }} />
                                            </Tooltip>
                                        </Link> 
                                        <div style={{ marginLeft: '12px' }}>
                                            <div style={{ margin: 0, color: '#8e8e8e', fontSize: '12px' }}>{ language === "en" ? translations.en.header.my_wallet : translations.mn.header.my_wallet }</div>      
                                            <div style={{ margin: 0, fontWeight: 'bold' }}>{formatNumber(user.profile.bonus)}₮</div>                       
                                        </div>                                                   
                                    </>
                                ) : (
                                    <Link to="/login">
                                        <Tooltip placement="bottom" title="Нэвтрэх">
                                            <Button size="middle" icon={<UserOutlined />} style={{ marginLeft: '12px' }}>
                                            { language === "en" ? translations.en.header.signin : translations.mn.header.signin }
                                            </Button>                                                
                                        </Tooltip>
                                    </Link>  
                                )}                                                                     
                            </div>
                        </div>
                    </Affix>         
                    <div style={{ height: '40px', width: '100%', padding: '0 10%', border: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Menu                         
                            mode="horizontal" 
                            onClick={handleMenuClick} 
                            selectedKeys={[current]}        
                            style={{ lineHeight: '36px', border: 0 }}                 
                        >   
                            <Menu.Item key="brandproducts" style={{ margin: 0 }}>
                                <Link to="/brandproducts">
                                    <Tag color="#2ed573" style={{ fontSize: '14px', padding: '3px 8px' }}>                                    
                                        <StarOutlined style={{ marginRight: '4px', color: '#fff', fontSize: '14px',  }} /> { language === "en" ? translations.en.header.featured_products : translations.mn.header.featured_products }
                                    </Tag>
                                </Link>
                            </Menu.Item>         
                            <Menu.Item key="about" icon={<InfoCircleOutlined />} >
                                <Link to="/about">{ language === "en" ? translations.en.header.about_us : translations.mn.header.about_us }</Link>
                            </Menu.Item>             
                            <Menu.Item key="products" icon={<ShopOutlined />} >
                                <Link to="/products">{ language === "en" ? translations.en.header.pharmacy : translations.mn.header.pharmacy }</Link>
                            </Menu.Item>
                            <Menu.Item key="posts" icon={<ReadOutlined />}>
                                <Link to="/posts">{ language === "en" ? translations.en.header.blog : translations.mn.header.blog }</Link>
                            </Menu.Item>
                            <Menu.Item key="contact" icon={<PhoneOutlined />}>
                                <Link to="/contact">{ language === "en" ? translations.en.header.contact : translations.mn.header.contact }</Link>
                            </Menu.Item>                 
                        </Menu>
                        <div>
                            {/* <Button type="text" icon={<ReloadOutlined />} />                             */}
                        </div>
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