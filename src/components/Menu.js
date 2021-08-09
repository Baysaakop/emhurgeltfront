import React, { useEffect, useState } from 'react';
import { Button, Grid, Menu, Badge, Tooltip, Tag, Avatar, Input, Typography, Divider } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { GlobalOutlined, HeartOutlined, InfoCircleOutlined, MenuOutlined, PhoneOutlined, ReadOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import axios from 'axios';
import api from '../api';
import logo from './logo.png'
import FlowerIcon from './FlowerIcon';

const { useBreakpoint } = Grid;

function CustomMenu (props) {    
    const screens = useBreakpoint()
    const [current, setCurrent] = useState('home')
    const [collapsed, setCollapsed] = useState(true)
    const [user, setUser] = useState()    
    const [cart, setCart] = useState([])
    const [saved, setSaved] = useState([])

    useEffect(() => {
        const menuItem = props.location.pathname.toString().split('/')[1]
        setCurrent(menuItem === '' ? 'home' : menuItem)
        if (props.token && props.token !== null && !user) {
            getUser()
        }
        if (props.cart && props.cart !== null && props.cart.length !== cart.length) {
            setCart(props.cart)
            getUser()
        }
        if (props.saved && props.saved !== null && props.saved.length !== saved.length) {
            setSaved(props.saved)
            getUser()
        }
    }, [props.location, props.token, props.cart, props.saved]) // eslint-disable-line react-hooks/exhaustive-deps

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

    return (
        <div className="menu">              
            {screens.xs ? (
                <div>
                    <div style={{ height: '40px', width: '100%', background: '#2ECC71', padding: '0 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <Button type="text" icon={<GlobalOutlined />} style={{ color: '#fff', padding: '4px' }}>English</Button>             
                        </div>
                        <div style={{ color: '#fff', fontWeight: 'bold' }}>
                            Ди Эс И Эй Би Ай ХХК
                            <Avatar size={32} src="https://epharmacy-bucket.s3.ap-northeast-1.amazonaws.com/static/dseabi-logo.png" style={{ marginBottom: '4px', marginLeft: '4px' }} />
                        </div>
                    </div>     
                    <div style={{ height: '80px', width: '100%', borderBottom: '1px solid #dedede', padding: '0 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to="/">
                            <div className="logo" style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'center' }}>                            
                                <div>
                                    <Avatar size={48} src={logo} style={{ marginBottom: '8px', marginRight: '4px' }} />
                                </div>
                                <div>                                    
                                    <div style={{ margin: 0, fontWeight: 'bold', fontSize: '24px', color: 'black' }}>Ирмүүн аз</div>                       
                                    <div style={{ margin: 0, color: '#8e8e8e', fontSize: '12px', marginTop: '-8px' }}>Эм хүргэлтийн систем</div>       
                                </div>                                                                                                                                   
                            </div>
                        </Link>
                        <Button type="primary" onClick={handleMenuCollapsed} style={ props.darkMode ? { background: '#161b22', color: '#fff', border: '1px solid #fff' } : { background: '#fff', color: '#000', border: '1px solid #000' }}>
                            <MenuOutlined />
                        </Button>
                    </div>
                    <div style={{ height: '40px', width: '100%', padding: '0 5%', border: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <Input.Search placeholder="Хайх..." style={{ width: '100%' }} onSearch={onSearch} />                                                          
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>                                                                                        
                            { user ? (
                                <>                               
                                    <Link to="/profile">
                                        <Tooltip title="Профайл">                                        
                                            <Button danger type="primary" size="middle" icon={<UserOutlined />} style={{ marginLeft: '8px', background: '#2ed573', border: 0 }} />
                                        </Tooltip>
                                    </Link> 
                                    <div style={{ marginLeft: '4px' }}>
                                        <div style={{ margin: 0, color: '#8e8e8e', fontSize: '12px' }}>Таны хэтэвч</div>      
                                        <div style={{ margin: 0, fontWeight: 'bold' }}>₮7,319</div>                       
                                    </div>                                                   
                                </>
                            ) : (
                                <Link to="/login">
                                    <Tooltip title="Нэвтрэх">
                                        <Button size="middle" icon={<UserOutlined />} style={{ marginLeft: '8px' }}>Нэвтрэх</Button>                                                
                                    </Tooltip>
                                </Link>  
                            )} 
                        </div>                        
                    </div>
                    <Menu 
                        theme="light"
                        mode="inline" 
                        hidden={collapsed} 
                        onClick={handleMenuClick}
                        selectedKeys={[current]}
                    >                
                        <Menu.Item key="about" style={{ fontSize: '16px' }} icon={<InfoCircleOutlined />} >
                            <Link to="/about">Бидний тухай</Link>
                        </Menu.Item>             
                        <Menu.Item key="products" style={{ fontSize: '16px' }} icon={<ShopOutlined />}>
                            <Link to="/products">Эмийн сан</Link>
                        </Menu.Item>
                        <Menu.Item key="posts" style={{ fontSize: '16px' }} icon={<ReadOutlined />}>
                            <Link to="/posts">Мэдээлэл</Link>
                        </Menu.Item>
                        <Menu.Item key="contact" style={{ fontSize: '16px' }} icon={<PhoneOutlined />}>
                            <Link to="/contact">Холбогдох</Link>
                        </Menu.Item>      
                        <Menu.Item key="saved" style={{ fontSize: '16px' }} icon={<HeartOutlined />}>
                            <Link to="/profile?key=saved" style={{ width: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>Хадгалсан бүтээгдэхүүн</div>
                                    <Avatar shape="square" style={{ background: '#2ed573', color: 'white' }}>
                                    {user && user.profile.favorite.length ? user.profile.favorite.length : 0}
                                    </Avatar>
                                </div>
                            </Link>
                        </Menu.Item>      
                        <Menu.Item key="cart" style={{ fontSize: '16px' }} icon={<ShoppingCartOutlined />}>
                            <Link to="/profile?key=cart" style={{ width: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>Таны сагс</div>
                                    <Avatar shape="square" style={{ background: '#2ed573', color: 'white' }}>
                                    {user && user.profile.cart.length ? user.profile.cart.length : 0}
                                    </Avatar>
                                </div>
                            </Link>
                        </Menu.Item>      
                        <Menu.Item key="brandproducts" style={{ fontSize: '16px', background: '#2ed573', color: '#fff' }} icon={<FlowerIcon />}>
                            <Link to="/brandproducts" style={{ color: '#fff' }}>Онцлох бүтээгдэхүүн</Link>
                        </Menu.Item>                          
                    </Menu>
                </div>
            ) : (
                <div>                  
                    <div style={{ height: '40px', width: '100%', background: '#2ECC71', padding: '0 10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <Button type="text" icon={<GlobalOutlined />} style={{ color: '#fff', padding: '4px' }}>English</Button>
                            <Divider type="vertical" style={{ background: '#fff' }} />
                            <Typography.Text style={{ color: '#fff', marginLeft: '8px', marginRight: '8px' }}><PhoneOutlined /> 7607-7722</Typography.Text>           
                            <Divider type="vertical" style={{ background: '#fff' }} />
                            <Typography.Text style={{ color: '#fff', marginLeft: '12px' }}><MailOutlined /> info@dseabi.mn</Typography.Text>                 
                        </div>
                        <div style={{ color: '#fff', fontWeight: 'bold' }}>
                            Ди Эс И Эй Би Ай ХХК
                            <Avatar size={32} src="https://epharmacy-bucket.s3.ap-northeast-1.amazonaws.com/static/dseabi-logo.png" style={{ marginBottom: '4px', marginLeft: '4px' }} />
                        </div>
                    </div>                    
                    <div style={{ height: '80px', width: '100%', borderBottom: '1px solid #dedede', padding: '0 10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to="/">
                            <div className="logo" style={{ display: 'flex', justifyContent: 'flex-start', alignContent: 'center' }}>                            
                                <div>
                                    <Avatar size={48} src={logo} style={{ marginRight: '4px' }} />
                                </div>
                                <div>                                    
                                    <div style={{ margin: 0, fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '24px', color: '#000' }}>emhurgelt.mn</div>                       
                                    <div style={{ margin: 0, color: '#2ECC71', fontSize: '14px', marginTop: '-8px' }}>Ирмүүн Аз эмийн сан</div>       
                                </div>                                                                                                                                   
                            </div>
                        </Link>
                        <div className="user" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Input.Search placeholder="Бүтээгдэхүүн хайх..." style={{ width: '400px' }} onSearch={onSearch} />                                                                                     
                            <Link to="/profile?key=saved">
                                <Badge count={user && user.profile.favorite.length ? user.profile.favorite.length : 0} overflowCount={9} size="default" style={{ background: '#2ed573' }} >
                                    <Tooltip title="Хадгалсан бүтээгдэхүүн">                                               
                                        <Button size="middle" icon={<HeartOutlined />} style={{ marginLeft: '12px' }} />                                                                    
                                    </Tooltip>
                                </Badge>
                            </Link>                                               
                            <Link to="/profile?key=cart">
                                <Badge count={user && user.profile.cart.length ? user.profile.cart.length : 0} overflowCount={9} size="default" style={{ background: '#2ed573' }} >
                                    <Tooltip title="Таны сагс">
                                        <Button size="middle" icon={<ShoppingCartOutlined />} style={{ marginLeft: '12px' }} />                                        
                                    </Tooltip>
                                </Badge>
                            </Link>                        
                            { user ? (
                                <>
                                    {/* {parseInt(user.profile.role) < 3 ? (
                                        <Link to="/admin">
                                            <Tooltip title="Ажилтан">                                           
                                                <Button size="middle" icon={<DatabaseOutlined />} style={{ marginLeft: '12px' }} />
                                            </Tooltip>
                                        </Link>
                                    ) : (<></>)} */}
                                    <Link to="/profile">
                                        <Tooltip title="Профайл">                                        
                                            <Button type="primary" size="middle" icon={<UserOutlined />} style={{ marginLeft: '12px' }} />
                                        </Tooltip>
                                    </Link> 
                                    <div style={{ marginLeft: '12px' }}>
                                        <div style={{ margin: 0, color: '#8e8e8e', fontSize: '12px' }}>Таны хэтэвч</div>      
                                        <div style={{ margin: 0, fontWeight: 'bold' }}>₮7,319</div>                       
                                    </div>                                                   
                                </>
                            ) : (
                                <Link to="/login">
                                    <Tooltip title="Нэвтрэх">
                                        <Button size="middle" icon={<UserOutlined />} style={{ marginLeft: '12px' }}>Нэвтрэх</Button>                                                
                                    </Tooltip>
                                </Link>  
                            )}                                                                     
                        </div>
                    </div>
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
                                        <FlowerIcon style={{ marginRight: '4px', color: '#fff', fontSize: '14px',  }} /> Онцлох бүтээгдэхүүн
                                    </Tag>
                                </Link>
                            </Menu.Item>         
                            <Menu.Item key="about" icon={<InfoCircleOutlined />} >
                                <Link to="/about">Бидний тухай</Link>
                            </Menu.Item>             
                            <Menu.Item key="products" icon={<ShopOutlined />} >
                                <Link to="/products">Эмийн сан</Link>
                            </Menu.Item>
                            <Menu.Item key="posts" icon={<ReadOutlined />}>
                                <Link to="/posts">Мэдээлэл</Link>
                            </Menu.Item>
                            <Menu.Item key="contact" icon={<PhoneOutlined />}>
                                <Link to="/contact">Холбогдох</Link>
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
        saved: state.saved
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomMenu));