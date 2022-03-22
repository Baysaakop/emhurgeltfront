import React from 'react';
import { withRouter } from 'react-router-dom';
import HomeSlider from './HomeSlider';
import HomeTimeline from './HomeTimeline';
// import * as translations from '../translation';
import { connect } from 'react-redux';
import HomeFeatured from './HomeFeatured';

function Home (props) {        

    return (
        <div>
            <HomeSlider />                 
            <HomeFeatured />                             
            <HomeTimeline />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        language: state.language
    }
}

export default withRouter(connect(mapStateToProps, null)(Home));