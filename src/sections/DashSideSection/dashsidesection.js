import React from "react";
import { Container, Segment } from "semantic-ui-react";
import CalenderCard from "../../components/CalenderCard/CalenderCard";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import "./dashsidesection.scss";
import MainButton from "../../components/MainButton/MainButton";
import { useTranslation } from "react-i18next";

const DashSideSection = (props) => {

  const { t } = useTranslation("common");
  return (
    // <Container className="DashSideSection">
      <div className="DashSideSection">
        {/* <Segment raised className="weatherCardSegmant">
          <WeatherCard />
        </Segment> */}

        <Segment raised className="p-0 calendarcontainer">
          <CalenderCard />
        </Segment>
        {/* <MainButton {...props}>
          {
            t("ADD_ACTIVITY")
          }
        </MainButton> */}
      </div>
    // </Container>
  );
};

export default DashSideSection;
