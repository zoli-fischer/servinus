import { connect } from 'react-redux';
import Header from './Header.presentational';
import { clearData } from 'Actions/SessionUser';

function mapStateToProps(state) {
    return {
        isSessionUser: !!state.sessionUser.data.token,
        userData: state.sessionUser.data,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onLogout: () => dispatch(clearData()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
