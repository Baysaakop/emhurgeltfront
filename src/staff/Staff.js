import { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import api from '../api';
import { Breadcrumb, Button, Menu, Result, Row, Col, Badge } from "antd";
import { Link } from "react-router-dom";
import CompanyAdd from "../company/CompanyAdd";
import CompanyEdit from "../company/CompanyEdit";
import ProductAdd from "../product/ProductAdd";
import ProductEdit from "../product/ProductEdit";
import { ApartmentOutlined, AppstoreOutlined, CloseCircleOutlined, ExperimentOutlined, FileImageOutlined, HistoryOutlined, ShopOutlined, TagsOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import OrderList from "./OrderList";
import Logout from "../account/Logout";
import CategoryAdd from "../category/CategoryAdd";
import CategoryEdit from "../category/CategoryEdit";
import SubCategoryAdd from "../category/SubCategoryAdd";
import SubCategoryEdit from "../category/SubCategoryEdit";
import TagAdd from "../tag/TagAdd";
import TagEdit from "../tag/TagEdit";
import SignupRequests from "./Customer/SignupRequests";
import CustomerList from "./Customer/CustomerList";
import SliderAdd from "./SliderAdd";
import VideoAdd from "./VideoAdd";
import NewTopUsers from "./Customer/NewTopUsers";
import ProductCountUpdate from "../product/ProductCountUpdate";

const { SubMenu } = Menu;

function Staff (props) {
    const [user, setUser] = useState()
    const [key, setKey] = useState("21")
    const [topCount, setTopCount] = useState(0)

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
        getTopCount()
    }, [props.location, props.token]) // eslint-disable-line react-hooks/exhaustive-deps

    function onSelectMenuItem (e) {
        setKey(e.key)
    }

    function getTopCount() {
        axios({
            method: 'GET',
            url: api.users + "?level=3&bonus_collected=False",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            }
        }).then(res => {                                
            setTopCount(res.data.count)
        }).catch(err => {
            console.log(err.message)
        })
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
                                            <Menu.Item key="2">Хүргэгдсэн</Menu.Item>             
                                            <Menu.Item key="3">Төлбөр төлсөн</Menu.Item>                                            
                                        </SubMenu>
                                        <SubMenu key="sub2" icon={<UserOutlined />} title="Хэрэглэгч">
                                            <Menu.Item key="11">Хүсэлтүүд</Menu.Item>           
                                            <Menu.Item key="12">Жагсаалт</Menu.Item>             
                                            <Menu.Item key="13">3-р түвшин <Badge count={topCount} style={{ marginLeft: '16px' }} />
                                            </Menu.Item>                                            
                                        </SubMenu>       
                                        <SubMenu key="sub3" icon={<ExperimentOutlined />} title="Бүтээгдэхүүн">
                                            <Menu.Item key="21">Нэмэх</Menu.Item>
                                            <Menu.Item key="22">Засах / Устгах</Menu.Item>         
                                            <Menu.Item key="23">Үлдэгдэл шинэчлэх</Menu.Item>                                        
                                        </SubMenu>
                                        <SubMenu key="sub5" icon={<AppstoreOutlined />} title="Ангилал">
                                            <Menu.Item key="31">Нэмэх</Menu.Item>
                                            <Menu.Item key="32">Засах / Устгах</Menu.Item>               
                                        </SubMenu>
                                        <SubMenu key="sub6" icon={<ApartmentOutlined />} title="Дэд ангилал">
                                            <Menu.Item key="41">Нэмэх</Menu.Item>
                                            <Menu.Item key="42">Засах / Устгах</Menu.Item>               
                                        </SubMenu>
                                        <SubMenu key="sub7" icon={<TagsOutlined />} title="Таг">
                                            <Menu.Item key="51">Нэмэх</Menu.Item>
                                            <Menu.Item key="52">Засах / Устгах</Menu.Item> 
                                        </SubMenu>
                                        <SubMenu key="sub8" icon={<ShopOutlined />} title="Компани">
                                            <Menu.Item key="61">Нэмэх</Menu.Item>
                                            <Menu.Item key="62">Засах / Устгах</Menu.Item> 
                                        </SubMenu> 
                                        <SubMenu key="sub9" icon={<FileImageOutlined />} title="Slider">
                                            <Menu.Item key="71">Нэмэх</Menu.Item>
                                        </SubMenu> 
                                        <SubMenu key="sub10" icon={<VideoCameraOutlined />} title="Видео">
                                            <Menu.Item key="81">Нэмэх</Menu.Item>
                                        </SubMenu>                                               
                                        <Menu.Item key="99" icon={<CloseCircleOutlined />}>Гарах</Menu.Item>    
                                    </Menu>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={18} xl={20} style={{ padding: '16px' }}>                                    
                                    { key === "1" ? (
                                        <OrderList state="1" token={props.token} />
                                    ) : key === "2" ? (
                                        <OrderList state="2" token={props.token} />
                                    ) : key === "3" ? (
                                        <OrderList state="3" token={props.token} />
                                    ) : key === "11" ? (                                        
                                        <SignupRequests token={props.token} />
                                    ) : key === "12" ? (                                        
                                        <CustomerList token={props.token} />
                                    ) : key === "13" ? (                                        
                                        <NewTopUsers token={props.token} />
                                    ) : key === "21" ? (
                                        <ProductAdd token={props.token} />
                                    ) : key === "22" ? (
                                        <ProductEdit token={props.token} />
                                    ) : key === "23" ? (
                                        <ProductCountUpdate token={props.token} />
                                    ) : key === "31" ? (                                        
                                        <CategoryAdd token={props.token} />
                                    ) : key === "32" ? (                                        
                                        <CategoryEdit token={props.token} />
                                    ) : key === "41" ? (                                        
                                        <SubCategoryAdd token={props.token} />
                                    ) : key === "42" ? (                                        
                                        <SubCategoryEdit token={props.token} />
                                    ) : key === "51" ? (                                        
                                        <TagAdd token={props.token} />
                                    ) : key === "52" ? (                                        
                                        <TagEdit token={props.token} />
                                    ) : key === "61" ? (                                        
                                        <CompanyAdd token={props.token} />
                                    ) : key === "62" ? (                                        
                                        <CompanyEdit token={props.token} />
                                    ) : key === "71" ? (                                        
                                        <SliderAdd token={props.token} />
                                    ) : key === "81" ? (                                        
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