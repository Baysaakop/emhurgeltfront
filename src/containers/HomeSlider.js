import { useEffect, useState } from "react"
import { Carousel, Empty } from "antd"
import axios from "axios"
import api from "../api"

function HomeSlider (props) {

    const [sliders, setSliders] = useState()

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${api.sliders}/`, 
        }).then(res => {
            console.log(res.data)
            setSliders(res.data.results)
        }).catch(err => {
            console.log(err.message)
        })
    }, [])

    return (
        <div>
            <Carousel autoplay style={{ zIndex: '1' }}>
                { sliders ? (
                    sliders.map(slider => (
                        <div>
                            <img alt="slider" src={slider.image} style={{ width: '100%', height: 'auto' }} />
                        </div>
                    ))
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}                
            </Carousel>            
        </div>
    )
}

export default HomeSlider