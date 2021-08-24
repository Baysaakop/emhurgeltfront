import { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import api from '../api';
import { Breadcrumb, Button, Menu, Result, Row, Col } from "antd";
import { Link } from "react-router-dom";
import CategoryAdd from "../category/CategoryAdd";
import CategoryEdit from "../category/CategoryEdit";
import TagAdd from "../tag/TagAdd";
import TagEdit from "../tag/TagEdit";
import ProductAdd from "../product/ProductAdd";
import ProductEdit from "../product/ProductEdit";
import { BranchesOutlined, ExperimentOutlined, HistoryOutlined, ReadOutlined, ShopOutlined, TagOutlined, TagsOutlined, UserOutlined } from "@ant-design/icons";
import Orders from "./Orders";

const { SubMenu } = Menu;

function Staff (props) {
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
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/">Нүүр хуудас</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Ажилтан
                </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ marginTop: '24px', padding: '16px', background: '#fff' }}>
                { !user || parseInt(user.profile.role) > 2 ? (
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
                ) : (
                    <div>
                        <Row gutter={[24, 24]}>
                            <Col xs={24} sm={24} md={24} lg={6} xl={4}>
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={key}
                                    defaultOpenKeys={['sub1']}
                                    style={{ height: '100%' }}
                                    onSelect={onSelectMenuItem}
                                >
                                    <SubMenu key="sub1" icon={<HistoryOutlined />} title="Захиалга">
                                        <Menu.Item key="1">Төлбөр төлөх</Menu.Item>
                                        <Menu.Item key="2">Хүлээж авсан</Menu.Item>
                                        <Menu.Item key="3">Хүргэлтэнд гарсан</Menu.Item>
                                        <Menu.Item key="4">Хүргэгдсэн</Menu.Item>
                                        <Menu.Item key="5">Цуцлагдсан</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" icon={<ExperimentOutlined />} title="Бүтээгдэхүүн">
                                        <Menu.Item key="6">Нэмэх</Menu.Item>
                                        <Menu.Item key="7">Засах / Устгах</Menu.Item>                                        
                                    </SubMenu>
                                    <SubMenu key="sub3" icon={<TagOutlined />} title="Төрөл">
                                        <Menu.Item key="8">Нэмэх</Menu.Item>
                                        <Menu.Item key="9">Засах / Устгах</Menu.Item>               
                                    </SubMenu>
                                    <SubMenu key="sub4" icon={<TagsOutlined />} title="Таг">
                                        <Menu.Item key="10">Нэмэх</Menu.Item>
                                        <Menu.Item key="11">Засах / Устгах</Menu.Item> 
                                    </SubMenu>
                                    <SubMenu key="sub5" icon={<ShopOutlined />} title="Компани">
                                        <Menu.Item key="12">Нэмэх</Menu.Item>
                                        <Menu.Item key="13">Засах / Устгах</Menu.Item> 
                                    </SubMenu>
                                    <SubMenu key="sub6" icon={<BranchesOutlined />} title="Салбар">
                                        <Menu.Item key="14">Нэмэх</Menu.Item>
                                        <Menu.Item key="15">Засах / Устгах</Menu.Item> 
                                    </SubMenu>
                                    <SubMenu key="sub7" icon={<ReadOutlined />} title="Мэдээлэл">
                                        <Menu.Item key="16">Нэмэх</Menu.Item>
                                        <Menu.Item key="17">Засах / Устгах</Menu.Item> 
                                    </SubMenu>
                                    <SubMenu key="sub8" icon={<UserOutlined />} title="Ажилтан">
                                        <Menu.Item key="18">Нэмэх</Menu.Item>
                                        <Menu.Item key="19">Засах / Устгах</Menu.Item> 
                                    </SubMenu>
                                </Menu>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={18} xl={20} style={{ padding: '16px' }}>
                                {/* <Typography.Title level={5}>{key}</Typography.Title> */}
                                { key === "1" ? (
                                    <Orders state="1" token={props.token} />
                                ) : key === "2" ? (
                                    <Orders state="2" token={props.token} />
                                ) : key === "3" ? (
                                    <Orders state="3" token={props.token} />
                                ) : key === "4" ? (
                                    <Orders state="4" token={props.token} />
                                ) : key === "5" ? (
                                    <Orders state="5" token={props.token} />
                                ) : key === "6" ? (
                                    <ProductAdd token={props.token} />
                                ) : key === "7" ? (
                                    <ProductEdit token={props.token} />
                                ) : key === "8" ? (
                                    <CategoryAdd token={props.token} />
                                ) : key === "9" ? (
                                    <CategoryEdit token={props.token} />
                                ) : key === "10" ? (
                                    <TagAdd token={props.token} />
                                ) : key === "11" ? (
                                    <TagEdit token={props.token} />
                                ) : <></>}
                            </Col>
                        </Row>
                    </div>
                    // <Tabs defaultActiveKey="1">
                    //     <Tabs.TabPane tab="Бүтээгдэхүүн" key="1">
                    //         <Tabs defaultActiveKey="1">
                    //             <Tabs.TabPane tab="Нэмэх" key="1">
                    //                 <ProductAdd token={props.token} />
                    //             </Tabs.TabPane>
                    //             <Tabs.TabPane tab="Засах / Хасах" key="2">
                    //                 <ProductEdit token={props.token} />
                    //             </Tabs.TabPane>
                    //         </Tabs>
                    //     </Tabs.TabPane>
                    //     <Tabs.TabPane tab="Төрөл" key="2">
                    //         <Tabs defaultActiveKey="1">
                    //             <Tabs.TabPane tab="Нэмэх" key="1">
                    //                 <CategoryAdd token={props.token} />
                    //             </Tabs.TabPane>
                    //             <Tabs.TabPane tab="Засах / Хасах" key="2">
                    //                 <CategoryEdit token={props.token} />
                    //             </Tabs.TabPane>
                    //         </Tabs>
                    //     </Tabs.TabPane>
                    //     <Tabs.TabPane tab="Таг" key="3">
                    //         <Tabs defaultActiveKey="1">
                    //             <Tabs.TabPane tab="Нэмэх" key="1">
                    //                 <TagAdd token={props.token} />
                    //             </Tabs.TabPane>
                    //             <Tabs.TabPane tab="Засах / Хасах" key="2">
                    //                 <TagEdit token={props.token} />
                    //             </Tabs.TabPane>
                    //         </Tabs>
                    //     </Tabs.TabPane>
                    //     <Tabs.TabPane tab="Компани" key="4">
                    //         <Tabs defaultActiveKey="1">
                    //             <Tabs.TabPane tab="Нэмэх" key="1">
                    //                 <CompanyAdd token={props.token} />
                    //             </Tabs.TabPane>
                    //             <Tabs.TabPane tab="Засах / Хасах" key="2">
                    //                 <CompanyEdit token={props.token} />
                    //             </Tabs.TabPane>
                    //         </Tabs>
                    //     </Tabs.TabPane>
                    //     <Tabs.TabPane tab="Салбар" key="5">
                    //         <Tabs defaultActiveKey="1">
                    //             <Tabs.TabPane tab="Нэмэх" key="1">
                    //                 <ShopAdd user={user} />
                    //             </Tabs.TabPane>
                    //             <Tabs.TabPane tab="Засах / Хасах" key="2">
                    //                 <ShopEdit user={user} />
                    //             </Tabs.TabPane>
                    //         </Tabs>
                    //     </Tabs.TabPane>
                    //     <Tabs.TabPane tab="Мэдээ" key="6">
                    //         Мэдээ
                    //     </Tabs.TabPane>
                    // </Tabs>
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

export default connect(mapStateToProps)(Staff);