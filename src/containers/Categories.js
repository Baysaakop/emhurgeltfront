import { AppstoreOutlined, CoffeeOutlined, EyeOutlined, HeartOutlined, PlusCircleOutlined, RestOutlined, SmileOutlined, WomanOutlined } from "@ant-design/icons";
import { Col, Row, Avatar, Typography } from "antd";
import './Categories.css'

function Categories (props) {
    return (
        <div className="categories">
            <Row gutter={[24, 24]}>
                <Col xs={12} sm={8} md={6} lg={4} xl={3} style={{ textAlign: 'center' }}>
                    <Avatar shape="square" icon={<PlusCircleOutlined />} size={128} style={{ backgroundColor: '#fff', color: 'rgba(0, 0, 0, 0.85)', border: '4px solid rgba(0, 0, 0, 0.85)' }} />
                    <Typography.Title level={5}>Эмнэлгийн хэрэгсэл</Typography.Title>
                </Col>
                <Col xs={12} sm={8} md={6} lg={4} xl={3} style={{ textAlign: 'center' }}>
                    <Avatar shape="square" icon={<HeartOutlined />} size={128} style={{ background: '#fff', color: 'rgba(0, 0, 0, 0.85)', border: '4px solid rgba(0, 0, 0, 0.85)' }} />
                    <Typography.Title level={5}>Гоо сайхан</Typography.Title>
                </Col>
                <Col xs={12} sm={8} md={6} lg={4} xl={3} style={{ textAlign: 'center' }}>
                    <Avatar shape="square" icon={<RestOutlined />} size={128} style={{ background: '#fff', color: 'rgba(0, 0, 0, 0.85)', border: '4px solid rgba(0, 0, 0, 0.85)' }} />                                            
                    <Typography.Title level={5}>Витамин</Typography.Title>
                </Col>
                <Col xs={12} sm={8} md={6} lg={4} xl={3} style={{ textAlign: 'center' }}>
                    <Avatar shape="square" icon={<SmileOutlined />} size={128} style={{ background: '#fff', color: 'rgba(0, 0, 0, 0.85)', border: '4px solid rgba(0, 0, 0, 0.85)' }} />
                    <Typography.Title level={5}>Хүүхэд</Typography.Title>
                </Col>
                <Col xs={12} sm={8} md={6} lg={4} xl={3} style={{ textAlign: 'center' }}>
                    <Avatar shape="square" icon={<WomanOutlined />} size={128} style={{ background: '#fff', color: 'rgba(0, 0, 0, 0.85)', border: '4px solid rgba(0, 0, 0, 0.85)' }} />
                    <Typography.Title level={5}>Эмэгтэйчүүд</Typography.Title>
                </Col>   
                <Col xs={12} sm={8} md={6} lg={4} xl={3} style={{ textAlign: 'center' }}>
                    <Avatar shape="square" icon={<EyeOutlined />} size={128} style={{ background: '#fff', color: 'rgba(0, 0, 0, 0.85)', border: '4px solid rgba(0, 0, 0, 0.85)' }} />
                    <Typography.Title level={5}>Харшил</Typography.Title>
                </Col>  
                <Col xs={12} sm={8} md={6} lg={4} xl={3} style={{ textAlign: 'center' }}>
                    <Avatar shape="square" icon={<CoffeeOutlined />} size={128} style={{ background: '#fff', color: 'rgba(0, 0, 0, 0.85)', border: '4px solid rgba(0, 0, 0, 0.85)' }} />
                    <Typography.Title level={5}>Хүнс</Typography.Title>
                </Col>  
                <Col xs={12} sm={8} md={6} lg={4} xl={3} style={{ textAlign: 'center' }}>
                    <Avatar shape="square" icon={<AppstoreOutlined />} size={128} style={{ background: '#fff', color: 'rgba(0, 0, 0, 0.85)', border: '4px solid rgba(0, 0, 0, 0.85)' }} />
                    <Typography.Title level={5}>Бусад</Typography.Title>
                </Col>                                  
            </Row>
        </div>
    )
}

export default Categories