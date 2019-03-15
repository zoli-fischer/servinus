import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute.presentational';

function mapStateToProps(state) {
    return {
        isSessionUser: !!state.sessionUser.data.token,
    };
}

export default connect(
    mapStateToProps
)(PrivateRoute);
