import ProductCard from "./ProductCard";
import InfiniteCarousel from 'react-leaf-carousel';
import axios from "axios"; 
import api from "../api";
import { useEffect, useState } from "react";
import { Grid, message } from "antd";

const { useBreakpoint } = Grid

function ProductScroll (props) {
    const screens = useBreakpoint()
    const [items, setItems] = useState()

    useEffect(() => {
        let url = `${api.items}/?`       
        axios({
            method: 'GET',
            url: url           
        }).then(res => {                        
            setItems(res.data.results)            
        }).catch(err => {
            message.error("Хуудсыг дахин ачааллана уу")
        })       
    }, [props.type]) // eslint-disable-line react-hooks/exhaustive-deps

    function getSliderCount() {
        if (screens.xxl) {
            return 6
        } else if (screens.xl) {
            return 5
        } else if (screens.lg) {
            return 4
        } else if (screens.md) {
            return 3
        } else if (screens.sm) {
            return 2
        } else if (screens.xs) {
            return 1
        } else {
            return 1
        }
    }

    return (
        <div>
            {items ? (
                <InfiniteCarousel                    
                    dots={false}
                    showSides={true}
                    sidesOpacity={.5}
                    sideSize={.1}
                    slidesToScroll={2}
                    slidesToShow={getSliderCount()}
                    scrollOnDevice={true}                    
                >
                    {items.map(item => {
                        return (
                            <ProductCard key={item.id} history={props.history} item={item} type="" />
                        )
                    })}
                </InfiniteCarousel>
            ) : (
                <></>
            )}
        </div>
    )
}

export default ProductScroll