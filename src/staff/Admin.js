import { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import api from '../api';
import { Breadcrumb, Button, Menu, Result, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { CloseCircleOutlined, UserOutlined } from "@ant-design/icons";
import Logout from "../account/Logout";
import StaffSignUp from "./StaffSignup";

const { SubMenu } = Menu;

function Admin (props) {
    const [user, setUser] = useState()
    const [key, setKey] = useState("1")

    useEffect(() => {        
        if (props.token && props.token !== null && !user) {
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
    }, [props.location, props.token]) // eslint-disable-line react-hooks/exhaustive-deps

    function onSelectMenuItem (e) {
        setKey(e.key)
    }

    return (
        <div>            
            <div>
                { !user || user.role !== "1" ? (
                    <div style={{ background: '#fff', padding : '24px' }}>
                        <Result
                            status="403"
                            title="Нэвтрэх боломжгүй"
                            subTitle="Уучлаарай, та энэ хуудсанд нэвтрэх боломжгүй байна."
                            extra={
                                <Link to="/">
                                    <Button size="large" type="primary">Нүүр хуудас руу буцах</Button>
                                </Link>
                            }
                        />
                    </div>
                ) : (
                    <div>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/">Нүүр хуудас</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                Админ ({user.username})
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ marginTop: '24px', padding: '16px', background: '#fff' }}>                            
                            <Row gutter={[24, 24]}>
                                <Col xs={24} sm={24} md={24} lg={6} xl={4}>
                                    <Menu
                                        mode="inline"
                                        defaultSelectedKeys={key}
                                        defaultOpenKeys={['sub1']}
                                        style={{ height: '100%' }}
                                        onSelect={onSelectMenuItem}
                                    >                                        
                                       <SubMenu key="sub1" icon={<UserOutlined />} title="Ажилтан">
                                            <Menu.Item key="1">Бүртгэх</Menu.Item>    
                                            <Menu.Item key="2">Засах / устгах</Menu.Item>                                                
                                        </SubMenu>
                                        <Menu.Item key="3" icon={<CloseCircleOutlined />}>Гарах</Menu.Item>  
                                    </Menu>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={18} xl={20} style={{ padding: '16px' }}>
                                    {/* <Typography.Title level={5}>{key}</Typography.Title> */}
                                    { key === "1" ? (
                                        <StaffSignUp />
                                    ) : key === "2" ? (
                                        <></>
                                    ) : key === "3" ? (
                                        <Logout />
                                    ) : <></>}
                                </Col>
                            </Row>
                        </div>  
                    </div>                  
                )}
            </div>            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(Admin);