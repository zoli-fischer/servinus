import { connect } from 'react-redux';
import Users from 'Pages/Users/Users';
import { clearData } from 'Actions/SessionUser';

function mapStateToProps(state) {
    return {
        sessionUser: state.sessionUser.data,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        onLogout: (data) => {
            dispatch(clearData());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Users);