import React from "react";
import { Container, Button, Image } from "semantic-ui-react";
import "./cropsidesection.scss";
import cropManagement from "../../images/crop_management_image.png";
import certified from "../../images/certified_img.png";
import MainButton from "../../components/MainButton/MainButton";
import { useTranslation } from "react-i18next";

const CropSideSection = (props) => {
  const { t } = useTranslation("crop-management");

    return (
        <div className="CropSideSection">
            <Button fluid className="connectButton">CONNECT  FARM@FORK  SUPPLYCHAIN</Button>
            <div className="cropImageContainer">
                <Image src={cropManagement} alt="cropManagementImg" className="cropManagementImg" />
                <Image src={certified} alt="cropManagementImg" className="certified" />
                <p className="cropManagementImgText">This log is protected by hyper ledger blockchain & all actions are irreversible & tamper proof <br /><br /><a href="#" className="cropManagementImgLink">LEARN MORE</a></p>
            </div>
            {/* <MainButton {...props} className = "cropSide-activity-btn">
                {
                    t("ADD ACTIVITY")
                }
            </MainButton> */}
        </div>
    );
};

export default CropSideSection;
