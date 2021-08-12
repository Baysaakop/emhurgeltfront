import { Breadcrumb, Col, Input, List, Row, Typography, message, Tag, Radio, Space, Pagination, Select, Slider, Divider } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import axios from "axios";
import api from "../api";
import { connect } from 'react-redux';
import * as translations from '../translation';

const { Search } = Input
const { CheckableTag } = Tag

function ProductList (props) {
    const [user, setUser] = useState()
    const [categories, setCategories] = useState()    
    const [tags, setTags] = useState()
    const [items, setItems] = useState()
    const [selectedTags, setSelectedTags] = useState([])
    const [search, setSearch] = useState()
    const [category, setCategory] = useState()
    const [priceRange, setPriceRange] = useState()
    const [page, setPage] = useState(1)    
    const [total, setTotal] = useState()
    const [order, setOrder] = useState("-created_at")

    useEffect(() => {        
        if (props.location.search.length > 0 && props.location.search.includes("name=")) {
            let s = props.location.search.split("name=")[1]
            if (s !== search) {
                setSearch(s)              
            }            
        }
        if (props.token && !user) {
            getUser()
        }        
        if (!categories) {
            getCategories()
        }
        if (!tags) {
            getTags()
        }
        getProducts(search, category, selectedTags, priceRange, order, page)        
    }, [props.token, search, category, selectedTags, priceRange, order, page]) // eslint-disable-line react-hooks/exhaustive-deps

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

    function getProducts (search, category, selectedTags, priceRange, order, page) {        
        let url = `${api.items}/?`
        if (search) {
            url += `name=${search}`
        }
        if (category && category > 0) {
            url += `&category=${category}`
        }
        if (selectedTags && selectedTags.length > 0) {
            url += `&tags=${selectedTags}`
        }
        if (priceRange) {
            url += `&pricelow=${priceRange[0]}&pricehigh=${priceRange[1]}`
        }
        if (order) {
            url += `&order=${order}`
        }
        url += `&page=${page}`        
        axios({
            method: 'GET',
            url: url           
        }).then(res => {                        
            setItems(res.data.results)
            setTotal(res.data.count)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }

    function getCategories () {
        axios({
            method: 'GET',
            url: `${api.categories}/`            
        }).then(res => {            
            setCategories(res.data.results)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }

    function getTags () {
        axios({
            method: 'GET',
            url: `${api.tags}/`            
        }).then(res => {            
            setTags(res.data.results)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }

    function selectTag (tag, checked) {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        setSelectedTags(nextSelectedTags)
    }

    function onSearch (val) {
        setSearch(val)
    }

    function onSelectCategory (e) {
        setCategory(e.target.value)
    }

    function onPageChange (pageNum, pageSize) {        
        setPage(pageNum)
    } 

    function onOrder (val) {
        setOrder(val)        
    }

    function onPriceChange (val) {
        setPriceRange(val)
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
                    { props.language === "en" ? translations.en.header.pharmacy : translations.mn.header.pharmacy }
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                <Col xs={24} sm={24} md={24} lg={6}>
                    <div style={{ width: '100%', padding: '16px', background: '#fff', borderRadius: '2px' }}>
                        <Typography.Title level={5}>{ props.language === "en" ? translations.en.product_list.search_products : translations.mn.product_list.search_products }:</Typography.Title>
                        <Search placeholder={ props.language === "en" ? translations.en.header.search_with_dots : translations.mn.header.search_with_dots } onSearch={onSearch} enterButton />
                        <Divider />
                        <Typography.Title level={5} style={{ marginTop: '16px' }}>{ props.language === "en" ? translations.en.product_list.category : translations.mn.product_list.category }:</Typography.Title>
                        <Radio.Group defaultValue={0} onChange={onSelectCategory}>
                            <Space direction="vertical">
                                <Radio value={0}>
                                    Бүгд
                                </Radio>
                                {categories ? categories.map(cat => (
                                    <Radio value={cat.id}>
                                        { props.language === "en" ? cat.name_en : cat.name }
                                    </Radio>
                                )) : <></>}
                            </Space>
                        </Radio.Group>
                        <Divider />
                        <Typography.Title level={5} style={{ marginTop: '16px' }}>{ props.language === "en" ? translations.en.product_list.tags : translations.mn.product_list.tags }:</Typography.Title>
                        {tags ? tags.map(tag => (
                            <CheckableTag
                                key={tag.id}
                                checked={selectedTags ? selectedTags.indexOf(tag.id) > -1 : false}
                                style={{ fontSize: '14px', marginTop: '8px' }}
                                onChange={checked => selectTag(tag.id, checked)}
                            >
                                {tag.name}
                            </CheckableTag>
                        )) : <></>}                     
                        <Divider />
                        <Typography.Title level={5} style={{ marginTop: '16px' }}>{ props.language === "en" ? translations.en.product_list.price : translations.mn.product_list.price }:</Typography.Title>   
                        <Slider 
                            range 
                            min={0} 
                            max={100000} 
                            defaultValue={[0, 100000]} 
                            marks={
                                { 
                                    0: '0₮', 
                                    100000: { 
                                        style: { 
                                            transform: 'translateX(-100%)' 
                                        }, 
                                        label: <span>100,000₮</span> 
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
                            <List.Item>
                                <ProductCard history={props.history} item={item} user={user} type="list" />
                            </List.Item>
                        )}
                    />
                    <Pagination
                        current={page}
                        total={total}
                        pageSize={24}
                        showSizeChanger={false}
                        showTotal={false}                        
                        onChange={onPageChange}
                    />
                </Col>
            </Row>
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