import React, { useState, useEffect } from "react";
import { Grid, GridRow, Button, Dropdown } from "semantic-ui-react";
import MapPolygon from "../../MapPolygon/MapPolygon";
import AutoComplete from "../../PlacesAutocomplete/Autocomplete";
import { fillSelect, calculateArea } from "../../../utils/utilsFunctions";
import { useTranslation } from "react-i18next";
import "./AddEditFarm.scss";
import sgLogo from "../../../images/LOGO.svg";
import { updateUserFarmDevice } from "../../../services/farm";

export default function AddEditFarm(props) {
  const { t } = useTranslation(["add-edit-farm", "common"]);
  const farmId = props.farmId || "";
  console.log({ farmId });
  const farmSelected = farmId
    ? props.userFarms.find((f) => f._id === farmId)
    : undefined;
  const defaultFarm = () => {
    return farmSelected
      ? farmSelected
      : {
        location: [],
        soilTypeId: "",
        terrainTypeId: "",
        waterSourceId: "",
        address: {
          addressName: "",
          location: [],
        },
      };
  };
  const defaultMap = {
    area: 0,
    polygon: defaultFarm().location.length ? defaultFarm().location : [],
    center: defaultFarm().address.location.length
      ? defaultFarm().address.location
      : [],
  };
  const defaultAddress = {
    addressName: defaultFarm().address.addressName,
    location: defaultFarm().address.location,
  };
  const [map, setMap] = useState(defaultMap);
  const [address, setAddress] = useState(defaultAddress);
  const [farm, setFarm] = useState(defaultFarm());

  const [soilTypeId, setSoilTypeId] = useState("");
  const [terrainTypeId, setTerrainTypeId] = useState("");
  const [waterSourceId, setWaterSourceId] = useState("");
  const [saving, setSaving] = useState(false);
  const [userFarms, setUserFarms] = useState([]);
  const [browserLoc, setBrowserLoc] = useState([]);

  const setCenter = (position) => {
    const centerNew = [position.coords.latitude, position.coords.longitude];
    setBrowserLoc(centerNew);
  };

  const getBrowserLocation = () => {
    if (!map.center.length && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setCenter);
    }
  };
  const setDefaults = () => {
    let map = defaultMap;
    if (defaultMap.polygon && defaultMap.polygon.length) {
      map = {
        ...defaultMap,
        area: calculateArea([defaultMap.polygon]) * 0.000247105,
      };
    }
    setMap(map);
    setAddress(defaultAddress);
    setFarm(defaultFarm());
    setSoilTypeId(defaultFarm().soilTypeId);
    setTerrainTypeId(defaultFarm().terrainTypeId);
    setWaterSourceId(defaultFarm().waterSourceId);
    setUserFarms(props.userFarms);
  };

  useEffect(() => {
    document.title = t(props.title);
    getBrowserLocation();
    if (userFarms.length !== props.userFarms.length) {
      setDefaults();
    }
  });

  const onChange = (polygon) => {
    const area =
      calculateArea(polygon && polygon.length ? [polygon] : []) * 0.000247105; // area in sq meters converting to acres
    const mapNew = { ...map };
    mapNew.area = area;
    mapNew.polygon = polygon;
    setMap(mapNew);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const farmName = farm.farmName
      ? farm.farmName
      : "Field" + (props.userFarms.length + 1);
    // TODO add validation error messages
    if (validateForm()) {
      const { addFarm, editFarm } = props;
      setSaving(true);
      const { polygon } = map;
      farm.location = polygon;
      farm.farmName = farmName;
      farm.userId = props.userId;
      farm.address = address;
      farm.soilTypeId = soilTypeId;
      farm.terrainTypeId = terrainTypeId;
      farm.waterSourceId = waterSourceId;
      try {
        if (farm._id) {
          await editFarm(farm, props.token);
          updateUserFarmDevice(props.userId);
          if (props.handleClose) {
            props.handleClose();
          }
        } else {
          await addFarm(farm, props.token);
          updateUserFarmDevice(props.userId);
          if (props.handleClose) {
            props.handleClose();
          }
        }
        props.history.push("/dashboard");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const validateForm = () => {
    const { polygon } = map;
    let polygonErr = false;
    let mandatoryFieldsErr = false;
    let addressErr = false;

    if (!polygon || polygon.length < 4) {
      polygonErr = true;
    }
    if (!soilTypeId || !terrainTypeId || !waterSourceId) {
      mandatoryFieldsErr = true;
    }
    if (!address.addressName || !address.location.length) {
      addressErr = true;
    }
    return !(polygonErr || mandatoryFieldsErr || addressErr);
  };

  const getMapCenter = () => {
    let centerProp = address.location;
    if (!centerProp.length) {
      centerProp = map.center.length ? map.center : [];
    }
    if (!centerProp.length) {
      centerProp = browserLoc.length ? browserLoc : [];
    }
    return !centerProp.length ? undefined : centerProp;
  };

  const polygon =
    farm.location &&
      farm.location.length &&
      JSON.stringify(farm.address.location) === JSON.stringify(address.location)
      ? farm.location
      : [];
  return (
    <div className="complelet-profile">
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
            <div>
              <div className="top">
                <div>
                  <a href="/" onClick={() => props.history.push("/")}>
                    <img className="iclogo" src={sgLogo} alt="logo" />
                  </a>
                </div>
                <div>
                  <h5 className="ml-3 pt-4 title">sensegrass</h5>
                </div>
              </div>
              <Grid className="body">
                <Grid.Row columns={1}>
                  <Grid.Column>
                    <div>
                      <h6 className="mb-4  mt-4">enter farm details</h6>
                      <AutoComplete
                        placeChangeHandler={(address) => {
                          setAddress(address);
                        }}
                        address={
                          defaultFarm().address.addressName
                            ? defaultFarm().address.addressName
                            : address.addressName
                        }
                      ></AutoComplete>
                      <h6 className="mb-4  mt-4">selected farm area is</h6>
                      <h1 className="acres">
                        {Math.ceil(map.area * 100) / 100} acres
                      </h1>
                      <h6 className="mb-4" style={{ textTransform: "lowercase" }}> free up to 5 acres</h6>
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <GridRow columns={2}>
                  <Grid.Column>
                    <h6>select soil type </h6>
                    <Dropdown
                      className="mb-2 mt-2 select"
                      placeholder={t("common:select")}
                      options={fillSelect("soil", props.soiltypes)}
                      onChange={(e, data) => {
                        setSoilTypeId(data.value);
                      }}
                      value={soilTypeId}
                      search
                      selection
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <h6>terrain type</h6>
                    <Dropdown
                      className="mb-2 mt-2 select"
                      placeholder={t("common:select")}
                      options={fillSelect("terrain", props.terraintypes)}
                      onChange={(e, data) => {
                        setTerrainTypeId(data.value);
                      }}
                      value={terrainTypeId}
                      search
                      selection
                    />
                    <div>
                      <h6 className="mt-2">water source</h6>
                      <Dropdown
                        className="mb-2 mt-2 select"
                        placeholder={t("common:select")}
                        options={fillSelect("watersource", props.watersources)}
                        onChange={(e, data) => {
                          setWaterSourceId(data.value);
                        }}
                        value={waterSourceId}
                        search
                        selection
                      />
                    </div>
                    <Button
                      color="green"
                      className="bttn mt-4"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {t("common:save")}
                    </Button>
                  </Grid.Column>
                </GridRow>
              </Grid>
            </div>
          </Grid.Column>
          <Grid.Column width={11}>
            <MapPolygon
              onChange={onChange}
              editable={true}
              center={getMapCenter()}
              polygon={polygon}
              zoom={address.location && address.location.length ? 20 : 16}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
