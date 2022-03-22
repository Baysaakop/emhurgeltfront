import { useEffect, useState } from "react"
import axios from "axios"
import api from '../api'
import { Button, Table, Spin } from "antd"
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons"

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function SignupRequests (props) {

    useEffect(() => {
        getUsers()
    }, [])

    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState()

    function getUsers() {
        setLoading(true)
        axios({
            method: 'GET',
            url: `${api.users}?is_confirmed=False&&role=3`
        })
        .then(res => {
            console.log(res)
            setUsers(res.data.results)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    function onAccept (id) {
        console.log(id)
        axios({
            method: 'PUT',
            url: api.users + "/" + id + "/",
            data: {
                is_confirmed: true
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }
        })
        .then(res => {
            console.log(res)
            getUsers()
        })
        .catch(err => {
            console.log(err)
        })
    }

    function onDelete (id) {
        console.log(id)
        axios({
            method: 'DELETE',
            url: api.users + "/" + id + "/",            
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`            
            }
        })
        .then(res => {
            console.log(res)
            getUsers()
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
            title: 'Зөвшөөрөх / Цуцлах',
            dataIndex: 'id',
            key: 'id',
            render: (id) => 
            <>
                <Button type="primary" icon={<CheckCircleOutlined />} onClick={() => onAccept(id)} style={{ marginRight: '8px' }}>Зөвшөөрөх</Button>
                <Button danger type="primary" icon={<CloseCircleOutlined />} onClick={() => onDelete(id)}>Цуцлах</Button>
            </>
        },
    ];

    return (
        <div>
            { loading ? (
                <div style={{ width: '100%', minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin indicator={loadingIcon} />
                </div>
            ) : (
                <Table columns={columns} dataSource={users ? users : undefined} />
            )}            
        </div>
    )
}

export default SignupRequests