import { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import api from '../api';
import { Breadcrumb, Button, Menu, Result, Row, Col } from "antd";
import { Link } from "react-router-dom";
import CompanyAdd from "../company/CompanyAdd";
import CompanyEdit from "../company/CompanyEdit";
import ProductAdd from "../product/ProductAdd";
import ProductEdit from "../product/ProductEdit";
import { CloseCircleOutlined, ExperimentOutlined, FileImageOutlined, HistoryOutlined, ShopOutlined, TagOutlined, TagsOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import OrderList from "./OrderList";
import Logout from "../account/Logout";
import CategoryAdd from "../category/CategoryAdd";
import CategoryEdit from "../category/CategoryEdit";
import SubCategoryAdd from "../category/SubCategoryAdd";
import SubCategoryEdit from "../category/SubCategoryEdit";
import SignupRequests from "./SignupRequests";
import SliderAdd from "./SliderAdd";
import VideoAdd from "./VideoAdd";
import CustomerList from "./CustomerList";

const { SubMenu } = Menu;

function Staff (props) {
    const [user, setUser] = useState()
    const [key, setKey] = useState("21")

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
                                        defaultOpenKeys={['sub3']}
                                        style={{ height: '100%' }}
                                        onSelect={onSelectMenuItem}
                                    >
                                        <SubMenu key="sub1" icon={<HistoryOutlined />} title="Захиалга">
                                            <Menu.Item key="1">Шинээр үүссэн</Menu.Item>             
                                            <Menu.Item key="2">Төлбөр төлсөн</Menu.Item>                                            
                                        </SubMenu>
                                        <SubMenu key="sub2" icon={<UserOutlined />} title="Хэрэглэгч">
                                            <Menu.Item key="11">Хүсэлтүүд</Menu.Item>           
                                            <Menu.Item key="12">Жагсаалт</Menu.Item>                                            
                                        </SubMenu>       
                                        <SubMenu key="sub3" icon={<ExperimentOutlined />} title="Бүтээгдэхүүн">
                                            <Menu.Item key="21">Нэмэх</Menu.Item>
                                            <Menu.Item key="22">Засах / Устгах</Menu.Item>                                        
                                        </SubMenu>
                                        <SubMenu key="sub5" icon={<TagOutlined />} title="Ангилал">
                                            <Menu.Item key="31">Нэмэх</Menu.Item>
                                            <Menu.Item key="32">Засах / Устгах</Menu.Item>               
                                        </SubMenu>
                                        <SubMenu key="sub6" icon={<TagsOutlined />} title="Дэд ангилал">
                                            <Menu.Item key="41">Нэмэх</Menu.Item>
                                            <Menu.Item key="42">Засах / Устгах</Menu.Item>               
                                        </SubMenu>
                                        {/* <SubMenu key="sub6" icon={<TagsOutlined />} title="Таг">
                                            <Menu.Item key="14">Нэмэх</Menu.Item>
                                            <Menu.Item key="15">Засах / Устгах</Menu.Item> 
                                        </SubMenu> */}
                                        <SubMenu key="sub7" icon={<ShopOutlined />} title="Компани">
                                            <Menu.Item key="51">Нэмэх</Menu.Item>
                                            <Menu.Item key="52">Засах / Устгах</Menu.Item> 
                                        </SubMenu> 
                                        <SubMenu key="sub8" icon={<FileImageOutlined />} title="Slider">
                                            <Menu.Item key="61">Нэмэх</Menu.Item>
                                        </SubMenu> 
                                        <SubMenu key="sub9" icon={<VideoCameraOutlined />} title="Видео">
                                            <Menu.Item key="62">Нэмэх</Menu.Item>
                                        </SubMenu>                                               
                                        <Menu.Item key="99" icon={<CloseCircleOutlined />}>Гарах</Menu.Item>    
                                    </Menu>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={18} xl={20} style={{ padding: '16px' }}>                                    
                                    { key === "1" ? (
                                        <OrderList state="1" token={props.token} />
                                    ) : key === "2" ? (
                                        <OrderList state="2" token={props.token} />
                                    ) : key === "11" ? (                                        
                                        <SignupRequests token={props.token} />
                                    ) : key === "12" ? (                                        
                                        <CustomerList token={props.token} />
                                    ) : key === "21" ? (
                                        <ProductAdd token={props.token} />
                                    ) : key === "22" ? (
                                        <ProductEdit token={props.token} />
                                    ) : key === "31" ? (                                        
                                        <CategoryAdd token={props.token} />
                                    ) : key === "32" ? (                                        
                                        <CategoryEdit token={props.token} />
                                    ) : key === "41" ? (                                        
                                        <SubCategoryAdd token={props.token} />
                                    ) : key === "42" ? (                                        
                                        <SubCategoryEdit token={props.token} />
                                    ) : key === "51" ? (                                        
                                        <CompanyAdd token={props.token} />
                                    ) : key === "52" ? (                                        
                                        <CompanyEdit token={props.token} />
                                    ) : key === "61" ? (                                        
                                        <SliderAdd token={props.token} />
                                    ) : key === "62" ? (                                        
                                        <VideoAdd token={props.token} />
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