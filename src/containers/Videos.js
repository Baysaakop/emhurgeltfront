import { Breadcrumb, Col, Row } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import api from "../api"
import * as translations from '../translation';

function Videos (props) {

    const [videos, setVideos] = useState()

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${api.videos}/`, 
        }).then(res => {            
            console.log(res.data.results)
            setVideos(res.data.results)
        }).catch(err => {
            console.log(err.message)
        })
    }, [])

    function getHeight() {
        if (window.screen.availWidth >= 1200) {
            return window.screen.availWidth * 0.18
        } else if (window.screen.availWidth >= 992) {
            return (window.screen.availWidth - 48) * 0.25
        } else {
            return (window.screen.availWidth - 32) * 0.3
        }
    }

    return (
        <div>
             <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/">
                    { props.language === "en" ? translations.en.footer.home_page : translations.mn.footer.home_page }
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    { props.language === "en" ? translations.en.header.videos : translations.mn.header.videos }
                </Breadcrumb.Item>
            </Breadcrumb>                       
            { videos ? (
                <Row gutter={24}>
                    {videos.map(video => (
                        <Col xs={24} sm={24} md={24} lg={12}>
                            <div style={{ marginTop: '16px' }}>                                
                                <iframe title={video.name} width="100%" height={getHeight()} src={video.video_url} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>                                                
                            </div>
                        </Col>
                    ))}
                </Row>
            ) : (
                <></>
            )}
        </div>
    )
}

export default Videos