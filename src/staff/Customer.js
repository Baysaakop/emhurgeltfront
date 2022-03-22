import { connect } from "react-redux";

function Customer (props) {
    return (
        <div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(Customer);