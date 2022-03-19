import { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import api from '../api';
import { Breadcrumb, Button, Menu, Result, Row, Col } from "antd";
import { Link } from "react-router-dom";
import CategoryAdd from "../category/CategoryAdd";
import CategoryEdit from "../category/CategoryEdit";
import CompanyAdd from "../company/CompanyAdd";
import CompanyEdit from "../company/CompanyEdit";
import ProductAdd from "../product/ProductAdd";
import ProductEdit from "../product/ProductEdit";
import { BranchesOutlined, CloseCircleOutlined, ExperimentOutlined, HistoryOutlined, ShopOutlined, TagOutlined, TagsOutlined, UserOutlined } from "@ant-design/icons";
import Orders from "../account/Orders";
import Logout from "../account/Logout";
import TypeAdd from "../category/TypeAdd";
import TypeEdit from "../category/TypeEdit";
import SubCategoryAdd from "../category/SubCategoryAdd";
import SubCategoryEdit from "../category/SubCategoryEdit";
import SignupRequests from "../account/SignupRequests";

const { SubMenu } = Menu;

function Staff (props) {
    const [user, setUser] = useState()
    const [key, setKey] = useState("6")

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
                { !user || user.role === "3" ? (
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
                                Ажилтан ({user.username})
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ marginTop: '24px', padding: '16px', background: '#fff' }}>                            
                            <Row gutter={[24, 24]}>
                                <Col xs={24} sm={24} md={24} lg={6} xl={4}>
                                    <Menu
                                        mode="inline"
                                        defaultSelectedKeys={key}
                                        defaultOpenKeys={['sub2']}
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
                                        <SubMenu key="sub3" icon={<BranchesOutlined />} title="Төрөл">
                                            <Menu.Item key="8">Нэмэх</Menu.Item>
                                            <Menu.Item key="9">Засах / Устгах</Menu.Item>               
                                        </SubMenu>
                                        <SubMenu key="sub4" icon={<TagOutlined />} title="Ангилал">
                                            <Menu.Item key="10">Нэмэх</Menu.Item>
                                            <Menu.Item key="11">Засах / Устгах</Menu.Item>               
                                        </SubMenu>
                                        <SubMenu key="sub5" icon={<TagsOutlined />} title="Дэд ангилал">
                                            <Menu.Item key="12">Нэмэх</Menu.Item>
                                            <Menu.Item key="13">Засах / Устгах</Menu.Item>               
                                        </SubMenu>
                                        {/* <SubMenu key="sub6" icon={<TagsOutlined />} title="Таг">
                                            <Menu.Item key="14">Нэмэх</Menu.Item>
                                            <Menu.Item key="15">Засах / Устгах</Menu.Item> 
                                        </SubMenu> */}
                                        <SubMenu key="sub7" icon={<ShopOutlined />} title="Компани">
                                            <Menu.Item key="14">Нэмэх</Menu.Item>
                                            <Menu.Item key="15">Засах / Устгах</Menu.Item> 
                                        </SubMenu>       
                                        <SubMenu key="sub8" icon={<UserOutlined />} title="Хэрэглэгч">
                                            <Menu.Item key="16">Хүсэлтүүд</Menu.Item>                                            
                                        </SubMenu>       
                                        <Menu.Item key="99" icon={<CloseCircleOutlined />}>Гарах</Menu.Item>    
                                    </Menu>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={18} xl={20} style={{ padding: '16px' }}>                                    
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
                                        // Type Add                                        
                                        <TypeAdd token={props.token} />
                                    ) : key === "9" ? (
                                        // Type Edit
                                        <TypeEdit token={props.token} />
                                    ) : key === "10" ? (
                                        // Category Add
                                        <CategoryAdd token={props.token} />
                                    ) : key === "11" ? (
                                        // Category Edit
                                        <CategoryEdit token={props.token} />
                                    ) : key === "12" ? (
                                        // Sub-category Add
                                        <SubCategoryAdd token={props.token} />
                                    ) : key === "13" ? (
                                        // Sub-category Edit
                                        <SubCategoryEdit token={props.token} />
                                    ) : key === "14" ? (
                                        // Sub-category Add
                                        <CompanyAdd token={props.token} />
                                    ) : key === "15" ? (
                                        // Sub-category Edit
                                        <CompanyEdit token={props.token} />
                                    ) : key === "16" ? (                                        
                                        <SignupRequests token={props.token} />
                                    ) : key === "99" ? (
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

export default connect(mapStateToProps)(Staff);