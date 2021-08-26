import { Carousel } from "antd"

function HomeSlider (props) {
    return (
        <div>
            <Carousel autoplay style={{ zIndex: '1' }}>
                <div>
                    <div style={{ position: 'relative', paddingTop: '40%' }}>
                        <div style={{ backgroundColor: '#ffbe76', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '2px' }}>
                            <img alt="landscape" src="http://demo2.themelexus.com/medilazar/wp-content/uploads/2020/12/h1-new02.png" style={{ width: '40%', height: 'auto' }} />
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ position: 'relative', paddingTop: '40%' }}>
                        <div style={{ backgroundColor: '#7ed6df', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '2px' }}>
                            <img alt="landscape" src="http://demo2.themelexus.com/medilazar/wp-content/uploads/2020/12/h1-new02.png" style={{ width: '40%', height: 'auto' }} />
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ position: 'relative', paddingTop: '40%' }}>
                        <div style={{ backgroundColor: '#6ab04c', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '2px' }}>
                            <img alt="landscape" src="http://demo2.themelexus.com/medilazar/wp-content/uploads/2020/12/h1-new02.png" style={{ width: '40%', height: 'auto' }} />
                        </div>
                    </div>
                </div>
            </Carousel>            
        </div>
    )
}

export default HomeSlider