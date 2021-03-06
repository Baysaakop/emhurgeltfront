import { Col, Row } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../api"

function HomeFeatured (props) {

    const [items, setItems] = useState()

    useEffect(() => {
        axios({
            method: 'GET',
            url: api.items + "?is_featured=true&poster=true"
        }).then(res => {                      
            setItems(res.data.results)            
        }).catch(err => {            
            console.log(err)            
        })
    }, [])

    return (
        <div>
            <Row gutter={[32, 32]} style={{ marginTop: '32px' }}>
                { items ? items.slice(0, 3).map(item => {
                    return (
                        <Col xs={24} sm={24} md={24} lg={8}>
                            <img src={item.poster ? item.poster : "https://epharmacy-bucket.s3.ap-northeast-1.amazonaws.com/static/blank1x3.jpg"} alt={item.name} style={{ width: '100%', height: 'auto', border: '1px solid #000', borderRadius: '4px' }} />
                        </Col>
                    )
                }) 
                :
                    <></>
                }                
            </Row>
        </div>
    )
}

export default HomeFeatured