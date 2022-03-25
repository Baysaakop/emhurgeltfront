import { Rate, Table, Typography } from "antd"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import './Bonus.css'

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
            title: 'Худалдан авалтын дүн',
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
            level: <Rate disabled count={3} defaultValue={1} />,
            percent: '1%',
            point: '0',
            gift: '1,000 бонус оноо',
        },
        {
            key: '2',
            level: <Rate disabled count={3} defaultValue={2} />,
            percent: '2%',
            point: '33,000,000₮',
            gift: '300,000 бонус оноо',
        },
        {
            key: '3',
            level: <Rate disabled count={3} defaultValue={3} />,
            percent: '3%',
            point: '88,000,000₮',
            gift: '2,500,000 бонус оноо эсвэл 2,000,000₮',
        },
    ];

    return (
        <div className="bonus">
            <div>
                <div style={{ background: '#fff', border: '1px solid #000', padding: '24px', marginBottom: '24px' }}>
                    <Typography.Title level={5} style={{ margin: 0 }}>
                        Та манай веб сайтаар үйлчлүүлснээр өөр хаана ч байхгүй гайхалтай урамшууллын хөтөлбөрт хамрагдах боломжтой.
                    </Typography.Title>
                </div>
                <Table columns={columns} dataSource={data} pagination={false} size="small" style={{ border: '1px solid #000' }} />
                <div style={{ background: '#fff', border: '1px solid #000', padding: '24px', marginTop: '24px' }}>
                    <div style={{ marginBottom: '8px' }}>
                        <Typography.Text>
                        <strong>Цол:</strong> Худалдан авалтын дүнгээ өсгөж цолоо ахиулснаар урамшууллын хувиа өгсөх боломжтой.
                        </Typography.Text>    
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                    <Typography.Text>
                        <strong>Урамшууллын хувь:</strong> Худалдан авалт тус бүрээс урамшууллын хувиараа бонус оноо цуглуулах боломжтой.
                        </Typography.Text>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                        <Typography.Text>
                        <strong>Худалдан авалтын дүн:</strong> Бүртгүүлсэн цагаас хойшхи нийт худалдан авалтын нийлбэр дүн.
                        </Typography.Text>                    
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                        <Typography.Text>
                        <strong>Нэмэлт бэлэг:</strong> Цол ахих тутамд бидний зүгээс танд бэлэглэж буй нэмэлт эрхүүд.
                        </Typography.Text>                    
                    </div>
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