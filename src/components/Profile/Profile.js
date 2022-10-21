import React from "react";
import { Divider } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { Link, withRouter } from "react-router-dom";
import "./Profile.scss";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { AiOutlineLogout } from "react-icons/ai";

import { connect } from "react-redux";
import { compose } from "redux";
import { logout } from "../../actions/user";

const linkStyles = {
  // margin: " 0 30%",
  color: "#095E54",
  textDecoration: " none !important",
  fontSize : "20px",
  marginBottom : "0px"
};
function Profile({ logout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log({ event });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handelLogoutItem = () => {
    logout();
    window.location.href = process.env.REACT_APP_LOGIN_URL;
  };

  const { t } = useTranslation("common");
  const onClick = () => {};
  return (
    <div>
      <div className="profile">
        <div className="profile-body p-0">
          {/* <h5 className="p-0 ">Full Name</h5> */}                                 
          <div>

            <div className="mt-2 profile-options" onClick={handleClick}>                                                                   
              <p style={linkStyles}>Full Name</p>
              <p >{t("completeprofile")}</p>
            </div>


            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin = {{horizontal: "center"}}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem> 
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem
                onClick={handelLogoutItem}
                style={{
                  color: "green",
                }}
              >
                <AiOutlineLogout
                  style={{
                    marginRight: ".5rem",
                    fontSize: "1.5rem",
                  }}
                />{" "}
                Logout
              </MenuItem>
            </Menu>



          </div>
          {/* <p className="p-0"> {t("completeprofile")}</p> */}
        </div>
        <div className="profile-img p-0  ">
          <img src="https://react.semantic-ui.com/images/wireframe/image.png" />
        </div>
      </div>
      <hr style={{marginLeft : "-13px", width : "107%"}}/>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userId: state.user.userId,
    token: state.user.token,
  };
};
// export default connect(mapStateToProps, {
//   logout,
// })(Profile);

export default compose(
  withRouter,
  connect(mapStateToProps, { logout })
)(Profile);


