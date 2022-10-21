import React from "react";
import Dashboard from "../../containers/Dashboard";
import Sensors from "../../containers/Sensors";
import AddDevice from "../../containers/AddDevice";
import AddEditFarm from "../../containers/AddEditFarm";
import GisAnalysis from "../../containers/GisAnalysis";
import CropManagement from "../../containers/CropManagement";
import Settings from "../../containers/Settings"
import { Switch, Route } from "react-router-dom";

const Page = (props) => {
  return (
    <div className="app">
      <Switch>
        <Route
          exact
          path="/"
          component={props.showOnboarding ? AddEditFarm : Dashboard}
        />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/addEditFarm/" component={AddEditFarm} />
        <Route exact path="/sensors" component={Sensors} />
        <Route path="/sensors/:id" component={Sensors} />
        <Route path="/addDevice" component={AddDevice} />
        <Route path="/gisAnalysis" component={GisAnalysis} />
        <Route path="/cropManagement" component={CropManagement} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </div>
  );
};

export default Page;
