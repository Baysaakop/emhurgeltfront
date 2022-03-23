import { Modal } from "antd"

function ProductPoster (props) {

    function getWidth() {
        if (window.screen.availWidth >= 1600) {
            return window.screen.availWidth * 0.76
        } else if (window.screen.availWidth >= 1200) {
            return window.screen.availWidth * 0.84
        } else {
            return window.screen.availWidth - 32
        }
    }

    return (
        <div>
            <Modal                 
                centered                                                                                                                                 
                visible={true}
                footer={null} 
                title={props.name}                   
                onCancel={() => props.hide()}                                                                      
                width={getWidth()}
                style={{ padding: 0 }}
            >                                                   
                <div>                                                   
                    <img alt={props.name} src={props.poster} style={{ width: '100%', height: 'auto' }} />
                </div> 
            </Modal>
        </div>
    )
}

export default ProductPoster