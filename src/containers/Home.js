import { CoffeeOutlined, CrownOutlined, ExperimentOutlined, PushpinOutlined, RestOutlined, SafetyOutlined } from '@ant-design/icons';
import { Grid, Avatar, Carousel, Col, Row, Typography } from 'antd';
import React from 'react';
import InfiniteCarousel from 'react-leaf-carousel';
// import axios from 'axios';  
// import api from '../api';
import { Link } from 'react-router-dom';
import FlowerIcon from '../components/FlowerIcon';
import ProductScroll from '../product/ProductScroll';

const { useBreakpoint } = Grid

function Home (props) {    
    
    const screens = useBreakpoint()
    // const [data, setData] = useState();

    // useEffect(() => {
    //     axios({
    //         method: 'GET',
    //         url: `${api.items}/`
    //     }).then(res => {            
    //         setData(res.data)
    //     }).catch(err => {
    //         console.log(err.message)
    //     })        
    // }, [])   

    function getCount() {
        console.log(screens)
        if (screens.xxl) {
            return 8
        } else if (screens.xl) {
            return 6
        } else if (screens.lg) {
            return 5
        } else if (screens.md) {
            return 4
        } else if (screens.sm) {
            return 3
        } else if (screens.xs) {
            return 2
        } else {
            return 2
        }        
    }

    return (
        <div>
            <Carousel autoplay style={{ zIndex: '1' }}>
                <div>
                    <div style={{ background: '#ffbe76', width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img alt="landscape" src="http://demo2.themelexus.com/medilazar/wp-content/uploads/2020/12/h1-new02.png" style={{ width: '40%', height: 'auto' }} />
                        <div style={{ textAlign: 'center' }}>
                            <Typography.Title level={1} style={{ color: '#fff', margin: 0 }}>Намрын урамшуулал</Typography.Title>
                            <Typography.Title level={1} style={{ fontSize: '60px', color: '#fff', margin: 0 }}>25% OFF</Typography.Title>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ background: '#7ed6df', width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img alt="landscape" src="http://demo2.themelexus.com/medilazar/wp-content/uploads/2020/12/h1-news01.png" style={{ width: '30%', height: 'auto' }} />
                    </div>
                </div>
                <div>
                    <div style={{ background: '#6ab04c', width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img alt="landscape" src="http://demo2.themelexus.com/medilazar/wp-content/uploads/2020/12/h1-new02.png" style={{ width: '40%', height: 'auto' }} />
                    </div>
                </div>
                <div>
                    <div style={{ background: '#30336b', width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img alt="landscape" src="http://demo2.themelexus.com/medilazar/wp-content/uploads/2020/12/h1-new04.png" style={{ width: '20%', height: 'auto' }} />
                    </div>
                </div>
            </Carousel>
            <Typography.Title level={3} style={{ marginTop: '16px' }}>Бүтээгдэхүүний ангилал</Typography.Title>            
            { screens.xs || screens.sm || screens.md || screens.lg || screens.xl || screens.xxl ? (
                <InfiniteCarousel                    
                    dots={false}
                    showSides={true}
                    sidesOpacity={.5}
                    sideSize={.1}
                    slidesToScroll={2}
                    slidesToShow={getCount()}
                    scrollOnDevice={true}                    
                >
                    <div style={{ textAlign: 'center' }}>
                        <Link to="/products">
                            <Avatar shape="square" size={128} icon={<CrownOutlined />} style={{ background: '#ff4d4f' }} />
                            <Typography.Title level={5}>Ковид 19</Typography.Title>
                        </Link>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Link to="/products">
                            <Avatar shape="square" size={128} icon={<ExperimentOutlined />} style={{ background: '#e67e22' }} />
                            <Typography.Title level={5}>Харшил</Typography.Title>
                        </Link>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Link to="/products">
                            <Avatar shape="square" size={128} icon={<RestOutlined />} style={{ background: '#f39c12' }} />
                            <Typography.Title level={5}>Витамин</Typography.Title>
                        </Link>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Link to="/products">
                            <Avatar shape="square" size={128} icon={<FlowerIcon />} style={{ background: '#27ae60' }} />
                            <Typography.Title level={5}>Гоо сайхан</Typography.Title>
                        </Link>                        
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Link to="/products">
                            <Avatar shape="square" size={128} icon={<CoffeeOutlined />} style={{ background: '#9b59b6' }} />
                            <Typography.Title level={5}>Хүнс</Typography.Title>
                        </Link>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Link to="/products">
                            <Avatar shape="square" size={128} icon={<SafetyOutlined />} style={{ background: '#8e44ad' }} />
                            <Typography.Title level={5}>Тусламж</Typography.Title>
                        </Link>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Link to="/products">
                            <Avatar shape="square" size={128} icon={<PushpinOutlined />} style={{ background: '#34495e' }} />
                            <Typography.Title level={5}>Ангилал 1</Typography.Title>
                        </Link>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Link to="/products">
                            <Avatar shape="square" size={128} icon={<CoffeeOutlined />} style={{ background: '#2c3e50' }} />
                            <Typography.Title level={5}>Ангилал 2</Typography.Title>
                        </Link>
                    </div>
                </InfiniteCarousel>
            ) : (
                <></>
            )}                                     
            <Row gutter={[32, 32]} style={{ marginTop: '32px' }}>
                <Col xs={24} sm={24} md={24} lg={8}>
                    <div style={{ background: '#eb4d4b', height: '200px', width: '100%', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography.Title level={3} style={{ color: '#fff' }}>Онцлох бүтээгдэхүүн 1</Typography.Title>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={8}>
                    <div style={{ background: '#6ab04c', height: '200px', width: '100%', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography.Title level={3} style={{ color: '#fff' }}>Онцлох бүтээгдэхүүн 2</Typography.Title>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={8}>
                    <div style={{ background: '#30336b', height: '200px', width: '100%', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography.Title level={3} style={{ color: '#fff' }}>Онцлох бүтээгдэхүүн c3</Typography.Title>
                    </div>
                </Col>
            </Row>
            <Typography.Title level={3} style={{ marginTop: '16px' }}>Брэнд бүтээгдэхүүн</Typography.Title>
            <ProductScroll type="brand" />
            <Typography.Title level={3} style={{ marginTop: '16px' }}>Хямдралтай бүтээгдэхүүн</Typography.Title>            
            <ProductScroll type="brand" />
            <Typography.Title level={3} style={{ marginTop: '16px' }}>Хамтрагч байгууллагууд</Typography.Title>
            <Typography.Title level={3} style={{ marginTop: '16px' }}>Эмчийн зөвлөгөө</Typography.Title>            
        </div>
    )
}

export default Home;