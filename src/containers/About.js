import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Row, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { Link } from "react-router-dom";

function About () {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/">
                        Нүүр хуудас
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Бидний тухай
                </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ marginTop: '24px' }}>
                <Typography.Title level={2} style={{ textAlign: 'center' }}>БИДНИЙ ТУХАЙ</Typography.Title>
                <Typography.Paragraph>
                Sed pulvinar tincidunt nulla, ut tempus dolor facilisis sed. Quisque varius nisl velit, quis maximus magna dapibus et. Maecenas consectetur dapibus nisl, vitae suscipit nunc porttitor eu. Aenean ut felis erat. Vestibulum sodales arcu varius vestibulum gravida. Duis euismod vel enim ac vulputate. Morbi nec ultrices metus, id commodo mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed et ornare magna, ac hendrerit dolor. Morbi id tortor vel ante pellentesque suscipit finibus at nunc. Maecenas id lectus dictum, rutrum tortor eget, molestie metus. Aenean at tortor hendrerit, accumsan mauris a, mattis nibh. Curabitur congue accumsan tristique.
                </Typography.Paragraph>
                <Typography.Title level={2} style={{ textAlign: 'center' }}>МАНАЙ ХАМТ ОЛОН</Typography.Title>
                <Row gutter={[16, 16]}>
                    <Col xs={12} sm={12} md={8} lg={4} style={{ textAlign: 'center' }}>
                        <Avatar icon={<UserOutlined />} size={128} />
                        <Typography.Title level={5}>John Doe</Typography.Title>
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={4} style={{ textAlign: 'center' }}>
                        <Avatar icon={<UserOutlined />} size={128} />
                        <Typography.Title level={5}>John Doe</Typography.Title>
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={4} style={{ textAlign: 'center' }}>
                        <Avatar icon={<UserOutlined />} size={128} />
                        <Typography.Title level={5}>John Doe</Typography.Title>
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={4} style={{ textAlign: 'center' }}>
                        <Avatar icon={<UserOutlined />} size={128} />
                        <Typography.Title level={5}>John Doe</Typography.Title>
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={4} style={{ textAlign: 'center' }}>
                        <Avatar icon={<UserOutlined />} size={128} />
                        <Typography.Title level={5}>John Doe</Typography.Title>
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={4} style={{ textAlign: 'center' }}>
                        <Avatar icon={<UserOutlined />} size={128} />
                        <Typography.Title level={5}>John Doe</Typography.Title>
                    </Col>
                </Row>    
            </div>        
        </div>
    )
}

export default About