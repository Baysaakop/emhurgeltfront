import { useEffect, useState } from "react"
import axios from "axios";
import api from "../api";
import { Breadcrumb, List, message } from "antd";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

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
                    Брэнд бүтээгдэхүүн
                </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ margin: '24px 0' }}>                
                {/* {items ? items.map(item => {
                    return (
                        <div>
                            <h2>{item.name}</h2>
                        </div>
                    )
                }) : <></>}     */}
                <List
                    grid={{
                        gutter: 16,
                        xs: 2,
                        sm: 2,
                        md: 3,
                        lg: 4,
                        xl: 5,
                        xxl: 6,
                    }}
                    dataSource={items ? items : undefined}
                    renderItem={item => (
                        <List.Item>
                            <ProductCard history={props.history} item={item} type="list" />
                        </List.Item>
                    )}
                />            
            </div>
        </div>
    )
}

export default BrandProducts