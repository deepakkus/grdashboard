import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import "./MainButton.scss";
import AddActivityForm from '../AddActivityForm/AddActivityForm'
export default function MainButton({ children, activitytypes, lookup, currentcropcycles, userFarms
  , addActivity, userId, token, className }) {
  const [modalView, setView] = useState(false);
  const handleClick = () => {
    setView(true);
  }
  function onSubmit(act) {
    addActivity(act, userId, token)
  }
  const changeDialogDisp = () => {
    setView(!modalView)
  }
  return (

    <div className={className ? `${className}` : `MainButton`}>
      <div className="btn-ele">
        <Button fluid className="bttn"  onClick={handleClick}>
          {children}{" "}
        </Button>
      </div>
      {

        activitytypes ? (<AddActivityForm open={modalView} changeDialogDisp={changeDialogDisp} activityTypes={activitytypes}
          userFarms={userFarms} currentCropCycles={currentcropcycles} onSubmit={onSubmit} />)
          : (lookup ? (<AddActivityForm open={modalView} changeDialogDisp={changeDialogDisp} activityTypes={lookup.activities}
            currentCropCycles={currentcropcycles} onSubmit={onSubmit} />)
            : null)
      }
    </div>
  );
}
