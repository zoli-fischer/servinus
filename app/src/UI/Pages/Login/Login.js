import { connect } from 'react-redux';
import Login from './Login.presentational';
import { setData } from 'Actions/SessionUser';

function mapDispatchToProps(dispatch) {
    return {
        setUserData: data => {
            dispatch(setData(data));
        },
    };
}

export default connect(
    null,
    mapDispatchToProps
)(Login);
