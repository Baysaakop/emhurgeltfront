import { Button, Divider, Popconfirm, Spin, Table, Typography } from "antd"
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
            title: '???????????? ????????????',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: '?????????????????? ??????',
            dataIndex: 'company_name',
            key: 'company_name'
        },
        {
            title: '?????????????????? ????',
            dataIndex: 'company_id',
            key: 'company_id'
        },
        {
            title: '????????',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: '???????? ??????',
            dataIndex: 'total',
            key: 'total'
        },
        {
            title: '???????????? ?????? ????????',
            dataIndex: 'id',
            key: 'id',
            render: (id) => <Popconfirm title="???????????? ?????? ???????? ?????" onConfirm={() => getAsBonus(id)} okText="????????" cancelText="????????">
                <Button type="primary">???????????? ?????? ????????</Button>
            </Popconfirm> 
        },       
        {
            title: '?????????????? ????????',
            dataIndex: 'id',
            key: 'id',
            render: (id) => <Popconfirm title="?????????????? ???????? ?????" onConfirm={() => getAsCash(id)} okText="????????" cancelText="????????">
                <Button type="primary">?????????????? ????????</Button>
            </Popconfirm> 
        },        
    ];
    
    return (
        <div>
            { loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                    <Spin tip="?????????? ??????????..."/>
                </div>
            ) : users ? (
                <div>
                    <Typography.Title level={4} style={{ margin: 0 }}>???????????? 3-?? ?????????????? ???????????? ??????????????????????</Typography.Title>    
                    <Divider style={{ margin: '12px 0' }} />
                    <Table columns={columns} dataSource={users} pagination={false} />
                </div>
            ) : 
                <></>
            }
        </div>
    )
}

export default NewTopUsers