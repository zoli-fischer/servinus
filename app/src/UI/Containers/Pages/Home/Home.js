import { connect } from 'react-redux';
import Home from 'Pages/Home/Home';
import { clearData } from 'Actions/SessionUser';

function mapStateToProps(state) {
    return {
        sessionUser: state.sessionUser.data,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onLogout: () => {
            dispatch(clearData());
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
