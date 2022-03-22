import { useEffect, useState } from "react"
import { Button, message, Popconfirm, Popover, Space, Table, Tag, Typography } from "antd"
import axios from "axios"
import api from "../api"
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons"
import moment from "moment"

function OrderList (props) {

    const [orders, setOrders] = useState()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState()

    useEffect(() => {
        getOrders(props.state, page)
    }, [props.state, page])

    function getOrders(state, page) {
        let url = api.orders + "?"

        if (state === "1") {
            url += "is_payed=False"
        } else if (state === "2") {
            url += "is_payed=True"
        }        
        url += `&page=${page}`    
        axios({
            method: 'GET',
            url: url           
        }).then(res => {               
            console.log(res)                           
            setOrders(res.data.results)          
            setTotal(res.data.count)
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
    }
    
    function onPageChange (pageNum, pageSize) {        
        setPage(pageNum)
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
            dataIndex: 'ref',
            key: 'ref',
            render: (ref) => <a href={`/orders/${ref}`}>{ref}</a>
        },
        {
            title: 'Захиалагч',
            dataIndex: 'customer',
            key: 'customer',
            render: (customer) => <a href={`/customers/${customer.id}`}>{customer.company_name}</a>
        },
        {
            title: 'Бүтээгдэхүүн',
            dataIndex: 'items',
            key: 'items',
            render: (items) => <div>
                <Popover
                    content={
                        <div>
                            {items.map(item => {
                                return (
                                    <div>
                                        {item.item.name} ({formatNumber(item.item.price)}₮) - {item.count}ш
                                    </div>
                                )
                            })}
                        </div>
                    }
                    title="Бүтээгдэхүүнүүд"
                    trigger="click"
                >
                    <Button>Дэлгэрэнгүй</Button>
                </Popover>
            </div>
        },
        {
            title: 'Үнийн дүн',
            dataIndex: 'total',
            key: 'total',
            render: (total) => <Typography.Text>{formatNumber(total)}₮</Typography.Text>
        },
        {
            title: 'Бонус',
            dataIndex: 'bonus',
            key: 'bonus',
            render: (bonus) => <Typography.Text>{formatNumber(bonus)}₮</Typography.Text>
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
            title: 'Төлөв',
            dataIndex: 'id',
            key: 'id',
            render: (id) => 
            orders.find(x => x.id === id).is_payed ?
                <Tag color="success">Төлсөн</Tag>
            : <Space size={8} wrap>
                   <Popconfirm title="Төлсөн төлөвт шилжүүлэх үү?" onConfirm={() => onPayed(id)}>
                        <Button icon={<CheckOutlined />} size="middle" type="primary" />          
                    </Popconfirm>  
                    <Popconfirm title="Захиалгыг цуцлах уу?" onConfirm={() => onDecline(id)}>
                        <Button danger icon={<DeleteOutlined />} size="middle" type="primary" />           
                    </Popconfirm>  
                </Space>
        },
    ]

    return (
        <div>
            <Table 
                columns={columns} 
                dataSource={orders} 
                size="small" 
                pagination={{ 
                    current: page, 
                    pageSize: 24, 
                    total: total,     
                    onChange: onPageChange                
                }}
            />       
        </div>
    )
}

export default OrderList