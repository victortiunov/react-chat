import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signup, login } from '../actions';
import WelcomePage from '../components/WelcomePage';

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.services.errors.auth,
	isFetching: state.services.isFetching.login || state.services.isFetching.signup
});

const mapDispatchToProps = dispatch => bindActionCreators({
	signup,
	login
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WelcomePage);
