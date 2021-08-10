import React from 'react';
import { Grid, Layout, BackTop } from 'antd';
import CustomMenu from '../components/Menu';
import CustomFooter from '../components/Footer';
import './Layout.css';

const { useBreakpoint } = Grid;
const { Header, Content, Footer } = Layout;

function CustomLayout (props) {    

    const screens = useBreakpoint()

    return(
        <Layout>            
            <Header>                  
                <CustomMenu {...props} />                
            </Header>
            <Content style={{ minHeight: '80vh' }}>                                     
                <div className="content-item" style={ screens.lg ? { padding: '24px 10%' } : { padding: '24px 5%' }}>
                    {props.children}                    
                </div>                
                <BackTop />
            </Content>
            <Footer>
                <CustomFooter />
            </Footer>
        </Layout>
    );  
};

export default CustomLayout;