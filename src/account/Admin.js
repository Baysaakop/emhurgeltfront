import { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import api from '../api';
import { Breadcrumb, Button, Result, Tabs } from "antd";
import { Link } from "react-router-dom";
import CategoryAdd from "../category/CategoryAdd";
import CategoryEdit from "../category/CategoryEdit";
import TagAdd from "../tag/TagAdd";
import TagEdit from "../tag/TagEdit";
import CompanyAdd from "../company/CompanyAdd";
import CompanyEdit from "../company/CompanyEdit";
import ProductAdd from "../product/ProductAdd";
import ProductEdit from "../product/ProductEdit";
import ShopAdd from "../shop/ShopAdd";
import ShopEdit from "../shop/ShopEdit";

function Admin (props) {
    const [user, setUser] = useState()

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

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/">Нүүр хуудас</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Админ
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
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="Бүтээгдэхүүн" key="1">
                            <Tabs defaultActiveKey="1">
                                <Tabs.TabPane tab="Нэмэх" key="1">
                                    <ProductAdd token={props.token} />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Засах / Хасах" key="2">
                                    <ProductEdit token={props.token} />
                                </Tabs.TabPane>
                            </Tabs>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Төрөл" key="2">
                            <Tabs defaultActiveKey="1">
                                <Tabs.TabPane tab="Нэмэх" key="1">
                                    <CategoryAdd token={props.token} />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Засах / Хасах" key="2">
                                    <CategoryEdit token={props.token} />
                                </Tabs.TabPane>
                            </Tabs>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Таг" key="3">
                            <Tabs defaultActiveKey="1">
                                <Tabs.TabPane tab="Нэмэх" key="1">
                                    <TagAdd token={props.token} />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Засах / Хасах" key="2">
                                    <TagEdit token={props.token} />
                                </Tabs.TabPane>
                            </Tabs>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Компани" key="4">
                            <Tabs defaultActiveKey="1">
                                <Tabs.TabPane tab="Нэмэх" key="1">
                                    <CompanyAdd token={props.token} />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Засах / Хасах" key="2">
                                    <CompanyEdit token={props.token} />
                                </Tabs.TabPane>
                            </Tabs>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Салбар" key="5">
                            <Tabs defaultActiveKey="1">
                                <Tabs.TabPane tab="Нэмэх" key="1">
                                    <ShopAdd user={user} />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Засах / Хасах" key="2">
                                    <ShopEdit user={user} />
                                </Tabs.TabPane>
                            </Tabs>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Мэдээ" key="6">
                            Мэдээ
                        </Tabs.TabPane>
                    </Tabs>
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