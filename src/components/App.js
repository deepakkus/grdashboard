import React, { Component } from "react";
import Application from "./Page/Layout";
import "./App.scss";
import { getUrlParam } from "../utils/utilsFunctions";
import { Loader } from "semantic-ui-react";

class App extends Component {
  state = {
    loading: this.props.appLoading,
    userLoaded: false,
    sensorsLoaded: false,
    userId: window.localStorage.setItem("userId", "60ab1230d34a2a0008bbc1f4"),
    token: window.localStorage.setItem("token", "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI2MGFiMTIzMGQzNGEyYTAwMDhiYmMxZjQiLCJpYXQiOjE2MjY2OTAwNjMsImV4cCI6MTYyNjc3NjQ2M30.NrBJYE-gO91hSFjuWnbW93YjhrVcW5MeAuPZOLcXhVGO5L7misw9XZX38IrO_PnWR5rp2CMfuGNbrXkU1X5V0D_F1QLcybyw2mKSMRvkpfnS3H2dKvOaV4plcVyFkzgppLWPCl3upWNwqBD_l1ytgpchwT6WslS46ogjksdjAcKW_d9cc0_EtwZwb-cFkGTcbHD5IuFL6GgolRJjEdNeKIajObw3ZgxKA3xAQ0wCRbw7VpzhtG-74gl8lgZKAG-opQ5eRWKu85hv-L5ESUB0OpP2DXh7XGWiZeGXDjhqHFhMJGJKosGVDhPD2tKFlogiQENfZh7qaalnMF1rbvYpwQ")
  };
  async componentDidMount() {
    const {
      setUserIdToken,
      getLookupData,
      getUserFarms,
      getUserDevices,
      getHistoryData_7D,
      getHistoryData_1M,
      getHistoryData_1Y,
      devices,
      getSensorsData,
    } = this.props;

    getHistoryData_7D();
    getHistoryData_1M();
    getHistoryData_1Y();

    const userId = getUrlParam("userId");
    const tokenId = getUrlParam("token")
    // console.log(tokenId)
    const userCached = window.localStorage.getItem("userId");

    if (userId) {
      setUserIdToken();
    }

    if (this.props.userId && this.props.token) {
      getLookupData(this.props.userId, this.props.token);
      getUserFarms(this.props.userId, this.props.token);
      getUserDevices(this.props.userId, this.props.token);
    }
    if (!userId && !userCached) {
      window.location.href = process.env.REACT_APP_LOGIN_URL;
    }
    if (devices.userDevices && devices.userDevices.length) {
      getSensorsData(devices.userDevices.map((d) => d.deviceId).join());
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      // getUserCropCycles
      getUserSortedCropCycles,
      getLookupData,
      getUserFarms,
      getUserDevices,
      getSensorsData,
      getUserActivities,
    } = this.props;
    if (this.props.userId && this.props.token && !this.state.userLoaded) {
      getLookupData(this.props.userId, this.props.token);
      getUserFarms(this.props.userId, this.props.token);
      getUserDevices(this.props.userId, this.props.token);
      this.setState({ userLoaded: true });
    }
    if (this.props.appLoading !== prevProps.appLoading) {
      this.setState({ loading: this.props.appLoading });
    }
    if (
      this.props.devices.userDevices.length !==
      prevProps.devices.userDevices.length &&
      this.props.userId &&
      this.props.token && !this.state.sensorsLoaded
    ) {
      getSensorsData(
        this.props.devices.userDevices.map((d) => d.deviceId).join()
      );
      this.setState({ sensorsLoaded: true });
    }
    if (
      this.props.userFarms.length !== prevProps.userFarms.length &&
      this.props.userId &&
      this.props.token
    ) {
      getUserSortedCropCycles(
        this.props.userFarms,
        this.props.userId,
        this.props.token
      );
      // getUserCropCycles(this.props.userFarms);
    }
    if (
      this.props.userCurrentCropCycles.length !==
      prevProps.userCurrentCropCycles.length &&
      this.props.userId &&
      this.props.token
    ) {
      getUserActivities(
        this.props.userCurrentCropCycles,
        this.props.userId,
        this.props.token
      );
    }
  }

  //show loading until farms are fetched
  render() {
    const loading = this.state.loading;
    const showOnboarding = !(
      this.props.userFarms && this.props.userFarms.length
    );
    return (
      <div>
        {loading && <Loader active inline="centered" className="mt-4" />}
        {!loading && <Application showOnboarding={showOnboarding} />}
      </div>
    );
  }
}
export default App;
