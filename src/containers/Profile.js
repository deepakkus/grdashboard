import { connect } from "react-redux";
import { logout } from "../actions/user";
import Profile from "../components/Profile/Profile";
const mapStateToProps = (state) => {
  return {
    userId: state.user.userId,
    token: state.user.token,
  };
};

export default connect(mapStateToProps, {
  logout,   
})(Profile);
