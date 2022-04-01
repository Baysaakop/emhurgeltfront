import { Button, Popconfirm, Spin, Table } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../../api"

function NewTopUsers (props) {

    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getNewTopUsers()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getNewTopUsers() {
        setLoading(true)
        axios({
            method: 'GET',
            url: api.users + "?level=3&bonus_collected=False",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            }
        }).then(res => {                     
            setUsers(res.data.results)                
            setLoading(false)      
        }).catch(err => {
            console.log(err.message)
            setLoading(false)
        })
    }

    function getAsBonus(id) {
        axios({
            method: 'PUT',
            url: api.users + "/" + id + "/",
            data: {
                bonus_collected: true,
                type: 'bonus'
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }
        })
        .then(res => {            
            getNewTopUsers()
        })
        .catch(err => {
            console.log(err)
        })
    }

    function getAsCash(id) {
        axios({
            method: 'PUT',
            url: api.users + "/" + id + "/",
            data: {
                bonus_collected: true,
                type: 'cash'
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }
        })
        .then(res => {            
            getNewTopUsers()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const columns = [
        {
            title: 'Утасны дугаар',
            dataIndex: 'username',
            key: 'username'
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
            title: 'Нийт дүн',
            dataIndex: 'total',
            key: 'total'
        },
        {
            title: 'Хэтэвч рүү хийх',
            dataIndex: 'id',
            key: 'id',
            render: (id) => <Popconfirm title="Хэтэвч рүү хийх үү?" onConfirm={() => getAsBonus(id)} okText="Тийм" cancelText="Үгүй">
                <Button type="primary">Хэтэвч рүү хийх</Button>
            </Popconfirm> 
        },       
        {
            title: 'Бэлнээр өгөх',
            dataIndex: 'id',
            key: 'id',
            render: (id) => <Popconfirm title="Бэлнээр өгөх үү?" onConfirm={() => getAsCash(id)} okText="Тийм" cancelText="Үгүй">
                <Button type="primary">Бэлнээр өгөх</Button>
            </Popconfirm> 
        },        
    ];
    
    return (
        <div>
            { loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                    <Spin tip="Уншиж байна..."/>
                </div>
            ) : users ? (
                <div>
                    <Table columns={columns} dataSource={users} pagination={false} />
                </div>
            ) : 
                <></>
            }
        </div>
    )
}

export default NewTopUsers