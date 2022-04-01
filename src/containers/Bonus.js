import { Rate, Table } from "antd"
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
                <div style={{ background: '#2C3E50', color: 'yellow', fontSize: '18px', padding: '24px', marginBottom: '24px' }}>
                    Та манай веб сайтаар үйлчлүүлснээр өөр хаана ч байхгүй гайхалтай урамшууллын хөтөлбөрт хамрагдах боломжтой.
                </div>
                <Table className="ant-table-bonus" columns={columns} dataSource={data} pagination={false} size="small" />
                <div style={{ background: '#2C3E50', color: 'yellow', padding: '24px', marginTop: '24px' }}>
                    <div style={{ marginBottom: '8px' }}>
                        <strong>Цол:</strong> Худалдан авалтын дүнгээ өсгөж цолоо ахиулснаар урамшууллын хувиа өгсөх боломжтой. 
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                        <strong>Урамшууллын хувь:</strong> Худалдан авалт тус бүрээс урамшууллын хувиараа бонус оноо цуглуулах боломжтой.
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                        <strong>Худалдан авалтын дүн:</strong> Бүртгүүлсэн цагаас хойшхи нийт худалдан авалтын нийлбэр дүн.                   
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                        <strong>Нэмэлт бэлэг:</strong> Цол ахих тутамд бидний зүгээс танд бэлэглэж буй нэмэлт эрхүүд.              
                    </div>
                    <div style={{ color: 'yellow' }}>
                        <strong>Онцлох бүтээгдэхүүн:</strong> Онцлох бүтээгдэхүүнээс сонгон захиалснаар урамшууллаа үржүүлэн аваарай.             
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