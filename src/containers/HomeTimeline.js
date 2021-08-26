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
                            Ut lacinia arcu quis aliquam auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ultrices, risus vitae porta molestie, felis mauris ultricies nunc, ac tincidunt ipsum arcu a magna.                                                                                     
                        </div>                 
                    }>
                        <img alt="cart" src={cartSvg} style={{ width: '70%', height: 'auto', objectFit: 'scale-down' }} />
                    </Timeline.Item>
                    <Timeline.Item label=
                    {
                        <div>
                            <Typography.Title level={4}>Төлбөр төлөх</Typography.Title>
                            Ut lacinia arcu quis aliquam auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ultrices, risus vitae porta molestie, felis mauris ultricies nunc, ac tincidunt ipsum arcu a magna.                                                                                     
                        </div>
                    }>
                        <img alt="payment" src={paymentSvg} style={{ width: '70%', height: 'auto', objectFit: 'scale-down' }} />  
                    </Timeline.Item>
                    <Timeline.Item label=
                    {
                        <div>
                            <Typography.Title level={4}>Хүргэлтээр авах</Typography.Title>
                            Ut lacinia arcu quis aliquam auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ultrices, risus vitae porta molestie, felis mauris ultricies nunc, ac tincidunt ipsum arcu a magna.                                                                                    
                        </div>
                    }> 
                        <img alt="delivery" src={deliverySvg} style={{ width: '80%', height: 'auto', objectFit: 'scale-down' }} />  
                    </Timeline.Item>
                    <Timeline.Item label=
                    {
                        <div>
                            <Typography.Title level={4}>Бонус цуглуулах</Typography.Title>
                            Ut lacinia arcu quis aliquam auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ultrices, risus vitae porta molestie, felis mauris ultricies nunc, ac tincidunt ipsum arcu a magna.                                                                                   
                        </div>
                    }>
                        <img alt="bonus" src={bonusSvg} style={{ width: '50%', height: 'auto', objectFit: 'scale-down' }} />   
                    </Timeline.Item>
                </Timeline>
            ) : (
                <Timeline mode="alternate" style={{ margin: '0' }}>
                    <Timeline.Item label=
                    {   
                        <div>
                            <Typography.Title level={5}>Бүтээгдэхүүн захиалах</Typography.Title>                                 
                        </div>                 
                    }>
                        <img alt="cart" src={cartSvg} style={{ width: '80%', height: 'auto', objectFit: 'scale-down' }} />
                    </Timeline.Item>
                    <Timeline.Item label=
                    {
                        <div>
                            <Typography.Title level={5}>Төлбөр төлөх</Typography.Title>                            
                        </div>
                    }>
                        <img alt="payment" src={paymentSvg} style={{ width: '80%', height: 'auto', objectFit: 'scale-down' }} />  
                    </Timeline.Item>
                    <Timeline.Item label=
                    {
                        <div>
                            <Typography.Title level={5}>Хүргэлтээр авах</Typography.Title>                            
                        </div>
                    }>
                        <img alt="delivery" src={deliverySvg} style={{ width: '90%', height: 'auto', objectFit: 'scale-down' }} />  
                    </Timeline.Item>
                    <Timeline.Item label=
                    {
                        <div>
                            <Typography.Title level={5}>Бонус цуглуулах</Typography.Title>                            
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