import { Typography, message, Divider, Button, Spin, Table, Tag, Space } from "antd"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import api from "../api"
import moment from "moment";
import { FilePdfOutlined, LoadingOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function OrderHistory (props) {
    const printRef = useRef()
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState()    
    const [page, setPage] = useState(1)    
    const [total, setTotal] = useState()    

    useEffect(() => {
        getOrders(page)
    }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

    function getOrders (page) {
         
        setLoading(true)
        let url = `${api.orders}/?customer=${props.user.id}`
        url += `&page=${page}`    
        axios({
            method: 'GET',
            url: url           
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
    
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const columns = [
        {
            title: 'Захиалгын дугаар',
            dataIndex: 'id',
            key: 'id',
            render: (id) => <a target="_blank" rel="noreferrer" href={`/orders/${id}`}>{orders.find(x => x.id === id).ref}</a>
        },
        {
            title: 'Үнийн дүн',
            dataIndex: 'total',
            key: 'total',
            render: (total) => <Typography.Text>{formatNumber(total)}₮</Typography.Text>
        },
        {
            title: 'Ашигласан бонус',
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
            title: 'Төлөв',
            dataIndex: 'is_payed',
            key: 'is_payed',
            render: (is_payed) => <Tag color={is_payed ? "success" : "cyan"}>{is_payed ? "Төлбөр төлөгдсөн" : "Төлбөр дутуу"}</Tag>
        },
    ]

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    return (
        <div style={{ background: '#fff', borderRadius: '2px', padding: '24px' }}>       
            <Typography.Title level={4} style={{ margin: 0 }}>Захиалгын түүх</Typography.Title>            
            <Divider />             
            { loading ? (
                <div style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin indicator={loadingIcon} />
                </div>
            ) : orders ? (
                <div>
                    <div ref={printRef} style={{ padding: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div><Typography.Title level={5} style={{ margin: 0 }}>Хэрэглэгч: {props.user.company_name}</Typography.Title></div>
                            <Space size={8} wrap>
                                <img src="/logo.png" alt="dseabi" style={{ width: '24px', height: 'auto' }} /> 
                                <Typography.Title level={5} style={{ margin: 0 }}>Ди Эс И Эй Би Ай ХХК</Typography.Title>
                            </Space>
                        </div> 
                        <Table 
                            bordered
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
                    <Button icon={<FilePdfOutlined />} onClick={handlePrint}>Татаж авах</Button>
                </div>
            ) : 
                <></>
            }                    
        </div>
    )
}

export default OrderHistory