import React, { useState, useEffect } from "react";
import { Grid, Segment, Dropdown, Responsive } from "semantic-ui-react";
import "./dashmidgrids.scss";
import { useTranslation } from "react-i18next";
import MapPolygon from "../MapPolygon/MapPolygon";
import { calculateArea } from "../../utils/utilsFunctions";
import ChartList from "../../components/ChartList/ChartList";
import AddFieldModal from "../../components/DashMidGrids/AddFieldModal";
import { Link } from "react-router-dom";
import { getPlantName } from "../../utils/utilsFunctions";


const linkStyles = {
  color: "#B2AFAF",
  textDecoration: "none",
  opacity : "30%"
};
const activeLinkStyles = {
  // color: "rgba(60, 117, 60, 0.787)",
  color: "#B2AFAF",
  textDecoration: "none", 
};

const DashMidGrids = (props) => {
  const [firstLinkActive, setFirstLinkActive] = useState(true);
  const links = [
    // { id: 0, name: "7D", type: "", activeLINK: firstLinkActive ? true : false },
    { id: 0, name: "7D", type: "", activeFirst: true, firstLinkActive },
    { id: 1, name: "1M", type: "data_1M" },
    { id: 2, name: "1Y", type: "data_1Y" },
  ];
  const { t } = useTranslation("dashboard");
  const [fieldId, setFieldId] = useState("");
  const [arrayType, setArrayType] = useState("");

  const [linksArray, setLinksArray] = useState(links);

  let polygon = [[48.8566, 2.3522]]; //=  props.userFarms.location
  let center = [48.8566, 2.3522]; //=  props.userFarms.address.location

  let fieldOptions = [];
  // let selectedField = "";
  const fillData = (newData) => {
    newData.forEach((element) => {
      fieldOptions.push({
        text: element.farmName,
        id: element._id,
        value: element._id,
      });
    });
    // selectedField = newData[0].farmName;
    polygon = newData[0].location;
    center = newData[0].address.location;
  };

  const {
    lookup,
    ranges,
    history_data,
    getWeatherData,
    getUserFarmCropCycles,
    userId,
    token,
    userFarmCropCycles,
    userFarms,
    getIdealRange,
  } = props;
  let { history_data_7d, history_data_1M, history_data_1Y } = history_data;

  console.log({ history_data_1M });

  const firstFarm = props.userFarms[0];
  const [farm] = props.userFarms.filter((farm) => farm._id === fieldId);
  console.log({ firstFarm });
  console.log({ farm });

  const fieldArea = calculateArea(farm ? [farm.location] : []) * 0.000247105;
  const firstFieldArea =
    calculateArea(firstFarm ? [firstFarm.location] : []) * 0.000247105;
  console.log({ fieldArea });

  const [terraintypes] = lookup.terraintypes.filter((item) => {
    console.log("firstFarm", firstFarm);
    return farm && firstFarm
      ? // ? item._id === firstFarm.terrainTypeId
        item._id === farm.terrainTypeId
      : item._id === firstFarm.terrainTypeId;
  });
  const [waterSource] = lookup.watersources.filter((item) => {
    return farm && firstFarm
      ? // ? item._id === firstFarm.terrainTypeId
        item._id === farm.waterSourceId
      : item._id === firstFarm.waterSourceId;
  });
  const [soiltype] = lookup.soiltypes.filter((item) => {
    return farm && firstFarm
      ? // ? item._id === firstFarm.terrainTypeId
        item._id === farm.soilTypeId
      : item._id === firstFarm.soilTypeId;
  });

  // console.log({ soiltype });
  const onLinkClick = (arrayType, index, Id) => {
    setArrayType(arrayType);
    index == 0 ? setFirstLinkActive(true) : setFirstLinkActive(false);
    console.log({ index });
    console.log({ firstLinkActive });
    let [activeLink] = links.filter((link) => link.id === Id);
    // console.log(index);
    console.log(arrayType);
    // let ActiveSensorIndex = sensors.findIndex(
    //   (sensor) => sensor.deviceId === sensorId
    // );

    let NewActiveLink = {
      ...activeLink,
      active: true,
    };

    const newLinks = Object.assign([], links, {
      [index]: NewActiveLink,
    });
    // console.log(newSensors);
    setLinksArray(newLinks);
  };
  console.log(arrayType);

  useEffect(() => {
    // farm
    //   ? getWeatherData(
    //       farm && farm.address.location[0],
    //       farm.address.location[0]
    //     )
    //   : getWeatherData(
    //       firstFarm && firstFarm.address.location[0],
    //       firstFarm.address.location[1]
    //     );

    farm
      ? getUserFarmCropCycles(farm._id, userId, token)
      : getUserFarmCropCycles(firstFarm._id, userId, token);
    if (farm) {
      const plant = getPlantName(
        userFarms,
        farm.address.location,
        lookup.croptypes
      );
      getIdealRange(plant);
    } else {
      const plant = firstFarm
        ? getPlantName(userFarms, firstFarm.address.location, lookup.croptypes)
        : "generic";
      getIdealRange(plant);
    }
  }, [userId, farm]);

  const [userFarmCropCycle] =
    userFarmCropCycles &&
    userFarmCropCycles.filter((item) => item.isPast == false);
  console.log({ userFarmCropCycle });

  const cultivationId =
    userFarmCropCycles.length && userFarmCropCycle
      ? userFarmCropCycle.cultivationId
      : "";
  console.log("cultivationId", cultivationId);

  // let cropId = "";

  // if (userFarmCropCycles.length && userFarmCropCycle.cropSeeds[0].cropId) {
  //   cropId = userFarmCropCycle.cropSeeds[0].cropId;
  // }

  let cropId =
    userFarmCropCycles.length && userFarmCropCycle
      ? userFarmCropCycle.cropSeeds[0].cropId
      : "";
  const [croptype] = lookup.croptypes.filter((item) => item._id === cropId);
  const [cultivationtype] = lookup.cultivationtypes.filter(
    (item) => item._id === cultivationId
  );

  return (
    // <Container fluid className="maincontainer">
    <div>
      <Responsive minWidth = {1024}>
        <Grid container columns={2}>
          {props.userFarms.length > 0 ? fillData(props.userFarms) : null}
          {/* left green section  */}
          <Grid.Row className="dashboard-content ml-3">
            <Grid.Column width={6} className="gridcolumn-left">
              <Segment>
                <Grid columns={2}>
                  <Grid.Row className="ml-0 p-0">
                    <Grid.Column width={8}>
                      <h6 className="text-white pl-3 pt-3 green-left-header"> {t("field-info")} </h6>
                    </Grid.Column>
                    <Grid.Column>
                      <div className="text-white ml-5 pl-1 pt-3 green-right-header">
                        <AddFieldModal {...props} name={t("add-field")} />
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row  className="mx-0 py-0 mapContainer">
                    <Grid.Column width={16} className="p-0">
                      {props.userFarms.length > 0 && fieldId
                        ? props.userFarms.forEach((poly) => 
                        {
                          if (poly._id === fieldId) 
                          {
                            polygon = poly.location;
                            center = poly.address.location;
                          }
                        })
                        : null
                      }
                      <MapPolygon editable={false} polygon={polygon} center={center} />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="row2 mx-0">
                    <Grid.Column width={8}>
                      <div className="dropdown">
                        <Dropdown
                          placeholder="Select Field"
                          // defaultValue={selectedField}
                          defaultValue={fieldOptions[0].value}
                          scrolling
                          options={fieldOptions}
                          onChange={(e, { value }) => {
                            setFieldId(value);
                          }}
                        />
                      </div>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <div className="edit text-center">
                        <AddFieldModal
                          name={t("edit")}
                          color="rgba(60, 117, 60, 0.787)"
                          icon={true}
                          {...props}
                          farmId={fieldId ? fieldId : fieldOptions[0].value}
                        />
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                
                  {
                    farm || firstFarm ? (
                      // <div className="fildInfo">
                        <Grid.Row className="mx-0 p-0 text-white">
                          <Grid.Column width={8}>
                            <div className="">
                              <h6 className="row3 opacity">{t("location")}</h6>
                              <p className="opacity">
                                {` ${
                                  farm
                                    ? farm.address.location[0].toFixed(2)
                                    : firstFarm.address.location[1].toFixed(2)
                                } Lat ${
                                  farm
                                    ? farm.address.location[1].toFixed(2)
                                    : firstFarm.address.location[1].toFixed(2)
                                } Long `}
                              </p>
                            </div>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <div className="pr-3">
                              <h6 className="row3 opacity">{t("soil-type")}</h6>
                              <p className="opacity">{soiltype && soiltype.name}</p>
                            </div>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <div className="pt-3 ">
                              <h6 className="row3 opacity">{t("terren-type")}</h6>
                              <p className="opacity">
                                {terraintypes && terraintypes.name}
                              </p>
                            </div>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <div className="pr-3 mt-3">
                              <h6 className="row3 opacity">{t("water-source")}</h6>
                              <p className="opacity">{waterSource && waterSource.name}</p>
                            </div>
                          </Grid.Column>
                          <Grid.Column width={16}>
                            <hr className="mt-4"/>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <div className="">
                              <h6 className="row3 opacity">{t("crop")}</h6>
                              {/* <p className="opacity">Wheat (Triticum) </p> */}
                              <p className="opacity">
                                {croptype ? croptype.name : "Uncultivated"}{" "}
                              </p>
                            </div>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <div className="pr-3">
                              <h6 className="row3 opacity">{t("stage")}</h6>
                              {/* <p className="opacity">Harvesting</p> */}
                              <p className="opacity">
                                {cultivationtype ? cultivationtype.name : "Uncultivated"}
                              </p>
                            </div>
                          </Grid.Column>
                        </Grid.Row>
                        
                    ) : null
                  }
                </Grid>
              </Segment>
            </Grid.Column>

          {/* end of green section (left-side) */}

            <Grid.Column width={10} className="gridcolumn-right">
              <Segment raised className="right-segment">
                <Grid columns={1}>
                  <Grid.Row className="mx-0">
                    <Grid.Column>
                      <p className="gray pl-3 py-2 size-s" >{t("field-insights")}</p>
                    </Grid.Column>
                    <Grid.Column>
                      <div className="fieldInsights pl-3 ml-2">
                        <div className="center">
                          <h1 className="size-L green-sec">
                            {fieldArea ? fieldArea.toFixed(2) : firstFieldArea.toFixed(2)}
                            <span className="size-s">ac</span>
                          </h1>
                          <p className="size-xs mb-3" style={{fontWeight : "bold"}}>{t("total-field-area")}</p>
                        </div>
                        <div className="center">
                          <h1 className="size-L green-sec">
                            413<span className="size-s">bu/ac</span>
                          </h1>
                          <p className="size-xs mb-3" style={{fontWeight : "bold"}}>{t("avg-yield")}</p>
                        </div>
                        <div className="center">
                          <h1 className="size-L green-sec">16</h1>
                          <p className="size-xs mb-3" style={{fontWeight : "bold"}}>{t("total-rec-activities")}</p>
                        </div>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              <div className="spaceBetween mt-5">
                <h6 className="gray " style={{paddingLeft : "10px"}}> {t("analytics-perscription")}</h6>
                <div className="spaceBetween" style={{paddingRight : "10px"}}>
                  <h6 className="gray mr-2 ml-2">{t("last")}</h6>
                  {linksArray.map((item, index) => (
                    <h6 className="mr-2 ml-2" key = {index}>
                      <Link
                        style={
                          item.active || (item.activeFirst && firstLinkActive)
                            ? activeLinkStyles
                            : linkStyles
                        }
                        onClick={() => onLinkClick(item.type, index, item.id)}
                        key={item.id}
                      >
                        {item.name}
                      </Link>
                    </h6>
                  ))}
                </div>
              </div>
              <Segment raised className="right-segment">
                <Grid columns={1}>
                  <Grid.Row className="mx-0">
                    <Grid.Column>
                      <div className="spaceBetween">
                        <h6 className="gray size-s1">{t("general")}</h6>
                        <h6 className="gray size-standard">{t("view-all")}</h6>
                      </div>
                      <h6 className="gray size-standard px-1">
                        <span className="gray size-standard">🚜</span> Start harvest planning for 2nd week of next month for best yield and market rate.
                      </h6>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              {history_data_7d || history_data_1M || history_data_1Y ? 
              (
                <ChartList
                  ranges={ranges.ranges}
                  data_7D={history_data_7d && history_data_7d}
                  data_1M={history_data_1M && history_data_1M}
                  data_1Y={history_data_1Y && history_data_1Y}
                  type={arrayType && arrayType}
                />
              ) : 
              (
                ""
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Responsive>


      {/* responsive from ipad till ipadPro */}
      <Responsive minWidth={768} maxWidth={1024}>
        <Grid container columns={2}>
          {/* {props.userFarms.length > 0 ? fillData(props.userFarms) : null} */}
          {/* left green section  */}
          <Grid.Row className="dashboard-content ml-2">
            <Grid.Column className="gridcolumn-left pl-5" tablet={7}>
              <Segment>
                <Grid columns={2}>
                  <Grid.Row className="ml-0 p-0">
                    <Grid.Column width={8}>
                      <h6 className="text-white pl-3 pt-3 green-left-header"> {t("field-info")} </h6>
                    </Grid.Column>
                    <Grid.Column>
                      <div className="text-white ml-5 pl-1 pt-3 green-right-header">
                        <AddFieldModal {...props} name={t("add-field")} />
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row  className="mx-0 py-0 mapContainer">
                    <Grid.Column width={16} className="p-0">
                      {props.userFarms.length > 0 && fieldId
                        ? props.userFarms.forEach((poly) => 
                        {
                          if (poly._id === fieldId) 
                          {
                            polygon = poly.location;
                            center = poly.address.location;
                          }
                        })
                        : null
                      }
                      <MapPolygon editable={false} polygon={polygon} center={center} />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="row2 mx-0">
                    <Grid.Column width={8}>
                      <div className="dropdown">
                        <Dropdown
                          placeholder="Select Field"
                          // defaultValue={selectedField}
                          defaultValue={fieldOptions[0].value}
                          scrolling
                          options={fieldOptions}
                          onChange={(e, { value }) => {
                            setFieldId(value);
                          }}
                        />
                      </div>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <div className="edit text-center">
                        <AddFieldModal
                          name={t("edit")}
                          color="rgba(60, 117, 60, 0.787)"
                          icon={true}
                          {...props}
                          farmId={fieldId ? fieldId : fieldOptions[0].value}
                        />
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                
                  {
                    farm || firstFarm ? (
                      // <div className="fildInfo">
                        <Grid.Row className="mx-0 p-0 text-white">
                          <Grid.Column width={8}>
                            <div className="">
                              <h6 className="row3 opacity">{t("location")}</h6>
                              <p className="opacity">
                                {` ${
                                  farm
                                    ? farm.address.location[0].toFixed(2)
                                    : firstFarm.address.location[1].toFixed(2)
                                } Lat ${
                                  farm
                                    ? farm.address.location[1].toFixed(2)
                                    : firstFarm.address.location[1].toFixed(2)
                                } Long `}
                              </p>
                            </div>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <div className="pr-3">
                              <h6 className="row3 opacity">{t("soil-type")}</h6>
                              <p className="opacity">{soiltype && soiltype.name}</p>
                            </div>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <div className="pt-3 ">
                              <h6 className="row3 opacity">{t("terren-type")}</h6>
                              <p className="opacity">
                                {terraintypes && terraintypes.name}
                              </p>
                            </div>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <div className="pr-3 mt-3">
                              <h6 className="row3 opacity">{t("water-source")}</h6>
                              <p className="opacity">{waterSource && waterSource.name}</p>
                            </div>
                          </Grid.Column>
                          <Grid.Column width={16}>
                            <hr className="mt-4"/>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <div className="">
                              <h6 className="row3 opacity">{t("crop")}</h6>
                              {/* <p className="opacity">Wheat (Triticum) </p> */}
                              <p className="opacity">
                                {croptype ? croptype.name : "Uncultivated"}{" "}
                              </p>
                            </div>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <div className="pr-3">
                              <h6 className="row3 opacity">{t("stage")}</h6>
                              {/* <p className="opacity">Harvesting</p> */}
                              <p className="opacity">
                                {cultivationtype ? cultivationtype.name : "Uncultivated"}
                              </p>
                            </div>
                          </Grid.Column>
                        </Grid.Row>
                        
                    ) : null
                  }
                </Grid>
              </Segment>
            </Grid.Column>

          {/* end of green section (left-side) */}

            <Grid.Column className="gridcolumn-right" tablet={9}>
              <Segment raised className="right-segment">
                <Grid columns={1}>
                  <Grid.Row className="mx-0">
                    <Grid.Column>
                      <p className="gray pl-3 py-2 size-s ipad-view">{t("field-insights")}</p>
                    </Grid.Column>
                    <Grid.Column>
                      <div className="fieldInsights pl-3 ml-2">
                        <div className="center">
                          <h1 className="size-L green-sec">
                            {fieldArea ? fieldArea.toFixed(2) : firstFieldArea.toFixed(2)}
                            <span className="size-s">ac</span>
                          </h1>
                          <p className="size-xs mb-3">{t("total-field-area")}</p>
                        </div>
                        <div className="center">
                          <h1 className="size-L green-sec ipad-view-heading">
                            413<span className="size-s">bu/ac</span>
                          </h1>
                          <p className="size-xs mb-3">{t("avg-yield")}</p>
                        </div>
                        <div className="center">
                          <h1 className="size-L green-sec">16</h1>
                          <p className="size-xs mb-3">{t("total-rec-activities")}</p>
                        </div>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              <div className="spaceBetween">
                <h6 className="gray "> {t("analytics-perscription")}</h6>
                <div className="spaceBetween">
                  <h6 className="gray mr-2 ml-2">{t("last")}</h6>
                  {linksArray.map((item, index) => (
                    <h6 className="mr-2 ml-2">
                      <Link
                        style={
                          item.active || (item.activeFirst && firstLinkActive)
                            ? activeLinkStyles
                            : linkStyles
                        }
                        onClick={() => onLinkClick(item.type, index, item.id)}
                        key={item.id}
                      >
                        {item.name}
                      </Link>
                    </h6>
                  ))}
                </div>
              </div>
              <Segment raised className="right-segment">
                <Grid columns={1}>
                  <Grid.Row className="mx-0">
                    <Grid.Column>
                      <div className="spaceBetween">
                        <h6 className="gray size-s1">{t("general")}</h6>
                        <h6 className="gray size-standard">{t("view-all")}</h6>
                      </div>
                      <h6 className="gray size-standard px-1">
                        <span className="gray size-standard">🚜</span> Start harvest planing for 2nd week of next month for best yield and market rate.
                      </h6>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              {history_data_7d || history_data_1M || history_data_1Y ? 
              (
                <ChartList
                  ranges={ranges.ranges}
                  data_7D={history_data_7d && history_data_7d}
                  data_1M={history_data_1M && history_data_1M}
                  data_1Y={history_data_1Y && history_data_1Y}
                  type={arrayType && arrayType}
                />
              ) : 
              (
                ""
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Responsive>
    </div>
    
  );
};

export default DashMidGrids;


  


