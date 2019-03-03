import { connect } from 'react-redux';
import PrivateRoute from 'Components/PrivateRoute/PrivateRoute';

function mapStateToProps(state) {
    return {
        isSessionUser: !!state.sessionUser.data.token,
    };
};

export default connect(
    mapStateToProps,
)(PrivateRoute);
