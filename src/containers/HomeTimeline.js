import { Grid, Timeline, Typography } from "antd"
import cartSvg from './cart.svg'
import paymentSvg from './payment.svg'
import deliverySvg from './delivery.svg'
import bonusSvg from './bonus.svg'

const { useBreakpoint } = Grid;

function HomeTimeline () {

    const screens = useBreakpoint()

    return (
        <div style={{ margin: '24px 0', background: '#FFF', borderRadius: '2px', paddingTop: '40px' }}>
            { screens.lg ? (                
                <Timeline mode="alternate" style={{ margin: '0 10%' }}>
                    <Timeline.Item label=
                    {   
                        <div>
                            <Typography.Title level={4}>Бүтээгдэхүүн захиалах</Typography.Title>     
                            Харилцагч та манай байгууллагын вэбсайтад бүртгүүлэн бүтээгдэхүүн цэсэнд нэвтрэх эрх үүсгээрэй. Ингэснээр та манайд байгаа бүтээгдэхүүнүүдээс сонголтоо хийн захиалга өгөх боломжтой. 
                        </div>                 
                    }>
                        <img alt="cart" src={cartSvg} style={{ width: 'auto', height: '200px', objectFit: 'scale-down' }} />
                    </Timeline.Item>
                    <Timeline.Item label=
                    {
                        <div>
                            <Typography.Title level={4}>Төлбөр төлөх</Typography.Title>
                            Захиалга батлагдсаны дараа харилцагч та төлбөрөө дансруу шилжүүлэх юмуу хүргэлтийн жолоочид бэлнээр төлөх боломжтой. 
                        </div>
                    }>
                        <img alt="payment" src={paymentSvg} style={{ width: 'auto', height: '200px', objectFit: 'scale-down' }} />  
                    </Timeline.Item>
                    <Timeline.Item label=
                    {
                        <div>
                            <Typography.Title level={4}>Хүргэлтээр авах</Typography.Title>
                            Бид харилцагч таны 13:00 цагаас өмнө өгсөн захиалгыг тухайн өдөрт нь хүргэж өгөх бөгөөд 13:00 цагаас хойш хийгдсэн захиалгыг ачааллаас хамааран тухайн өдөрт юмуу дараагийн өдөрт хүргэж өгөх болно.
                        </div>
                    }> 
                        <img alt="delivery" src={deliverySvg} style={{ width: 'auto', height: '160px', objectFit: 'scale-down' }} />  
                    </Timeline.Item>
                    <Timeline.Item label=
                    {
                        <div>
                            <Typography.Title level={4}>Бонус цуглуулах</Typography.Title>
                            Харилцагч таны захиалгын үнийн дүнгийн 1-3% нь таны хэтэвчинд бонус болон хадгалагдах бөгөөд мөн нэмэлт бэлэг урамшуулал авах боломжтой.
                        </div>
                    }>
                        <img alt="bonus" src={bonusSvg} style={{ width: 'auto', height: '200px', objectFit: 'scale-down' }} />   
                    </Timeline.Item>
                </Timeline>
            ) : (
                <Timeline mode="alternate" style={{ margin: '0' }}>
                    <Timeline.Item style={{ height: '250px' }} label=
                    {   
                        <div> 
                            <Typography.Title level={5}>Бүтээгдэхүүн захиалах</Typography.Title>   
                            <Typography.Text style={{ fontSize: '11px' }}>Харилцагч та манай байгууллагын вэбсайтад бүртгүүлэн бүтээгдэхүүн цэсэнд нэвтрэх эрх үүсгээрэй. Ингэснээр та манайд байгаа бүтээгдэхүүнүүдээс сонголтоо хийн захиалга өгөх боломжтой.</Typography.Text>
                        </div>                 
                    }>
                        <img alt="cart" src={cartSvg} style={{ width: '80%', height: 'auto', objectFit: 'scale-down' }} />
                    </Timeline.Item>
                    <Timeline.Item style={{ height: '180px' }} label=
                    {
                        <div>
                            <Typography.Title level={5}>Төлбөр төлөх</Typography.Title>                            
                            <Typography.Text style={{ fontSize: '11px' }}>Захиалга батлагдсаны дараа харилцагч та төлбөрөө дансруу шилжүүлэх юмуу хүргэлтийн жолоочид бэлнээр төлөх боломжтой.</Typography.Text>
                        </div>
                    }>
                        <img alt="payment" src={paymentSvg} style={{ width: '80%', height: 'auto', objectFit: 'scale-down' }} />  
                    </Timeline.Item>
                    <Timeline.Item style={{ height: '250px' }} label=
                    {
                        <div>
                            <Typography.Title level={5}>Хүргэлтээр авах</Typography.Title>                            
                            <Typography.Text style={{ fontSize: '11px' }}>Бид харилцагч таны 13:00 цагаас өмнө өгсөн захиалгыг тухайн өдөрт нь хүргэж өгөх бөгөөд 13:00 цагаас хойш хийгдсэн захиалгыг ачааллаас хамааран тухайн өдөрт юмуу дараагийн өдөрт хүргэж өгөх болно.</Typography.Text>
                        </div>
                    }>
                        <img alt="delivery" src={deliverySvg} style={{ width: '90%', height: 'auto', objectFit: 'scale-down' }} />  
                    </Timeline.Item>
                    <Timeline.Item style={{ height: '250px' }} label=
                    {
                        <div>
                            <Typography.Title level={5}>Бонус цуглуулах</Typography.Title>                            
                            <Typography.Text style={{ fontSize: '11px' }}>Харилцагч таны захиалгын үнийн дүнгийн 1-3% нь таны хэтэвчинд бонус болон хадгалагдах бөгөөд мөн нэмэлт бэлэг урамшуулал авах боломжтой.</Typography.Text>
                        </div>
                    }>
                        <img alt="bonus" src={bonusSvg} style={{ width: '60%', height: 'auto', objectFit: 'scale-down' }} />   
                    </Timeline.Item>
                </Timeline>
            )}            
        </div>
    )
}

export default HomeTimeline