import { connect } from "react-redux";
import { addFarm, editFarm } from "../actions/farms";
import AddEditFarm from "../components/Page/AddEditFarm/AddEditFarm";

const mapStateToProps = (state, ownProps) => {
  return {    
    title: "add-edit-farm",
    userId: state.user.userId,
    token: state.user.token,
    soiltypes: state.lookup.soiltypes,
    terraintypes: state.lookup.terraintypes,
    watersources: state.lookup.watersources,
    userFarms: state.farms.userFarms
  };
};

export default connect(mapStateToProps, {
  addFarm,
  editFarm
})(
  AddEditFarm
);
