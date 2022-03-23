import { useEffect, useRef, useState } from "react"
import { Button, Carousel, Empty } from "antd"
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import axios from "axios"
import api from "../api"

function HomeSlider (props) {

    const ref = useRef()
    const [sliders, setSliders] = useState()

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${api.sliders}/`, 
        }).then(res => {            
            setSliders(res.data.results)
        }).catch(err => {
            console.log(err.message)
        })
    }, [])

    return (
        <div>
            { sliders ? (
                <div style={{ position: 'relative' }}>
                    <Carousel autoplay autoplaySpeed={sliders.length * 3000} ref={ref} style={{ zIndex: '1' }}>                
                        {
                            sliders.map(slider => (
                                <img alt="slider" src={slider.image} style={{ width: '100%', height: 'auto' }} />
                            ))               
                        }
                    </Carousel>        
                    <Button       
                        icon={<LeftOutlined />}                  
                        type="text"                        
                        size="large"
                        style={{ position: 'absolute', left: '8px', top: '5%', zIndex: '2', height: '90%', opacity: '0.5' }}
                        onClick={() => ref.current.prev()}
                    />          
                    <Button       
                        icon={<RightOutlined />}                  
                        type="text"                        
                        size="large"
                        style={{ position: 'absolute', right: '8px', top: '5%', zIndex: '2', height: '90%', opacity: '0.5' }}
                        onClick={() => ref.current.next()}
                    />                                        
                </div>
            ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}                        
        </div>
    )
}

export default HomeSlider