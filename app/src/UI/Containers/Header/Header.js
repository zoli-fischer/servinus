import { connect } from 'react-redux';
import Header from 'Components/Header/Header';
import { clearData } from 'Actions/SessionUser';

function mapStateToProps(state) {
    return {
        isSessionUser: !!state.sessionUser.data.token,
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
