import { useEffect, useState } from "react"
import axios from "axios";
import api from "../api";
import { Breadcrumb, message } from "antd";
import { Link } from "react-router-dom";
function BrandProducts (props) {

    useEffect(() => {        
        getProducts()        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const [items, setItems] = useState()

    function getProducts () {        
        let url = `${api.items}/?is_brand=true`        
        axios({
            method: 'GET',
            url: url           
        }).then(res => {                                    
            setItems(res.data.results)            
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })
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
                    Онцлох бүтээгдэхүүн
                </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ margin: '24px 0' }}>                
                <div style={{ display: 'flex', flexWrap: 'wrap', padding: '0 4px' }}>
                    {/* {data ? data.map(item => {
                        return (
                            <div style={{ flex: '33%', maxWidth: '33%', padding: '0 4px' }}>
                                <img src={`${item}.jpg`} alt="image" style={{ width: '100%', height: 'auto', marginTop: '8px', verticalAlign: 'middle' }} />
                            </div>
                        )
                    }) : <></>} */}                    
                    {items ? <p>{items.length}</p> : <></>}
                </div> 
            </div>
        </div>
    )
}

export default BrandProducts