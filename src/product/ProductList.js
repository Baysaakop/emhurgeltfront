import { Breadcrumb, Col, Input, List, Row, Typography, message, Tag, Radio, Space, Pagination, Select } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import axios from "axios";
import api from "../api";
import { connect } from 'react-redux';

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
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState()

    useEffect(() => {
        console.log(props.location.search)
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
        getProducts(search, category, selectedTags, page)        
    }, [props.token, search, category, selectedTags, page]) // eslint-disable-line react-hooks/exhaustive-deps

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

    function getProducts (search, category, selectedTags, page) {        
        let url = `${api.items}/?`
        if (search) {
            url += `name=${search}`
        }
        if (category) {
            url += `&category=${category}`
        }
        if (selectedTags && selectedTags.length > 0) {
            url += `&tags=${selectedTags}`
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

    function showTotal(total) {
        return `Нийт ${total} бүтээгдэхүүн:`;
    }   

    return (
        <div>    
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/">
                        Нүүр хуудас
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Эмийн сан
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
                <Col xs={24} sm={24} md={24} lg={6}>
                    <div style={{ width: '100%', padding: '16px', background: '#fff', borderRadius: '2px' }}>
                        <Typography.Title level={5}>Бүтээгдэхүүн хайх:</Typography.Title>
                        <Search placeholder="Бүтээгдэхүүний нэр" onSearch={onSearch} enterButton />
                        <Typography.Title level={5} style={{ marginTop: '16px' }}>Ангилал:</Typography.Title>
                        <Radio.Group onChange={onSelectCategory}>
                            <Space direction="vertical">
                                {categories ? categories.map(cat => (
                                    <Radio value={cat.id}>{cat.name}</Radio>
                                )) : <></>}
                            </Space>
                        </Radio.Group>
                        <Typography.Title level={5} style={{ marginTop: '16px' }}>Төрөл:</Typography.Title>
                        {tags ? tags.map(tag => (
                            <CheckableTag
                                key={tag.id}
                                checked={selectedTags ? selectedTags.indexOf(tag.id) > -1 : false}
                                onChange={checked => selectTag(tag.id, checked)}
                            >
                                {tag.name}
                            </CheckableTag>
                        )) : <></>}                        
                    </div>                    
                </Col>
                <Col xs={24} sm={24} md={24} lg={18}>
                    <div style={{ background: '#fff', padding: '16px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography.Title level={5} style={{ margin: 0 }}>Нийт: {total} бүтээгдэхүүн</Typography.Title>
                        <div>
                            <Select defaultValue="newfirst" style={{ width: '180px' }}>
                                <Select.Option value="newfirst">Шинэ нь эхэндээ</Select.Option>
                                <Select.Option value="oldfirst">Хуучин нь эхэндээ</Select.Option>
                                <Select.Option value="pricelow">Үнэ өсөхөөр</Select.Option>
                                <Select.Option value="pricehigh">Үнэ буурахаар</Select.Option>
                            </Select>                            
                        </div>
                    </div>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 2,
                            sm: 2,
                            md: 3,
                            lg: 4,
                            xl: 4,
                            xxl: 5,
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
                        showTotal={showTotal}
                        size="small"
                        onChange={onPageChange}
                    />
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(ProductList)