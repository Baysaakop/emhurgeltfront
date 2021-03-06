import { Breadcrumb, Button, Col, Result, Row, Typography, Tag, Space, Popconfirm, Spin, Table, message, Divider } from "antd"
import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import api from "../../api"
import moment from 'moment'
import { LoadingOutlined, CheckOutlined, DeleteOutlined, FilePdfOutlined } from "@ant-design/icons"
import { useReactToPrint } from "react-to-print";

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function CustomerDetail (props) {
    const printRef = useRef()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState()
    const [customer, setCustomer] = useState()
    const [orders, setOrders] = useState()
    const [page, setPage] = useState(1)    
    const [total, setTotal] = useState()  

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
                if (res.data.role !== "3") {
                    axios({
                        method: 'GET',
                        url: `${api.users}/${props.match.params.id}/`,            
                    }).then(res => {                                                
                        setCustomer(res.data)
                        getOrders(res.data.id, 1)
                    }).catch(err => {
                        console.log(err)
                    })        
                }
            }).catch(err => {
                console.log(err.message)
            })
        }             
    }, [props.match.params.id]) // eslint-disable-line react-hooks/exhaustive-deps    

    function onPageChange (pageNum, pageSize) {        
        setPage(pageNum)
        getOrders(customer.id, pageNum)
    }
    
    function getOrders (id, page) {
        setLoading(true)
        let url = `${api.orders}/?customer=${id}`
        url += `&page=${page}`    
        axios({
            method: 'GET',
            url: url           
        }).then(res => {                                                
            setOrders(res.data.results)          
            setTotal(res.data.count)
            setLoading(false)
        }).catch(err => {
            console.log(err.message)
            setLoading(false)                                    
        })
    }

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    function onPayed(id) {
        axios({
            method: 'PUT',
            url: `${api.orders}/${id}/`,
            headers: {
                'Content-Type': 'application/json',     
                'Authorization': `Token ${props.token}`                                         
            },
            data: {                
                is_payed: true                                       
            }
        })            
        .then(res => {
            getOrders(props.state, page)                                                             
        })
        .catch(err => {                      
            console.log(err.message)         
            message.error("?????????? ????????????. ?????????? ???????????????? ????.")            
        }) 
    }    

    function onDecline(id) {
        axios({
            method: 'DELETE',
            url: `${api.orders}/${id}/`,
            headers: {
                'Content-Type': 'application/json',     
                'Authorization': `Token ${props.token}`                                         
            },
        })            
        .then(res => {
            getOrders(props.state, page)        
        })
        .catch(err => {                      
            console.log(err.message)         
            message.error("?????????? ????????????. ?????????? ???????????????? ????.")            
        }) 
    }

    const columns = [
        {
            title: '??????',
            dataIndex: 'id',
            key: 'id',
            render: (id) => <a target="_blank" rel="noreferrer" href={`/orders/${id}`}>{orders.find(x => x.id === id).ref}</a>
        },
        {
            title: '?????????? ??????',
            dataIndex: 'total',
            key: 'total',
            render: (total) => <Typography.Text>{formatNumber(total)}???</Typography.Text>
        },
        {
            title: '??????????????????',
            dataIndex: 'bonus_used',
            key: 'bonus_used',
            render: (bonus_used) => <Typography.Text>{formatNumber(bonus_used)}???</Typography.Text>
        },
        {
            title: '????????????????????',
            dataIndex: 'bonus_granted',
            key: 'bonus_granted',
            render: (bonus_granted) => <Typography.Text>+{formatNumber(bonus_granted)}???</Typography.Text>
        },
        {
            title: '???????????? ????????????',
            dataIndex: 'phone_number',
            key: 'phone_number'
        },
        {
            title: '????????',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: '??????????',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date) => moment(date).format("YYYY-MM-DD HH:mm")
        },
        {
            title: '??????????',
            dataIndex: 'id',
            key: 'id',
            render: (id) => 
            orders.find(x => x.id === id).is_payed ?
                <Tag color="success">????????????</Tag>
            : <Space size={8} wrap>
                   <Popconfirm title="???????????? ???????????? ?????????????????? ?????" onConfirm={() => onPayed(id)}>
                        <Button icon={<CheckOutlined />} size="middle" type="primary" />          
                    </Popconfirm>  
                    <Popconfirm title="?????????????????? ???????????? ?????" onConfirm={() => onDecline(id)}>
                        <Button danger icon={<DeleteOutlined />} size="middle" type="primary" />           
                    </Popconfirm>  
                </Space>
        },
    ];

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    return (
        <div>
            { !customer ? (
                <div style={{ background: '#fff', padding : '24px' }}>
                    <Result
                        status="403"
                        title="?????????????? ??????????????????"
                        subTitle="??????????????????, ???? ?????? ???????????????? ?????????????? ?????????????????? ??????????."
                        extra={
                            <Link to="/">
                                <Button size="large" type="primary">???????? ???????????? ?????? ??????????</Button>
                            </Link>
                        }
                    />
                </div>
            ) : (
                <div>
                     <Breadcrumb style={{ marginBottom: '24px' }}>
                        <Breadcrumb.Item>
                            <Link to="/">???????? ????????????</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/staff">?????????????? ({user.username})</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            ?????????????????? 
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={6}>
                            <div style={{ background: '#fff', borderRadius: '4px', padding: '16px' }}>
                                <Typography.Title level={4}>???????????????????????? ????????????????</Typography.Title>
                                <div style={{ marginBottom: '8px' }}>
                                    ???????????? ????????????: {customer.username}
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                    ?????????????????? ??????: {customer.company_name}
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                    ?????????????????? ????: {customer.company_id}
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                    E-mail: {customer.email}
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                    ????????: {customer.address}
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                    ??????: {customer.level}
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                    ???????? ??????: {formatNumber(customer.total)}???
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                    ??????????: {formatNumber(customer.bonus)}???
                                </div>
                            </div>                            
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={18}>
                            <div style={{ background: '#fff', borderRadius: '4px', padding: '16px' }}>
                                <Typography.Title level={4} style={{ margin: 0 }}>?????????????????? ????????</Typography.Title>
                                <Divider style={{ margin: '12px 0' }} />
                                { loading ? (
                                    <div style={{ width: '100%', minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Spin indicator={loadingIcon} />
                                    </div>
                                ) : (
                                    <div>
                                        <div ref={printRef} style={{ padding: '8px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                                <div><Typography.Title level={5} style={{ margin: 0 }}>??????????????????: {customer.company_name}</Typography.Title></div>
                                                <Space size={8} wrap>
                                                    <img src="/logo.png" alt="dseabi" style={{ width: '24px', height: 'auto' }} /> 
                                                    <Typography.Title level={5} style={{ margin: 0 }}>???? ???? ?? ???? ???? ???? ??????</Typography.Title>
                                                </Space>
                                            </div> 
                                            <Table 
                                                columns={columns} 
                                                dataSource={orders} 
                                                size="small" 
                                                pagination={{ 
                                                    current: page, 
                                                    pageSize: 36, 
                                                    total: total,     
                                                    onChange: onPageChange                
                                                }}
                                            />       
                                        </div>
                                        <Button icon={<FilePdfOutlined />} onClick={handlePrint}>?????????? ????????</Button>
                                    </div>
                                )}
                            </div>                               
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(CustomerDetail);