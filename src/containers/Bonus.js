import { Breadcrumb, Rate, Table, Tag, Typography } from "antd"
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom"
import * as translations from '../translation';

function Bonus (props) {

    const columns = [
        {
            title: 'Цол',
            dataIndex: 'level',
            key: 'level'
        },
        {
            title: 'Урамшууллын хувь',
            dataIndex: 'percent',
            key: 'percent'
        },
        {
            title: 'Цуглуулах шаардлагатай оноо',
            dataIndex: 'point',
            key: 'point'
        },
        {
            title: 'Нэмэлт бэлэг',
            dataIndex: 'gift',
            key: 'gift'
        }
    ];

    const data = [
        {
            key: '1',
            level: <Tag color="green">NEW</Tag>,
            percent: '2%',
            point: '0',
            gift: '',
        },
        {
            key: '2',
            level: <Rate disabled count={4} defaultValue={1} />,
            percent: '3%',
            point: '5,000',
            gift: 'Төрсөн өдрийн урамшуулал - 5,000 оноо',
        },
        {
            key: '3',
            level: <Rate disabled count={4} defaultValue={2} />,
            percent: '4%',
            point: '20,000',
            gift: '20,000 төгрөгний купон',
        },
        {
            key: '4',
            level: <Rate disabled count={4} defaultValue={3} />,
            percent: '5%',
            point: '50,000',
            gift: '50,000 төгрөгний купон + Үнэгүй хүргэлт',
        },
        {
            key: '5',
            level: <Rate disabled count={4} defaultValue={4} />,
            percent: '6%',
            point: '100,000',
            gift: '100,000 төгрөгний купон',
        },
    ];

    return (
        <div>
             <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/">
                    { props.language === "en" ? translations.en.footer.home_page : translations.mn.footer.home_page }
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    { props.language === "en" ? translations.en.header.bonus : translations.mn.header.bonus }
                </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ marginTop: '24px' }}>
                <div style={{ background: '#fff', padding: '24px', marginBottom: '24px' }}>
                    <Typography.Title level={5} style={{ margin: 0 }}>
                        Та манай веб сайтаар үйлчлүүлснээр өөр хаана ч байхгүй гайхалтай урамшууллын хөтөлбөрт хамрагдах боломжтой.
                    </Typography.Title>
                </div>
                <Table columns={columns} dataSource={data} pagination={false} />
                <div style={{ background: '#fff', padding: '24px', marginTop: '24px' }}>
                    <Typography.Text>
                    <strong>Цол:</strong> Веб сайтаар хийсэн худалдан авалт тутамд бонус оноо цуглуулж, цуглуулсан онооны хэмжээгээр цолоо ахиулан урамшууллын хувиа өгсөх болон нэмэлт бэлэгний эзэн болох эрхтэй юм.
                    </Typography.Text>    
                    <br />
                    <Typography.Text>
                    <strong>Урамшууллын хувь:</strong> Худалдан авалтын үнийн дүнгийн 2%-6% нь урамшууллын оноо болж таны хэтэвчинд орох болно. Цол ахих тутамд таны урамшууллын хувь нэг хувиар нэмэгдэнэ. 
                    </Typography.Text>
                    <br />
                    <Typography.Text>
                    <strong>Цуглуулах шаардлагатай оноо:</strong> Цолоо ахиулахын тулд цуглуулах шаардлагатай нийт оноо. Энэ нь таны бүх худалдан авалтын туршид цуглуулсан онооны нийлбэр байх бөгөөд та урамшууллын оноогоо ашиглан худалдан авалт хийсэн ч энэ оноо нь хасагдахгүй юм.
                    </Typography.Text>                    
                    <br />
                    <Typography.Text>
                    <strong>Нэмэлт бэлэг:</strong> Цол ахих тутамд бидний зүгээс танд бэлэглэж буй нэмэлт эрхүүд.
                    </Typography.Text>                    
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        language: state.language
    }
}

export default withRouter(connect(mapStateToProps, null)(Bonus));