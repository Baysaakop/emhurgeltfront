import { LoadingOutlined } from "@ant-design/icons";
import { Button, Spin, Table, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api";

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function CustomerList (props) {

    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState()

    useEffect(() => {
        getUsers()
    }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

    function getUsers() {
        setLoading(true)
        axios({
            method: 'GET',
            url: `${api.users}?is_confirmed=True&role=3&page=${page}`
        })
        .then(res => {            
            setUsers(res.data.results)
            setTotal(res.data.count)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
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
            title: 'Утасны дугаар',
            dataIndex: 'username',
            key: 'username',            
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Компанийн нэр',
            dataIndex: 'company_name',
            key: 'company_name'
        },
        {
            title: 'Компанийн РД',
            dataIndex: 'company_id',
            key: 'company_id'
        },
        {
            title: 'Хаяг',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Цол',
            dataIndex: 'level',
            key: 'level'
        },
        {
            title: 'Нийт',
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
            title: 'Захиалгын түүх',
            dataIndex: 'id',
            key: 'id',
            render: (id) => <Button type="link" href={`/staff/customers/${id}`}>Захиалгын түүх</Button>
        },
    ];


    return (
        <div>
            { loading ? (
                <div style={{ width: '100%', minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin indicator={loadingIcon} />
                </div>
            ) : (
                <Table 
                    columns={columns} 
                    dataSource={users} 
                    size="small" 
                    pagination={{ 
                        current: page, 
                        pageSize: 36, 
                        total: total,     
                        onChange: onPageChange                
                    }}
                />       
            )}            
        </div>
    )
}

export default CustomerList;