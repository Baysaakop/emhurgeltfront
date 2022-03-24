import { Breadcrumb, Col, List, Row, Typography, message, Radio, Space, Pagination, Select, Slider, Divider, Checkbox, Spin, Result, Button, Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ProductCard from "./ProductCard";
import axios from "axios";
import api from "../api";
import { connect } from 'react-redux';
import * as translations from '../translation';
import { UserOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

function ProductList (props) {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState()    
    const [categories, setCategories] = useState()    
    const [companies, setCompanies] = useState()    
    // const [tags, setTags] = useState()
    const [items, setItems] = useState()    
    const [isFeatured, setIsFeatured] = useState(false)    
    const [category, setCategory] = useState('0')
    const [subCategory, setSubCategory] = useState('0')
    const [company, setCompany] = useState("0")    
    // const [selectedTags, setSelectedTags] = useState([])
    const [priceLow, setPriceLow] = useState(0)
    const [priceHigh, setPriceHigh] = useState(200000)
    const [page, setPage] = useState(1)    
    const [total, setTotal] = useState()
    const [order, setOrder] = useState("-created_at")

    useEffect(() => {        
        setLoading(true)
        const params = new URLSearchParams(props.location.search)                        
        let param_is_featured = params.get('is_featured')  
        let param_category = params.get('category')       
        let param_subcategory = params.get('subcategory')    
        let param_company = params.get('company')       
        // let param_tags = params.get('tags')
        let param_pricelow = params.get('pricelow')
        let param_pricehigh = params.get('pricehigh')        
        let param_page = params.get('page')
        let param_order = params.get('order')
        if (param_is_featured !== undefined && param_is_featured !== null && param_is_featured === 'true') {
            setIsFeatured(true)
        } else {
            setIsFeatured(false)
        }        
        if (param_category !== undefined && param_category !== null) {
            setCategory(param_category)            
        } else {
            setCategory("0")
        }
        if (param_subcategory !== undefined && param_subcategory !== null) {
            setSubCategory(param_subcategory)            
        } else {
            setSubCategory("0")
        }
        if (param_company !== undefined && param_company !== null) {
            setCompany(param_company)
        } else {
            setCompany("0")
        }
        // if (param_tags !== undefined && param_tags !== null) {
        //     setSelectedTags(param_tags.toString().split(","))
        // } else {
        //     setSelectedTags([])
        // }
        if (param_pricelow !== undefined && param_pricelow !== null) {
            setPriceLow(param_pricelow)
        } else {
            setPriceLow(0)
        }
        if (param_pricehigh !== undefined && param_pricehigh !== null) {
            setPriceHigh(param_pricehigh)
        } else {
            setPriceHigh(200000)
        }
        if (param_page !== undefined && param_page !== null) {
            setPage(param_page)
        } else {
            setPage(1)
        }
        if (param_order !== undefined && param_order !== null) {
            setOrder(param_order)
        } else {
            setOrder("-created_at")
        }
        if (props.token && !user) {
            getUser()
        }        
        if (!categories) {
            getCategories()
        }
        if (!companies) {
            getCompanies()
        }
        // if (!tags) {
        //     getTags()
        // }
        getProducts(props.location.search)  
        setLoading(false)      
    }, [props.token, props.location.search]) // eslint-disable-line react-hooks/exhaustive-deps

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
        }).catch(err => {
            console.log(err)
        })
    }

    function getProducts (url) {                          
        axios({
            method: 'GET',
            url: api.items + url           
        }).then(res => {                                    
            setItems(res.data.results)
            setTotal(res.data.count)
        }).catch(err => {            
            if (err.message.endsWith("500")) {
                message.error("Шүүх утга буруу байна.")
            } else {
                message.error("Алдаа гарлаа. Хуудсыг дахин ачааллана уу.")
            }            
        })
    }

    function getCompanies () {
        axios({
            method: 'GET',
            url: `${api.companies}/`            
        }).then(res => {            
            setCompanies(res.data.results)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }

    function getCategories () {
        axios({
            method: 'GET',
            url: `${api.categories}`            
        }).then(res => {                   
            console.log(res.data.results)     
            setCategories(res.data.results)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }

    // function getTags () {
    //     axios({
    //         method: 'GET',
    //         url: `${api.tags}/`            
    //     }).then(res => {            
    //         setTags(res.data.results)
    //     }).catch(err => {
    //         message.error("Хуудсыг дахин ачааллана уу")
    //     })
    // }

    function onCheckFeatured (e) {        
        const params = new URLSearchParams(props.location.search)        
        params.delete("is_featured")
        if (!isFeatured) {
            params.append("is_featured", "true")
        }
        history.push(`/products?${params.toString()}`)
    }

    function onSelectCompany (e) {                
        const params = new URLSearchParams(props.location.search)        
        params.delete("company")
        if (parseInt(e.target.value) > 0) {
            params.append("company", e.target.value)            
        }
        history.push(`/products?${params.toString()}`)                
    }

    function onSelectCategory (e) {                
        const params = new URLSearchParams(props.location.search)        
        params.delete("category")
        params.delete("subcategory")
        if (parseInt(e.key) > 0) {
            params.append("category", e.key)            
        }
        history.push(`/products?${params.toString()}`)                
    }

    function onSelectSubCategory (e) {        
        const params = new URLSearchParams(props.location.search)        
        params.delete("subcategory")
        if (parseInt(e.key) > 0) {
            params.append("subcategory", e.key)            
        }
        history.push(`/products?${params.toString()}`)                
    }

    // function selectTag (tag, checked) {
    //     const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    //     const params = new URLSearchParams(props.location.search)        
    //     params.delete("tags")
    //     if (nextSelectedTags.length > 0) {
    //         params.append("tags", nextSelectedTags)
    //     }
    //     history.push(`/products?${params.toString()}`)        
    // }
    
    function onPriceChange (val) {        
        const params = new URLSearchParams(props.location.search)        
        params.delete("pricelow")
        params.delete("pricehigh")
        if (val[0] > 0) {
            params.append("pricelow", val[0])
        }
        if (val[1] < 200000) {
            params.append("pricehigh", val[1])
        }
        history.push(`/products?${params.toString()}`)        
    }

    function onPageChange (pageNum, pageSize) {        
        const params = new URLSearchParams(props.location.search)        
        params.delete("page")        
        if (pageNum > 1) {
            params.append("page", pageNum)
        }
        history.push(`/products?${params.toString()}`)      
    } 

    function onOrder (val) {
        const params = new URLSearchParams(props.location.search)        
        params.delete("order")        
        if (val !== "-created_at") {
            params.append("order", val)
        }
        history.push(`/products?${params.toString()}`)        
    }

    return (
        <div>    
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/">
                    { props.language === "en" ? translations.en.footer.home_page : translations.mn.footer.home_page }
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    { props.language === "en" ? translations.en.header.products : translations.mn.header.products }
                </Breadcrumb.Item>
            </Breadcrumb>
            { loading ? (
                <div style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin tip="Ачааллаж байна..." />
                </div>
            ) : user ? (            
                <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                    <Col xs={24} sm={24} md={24} lg={6}>                        
                        <div style={{ background: '#fff', marginBottom: '16px' }}>
                            <div style={{ background: '#009432', padding: '16px', borderRadius: '4px' }}>
                                <Typography.Title level={5} style={{ color: '#fff', margin: 0 }}>{ props.language === "en" ? translations.en.header.featured_products : translations.mn.header.featured_products }</Typography.Title>
                            </div>
                            <div style={{ padding: '16px' }}>
                                <Checkbox checked={isFeatured} onChange={onCheckFeatured}>
                                { props.language === "en" ? translations.en.product_list.yes : translations.mn.product_list.yes }
                                </Checkbox>
                            </div>
                        </div>

                        <div style={{ background: '#fff', marginBottom: '16px' }}>
                            <div style={{ background: '#009432', padding: '16px', borderRadius: '4px' }}>
                                <Typography.Title level={5} style={{ color: '#fff', margin: 0 }}>{ props.language === "en" ? translations.en.product_list.category : translations.mn.product_list.category }</Typography.Title>
                            </div>
                            <Menu
                                mode="inline"                                             
                                // openKeys={category}       
                                selectedKeys={subCategory}                                                                            
                                style={{ height: '100%' }}
                                onSelect={onSelectSubCategory}
                            >
                                {categories ? categories.map(cat => (
                                    <SubMenu key={cat.id.toString()} title={cat.name}>
                                        {cat.subcategories.map(sub => (
                                            <Menu.Item key={sub.id.toString()}>{sub.name}</Menu.Item>
                                        ))}
                                    </SubMenu>
                                )) : <></>}                                    
                            </Menu>
                        </div>

                        <div style={{ width: '100%', padding: '16px', background: '#fff', borderRadius: '2px' }}>                                                    

                            <Typography.Title level={5} style={{ marginTop: '16px' }}>Компани</Typography.Title>
                            <Radio.Group value={company} onChange={onSelectCompany}>
                                <Space direction="vertical">
                                    <Radio value="0">
                                        { props.language === "en" ? translations.en.product_list.all : translations.mn.product_list.all }
                                    </Radio>
                                    {companies ? companies.map(com => (
                                        <Radio key={com.id} value={com.id.toString()}>
                                            {com.name.toString()}
                                        </Radio>
                                    )) : <Spin />}
                                </Space>
                            </Radio.Group>

                            <Typography.Title level={5} style={{ marginTop: '16px' }}>{ props.language === "en" ? translations.en.product_list.category : translations.mn.product_list.category }:</Typography.Title>                                                        
                            <Typography.Title level={5} style={{ marginTop: '16px' }}>{ props.language === "en" ? translations.en.product_list.price : translations.mn.product_list.price }:</Typography.Title>   
                            <Slider 
                                range 
                                min={0} 
                                max={200000} 
                                defaultValue={[priceLow, priceHigh]} 
                                marks={
                                    { 
                                        0: {
                                            style: { 
                                                transform: 'translateX(0)' 
                                            }, 
                                            label: <span>{priceLow}₮</span>
                                        },                                     
                                        200000: { 
                                            style: { 
                                                transform: 'translateX(-100%)' 
                                            }, 
                                            label: <span>{priceHigh}₮</span> 
                                        } 
                                    }
                                } 
                                onAfterChange={onPriceChange}
                            />
                        </div>                    
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={18}>
                        <div style={{ background: '#fff', padding: '16px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '2px' }}>
                            <Typography.Title level={5} style={{ margin: 0 }}>{ props.language === "en" ? translations.en.product_list.total : translations.mn.product_list.total }: {total} { props.language === "en" ? translations.en.product_list.products : translations.mn.product_list.products }</Typography.Title>
                            <div>
                                <Select defaultValue={order} style={{ width: '180px' }} onChange={onOrder}>
                                    <Select.Option value="-created_at">{ props.language === "en" ? translations.en.product_list.newest : translations.mn.product_list.newest }</Select.Option>
                                    <Select.Option value="created_at">{ props.language === "en" ? translations.en.product_list.oldest : translations.mn.product_list.oldest }</Select.Option>
                                    <Select.Option value="price">{ props.language === "en" ? translations.en.product_list.lowtohigh : translations.mn.product_list.lowtohigh }</Select.Option>
                                    <Select.Option value="-price">{ props.language === "en" ? translations.en.product_list.hightolow : translations.mn.product_list.hightolow }</Select.Option>
                                </Select>                            
                            </div>
                        </div>
                        <List
                            grid={{
                                gutter: 24,
                                xs: 1,
                                sm: 2,
                                md: 3,
                                lg: 3,
                                xl: 4,
                                xxl: 4,
                            }}
                            dataSource={items ? items : undefined}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <ProductCard history={props.history} item={item} user={user} token={props.token} type="list" />
                                </List.Item>
                            )}
                        />
                        <Pagination
                            current={page}
                            total={total}
                            pageSize={36}
                            showSizeChanger={false}
                            showTotal={false}                        
                            onChange={onPageChange}
                        />
                    </Col>
                </Row>
            ) : (
                <div style={{ background: '#FFF', padding: '16px', marginTop: '16px' }}>
                    <Result
                        status="403"
                        title="Хуудас үзэх боломжгүй."
                        subTitle="Та эхлээд системд нэвтэрч орно уу."
                        extra={<Button icon={<UserOutlined />} type="primary" href="/login">Нэвтрэх</Button>}
                    />
                </div>
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

export default connect(mapStateToProps)(ProductList)