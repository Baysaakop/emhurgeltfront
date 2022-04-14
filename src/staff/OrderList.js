import React, { useEffect, useRef, useState } from "react"
import { Button, DatePicker, Divider, message, Popconfirm, Select, Space, Spin, Table, Tag, Typography } from "antd"
import axios from "axios"
import api from "../api"
import { CheckOutlined, DeleteOutlined, FilePdfOutlined, LoadingOutlined } from "@ant-design/icons"
import moment from "moment"
import { useReactToPrint } from "react-to-print";

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function OrderList (props) {
    const printRef = useRef()
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState()
    const [sorter, setSorter] = useState("-created_at")
    const [dateMin, setDateMin] = useState()
    const [dateMax, setDateMax] = useState()

    useEffect(() => {
        getOrders(props.state, page)
    }, [props.state, page, sorter, dateMin, dateMax]) // eslint-disable-line react-hooks/exhaustive-deps

    function getOrders(state, page) {
        setLoading(true)
        let url = "?"
        if (state === "1") {
            url += "is_payed=False&is_delivered=False&"
        } else if (state === "2") {
            url += "is_payed=False&is_delivered=True&"
        } else if (state === "3") {
            url += "is_payed=True&"
        }        

        if (dateMin) {
            url += "datemin=" + dateMin + "&"
        }
        if (dateMax) {
            url += "datemax=" + dateMax + "&"
        }
        if (sorter) {
            url += "sortby=" + sorter + "&"
        }
        if (page) {
            url += "page=" + page + "&"
        }
        url = url.substring(0, url.length - 1)

        axios({
            method: 'GET',
            url: api.orders + url           
        }).then(res => {                                                
            setOrders(res.data.results)          
            setTotal(res.data.count)
            setLoading(false)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
            setLoading(false)
        })
    }
    
    function onPageChange (pageNum, pageSize) {        
        setPage(pageNum)
    }

    function onSort (val) {
        setSorter(val)      
    }

    function onSelectDateRange (dates) {        
        setDateMin(moment(dates[0]).format("YYYY-MM-DD"))
        setDateMax(moment(dates[1]).format("YYYY-MM-DD"))
    }

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    function onDelivered(id) {
        axios({
            method: 'PUT',
            url: `${api.orders}/${id}/`,
            headers: {
                'Content-Type': 'application/json',     
                'Authorization': `Token ${props.token}`                                         
            },
            data: {                
                is_delivered: true                                       
            }
        })            
        .then(res => {
            getOrders(props.state, page)                                                             
        })
        .catch(err => {                      
            console.log(err.message)         
            message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
        }) 
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
            message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
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
            message.error("Алдаа гарлаа. Дахин оролдоно уу.")            
        }) 
    }
    
    const columns = [
        {
            title: 'Код',
            dataIndex: 'id',
            key: 'id',
            render: (id) => <a target="_blank" rel="noreferrer" href={`/orders/${id}`}>{orders.find(x => x.id === id).ref}</a>
        },
        {
            title: 'Захиалагч',
            dataIndex: 'customer',
            key: 'customer',
            render: (customer) => <a target="_blank" rel="noreferrer" href={`/staff/customers/${customer.id}`}>{customer.company_name}</a>
        },
        {
            title: 'Үнийн дүн',
            dataIndex: 'total',
            key: 'total',
            render: (total) => <Typography.Text>{formatNumber(total)}₮</Typography.Text>
        },
        {
            title: 'Ашигласан',
            dataIndex: 'bonus_used',
            key: 'bonus_used',
            render: (bonus_used) => <Typography.Text>{formatNumber(bonus_used)}₮</Typography.Text>
        },
        {
            title: 'Урамшуулал',
            dataIndex: 'bonus_granted',
            key: 'bonus_granted',
            render: (bonus_granted) => <Typography.Text>+{formatNumber(bonus_granted)}₮</Typography.Text>
        },
        {
            title: 'Утасны дугаар',
            dataIndex: 'phone_number',
            key: 'phone_number'
        },
        {
            title: 'Хаяг',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Огноо',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date) => moment(date).format("YYYY-MM-DD HH:mm")
        },
        {
            title: 'Хүргэлт',
            dataIndex: 'id',
            key: 'id',
            render: (id) => 
            orders.find(x => x.id === id).is_delivered ?
                <Tag color="success">Хүргэгдсэн</Tag>
            : <Popconfirm title="Хүргэгдсэн төлөвт шилжүүлэх үү?" onConfirm={() => onDelivered(id)}>
                <Button icon={<CheckOutlined />} size="middle" type="primary" />          
            </Popconfirm>  
        },
        {
            title: 'Төлбөр',
            dataIndex: 'id',
            key: 'id',
            render: (id) => 
            orders.find(x => x.id === id).is_payed ?
                <Tag color="success">Төлсөн</Tag>
            : <Popconfirm title="Төлсөн төлөвт шилжүүлэх үү?" onConfirm={() => onPayed(id)}>
                <Button icon={<CheckOutlined />} size="middle" type="primary" />          
            </Popconfirm>  
        },
        {
            title: 'Цуцлах',
            dataIndex: 'id',
            key: 'id',
            render: (id) => 
            orders.find(x => x.id === id).is_payed ?
                <Tag color="warning">Боломжгүй</Tag>
            : <Popconfirm title="Захиалгыг цуцлах уу?" onConfirm={() => onDecline(id)}>
                <Button danger icon={<DeleteOutlined />} size="middle" type="primary" />           
            </Popconfirm>  
        },
    ]
    
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    return (
        <div>     
            <div>                       
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                        <Typography.Title level={4} style={{ margin: 0 }}>{props.state === "2" ? 'Төлбөр төлөгдсөн захиалгууд' : 'Төлбөр дутуу захиалгууд'}</Typography.Title>
                    </div>
                    <div>
                        Хугацаа:
                        <DatePicker.RangePicker style={{ marginLeft: '8px' }} onChange={onSelectDateRange} />
                    </div>
                    <div>
                        Эрэмбэлэх:
                        <Select value={sorter} style={{ width: '180px', marginLeft: '8px' }} onChange={onSort}>
                            <Select.Option value="-created_at">Сүүлд нэмэгдсэн</Select.Option>
                            <Select.Option value="created_at">Анх нэмэгдсэн</Select.Option>
                            <Select.Option value="-total">Нийт дүн</Select.Option>                                    
                        </Select>      
                    </div>
                </div>
                <Divider style={{ margin: '12px 0' }} />
                { loading ? (
                    <div style={{ width: '100%', minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Spin indicator={loadingIcon} />
                    </div>
                ) : (    
                    <div ref={printRef} style={{ padding: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div><Typography.Text style={{ margin: 0 }}>Хугацаа: {dateMin ? moment(dateMin).format("YYYY-MM-DD") : "Nan"} ~ {dateMax ? moment(dateMax).format("YYYY-MM-DD") : "Nan"}</Typography.Text></div>
                            <Space size={8} wrap>
                                <img src="/logo.png" alt="dseabi" style={{ width: '24px', height: 'auto' }} /> 
                                <Typography.Title level={5} style={{ margin: 0 }}>Ди Эс И Эй Би Ай ХХК</Typography.Title>
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
                )}               
                <Button icon={<FilePdfOutlined />} onClick={handlePrint}>Татаж авах</Button>
            </div>                                     
        </div>
    )
}

export default OrderList