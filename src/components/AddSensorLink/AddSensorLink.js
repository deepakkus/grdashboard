import React from "react";

import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

import { useTranslation } from "react-i18next";


export default function AddSensorLink() {
  const { t } = useTranslation("common");

  return (
    <div style = {{position: "relative", top:"10px", display: "flex", justifyContent: "center"}} className = "add-sensor-link">
      <Link className="link" to="/addDevice">
        <AiOutlinePlus
          style={{
            paddingTop: 3,
            fontSize: "1rem",
          }}
        />{" "}
        {t("add-sensor")}
      </Link>
    </div>
  );
}
