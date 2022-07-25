import { Switch, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { prevAccordionOpen } from "../../Redux/Actions";
import { useSelector } from "react-redux";
import "../../Assets/Style/style.css";
import Alert from "../Alert/Alert";
import { useMediaQuery, useTheme } from "@mui/material";
import DiningExperienceService from "../../Services/DiningExperienceService";
import calculatedataService from "../../Services/calculatedataService";
import { useEffect } from "react";
import elevated from "../../Assets/images/Step3/elavated.png";
import elevatedPlus from "../../Assets/images/Step3/elevatedPlus.png";
import essential from "../../Assets/images/Step3/essential.png";
import essentialPlus from "../../Assets/images/Step3/essentialPlus.png";
import ccOption from "../../Assets/images/Step3/ccOption.png";

const footprintData = [
  {
    id: 0,
    value: "Mobile",
    name: "mobile",
  },
  {
    id: 1,
    value: "Kiosk",
    name: "kiosk",
  },
  {
    id: 2,
    value: "Self-Checkout",
    name: "selfCheckout",
  },
  {
    id: 3,
    value: "Cashier",
    name: "cashier",
  },
];

const yesImages = [
  {
    img: essential,
  },
  {
    img: essentialPlus,
  },
  {
    img: elevated,
  },
  {
    img: elevatedPlus,
  },
];
const Step3 = (props) => {
  const { isMobileView = false, disabled = disabled } = props;
  const DiningExperience = new DiningExperienceService();
  const calculatedata = new calculatedataService();
  const [yesOrNo, setYesOrNo] = useState(false);
  const [yesOption, setYesOption] = useState("");
  const [selectedFootprint, setSelectedFootprint] = useState([]);
  const [selectedNoOptions, setSelectedNoOptions] = useState([]);
  const [selectedFootprintBool, setSelectedFootprintBool] = useState({
    mobile: false,
    kiosk: false,
    selfCheckout: false,
    cashier: false,
  });
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const { accordionId } = useSelector((state) => state.Reducer);
  const { masterData } = useSelector((state) => state.Master);
  const theme = useTheme();
  const isMatchSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMatchMd = useMediaQuery(theme.breakpoints.down("md"));
  const { clientDetails } = useSelector((state) => state.Reducer);
  const { mobile, kiosk, selfCheckout, cashier } = selectedFootprintBool;

  var master = [];

  if (masterData.ccoption) {
    master = masterData.ccoption.map((master, index) => {
      if (yesImages[index]) {
        return {
          ...master,
          image: yesImages[index].img,
        };
      }
    });
    master = master.filter(function (el) {
      return el != null;
    });
  }

  // let yesDatas = [];
  // if (masterData.ccoption) {
  //   yesDatas = masterData.ccoption;
  // }

  let stationData = [];
  if (masterData.stationdata) {
    stationData = masterData.stationdata;
  }

  var stationList = [];
  stationData.filter(function (item) {
    var i = stationList.findIndex(
      (x) => x.station === item.station && x.type === item.type
    );
    if (i <= -1) {
      stationList.push(item);
    }
    return null;
  });

  let population = clientDetails.population;

  if (document.getElementsByName("Mobile")[0] != undefined) {
    document.getElementsByName("Mobile")[0].disabled = false;
    document.getElementsByName("Cashier")[0].disabled = false;
    document.getElementsByName("Self-Checkout")[0].disabled = false;
    document.getElementsByName("Kiosk")[0].disabled = false;
  }

  if (population >= 0 && population <= 250) {
    if (document.getElementsByName("Kiosk")[0] != undefined) {
      document.getElementsByName("Kiosk")[0].disabled = true;
    }
    if (document.getElementsByName("Self-Checkout")[0] != undefined) {
      document.getElementsByName("Self-Checkout")[0].disabled = true;
    }
  }

  if (population >= 0 && population <= 250) {
    document.getElementsByName("Kiosk")[0].disabled = true;
    document.getElementsByName("Self-Checkout")[0].disabled = true;
  }

  const handleYesOrNoChange = (e) => {
    setYesOrNo(e.target.checked);
  };

  const handleYesButtons = (value) => {
    if (yesOption === value) {
      setYesOption("");
    } else {
      setYesOption(value);
      setError(false);
    }
  };

  const refresh = () => {
    if (yesOrNo === false) {
      setYesOption("");
      setError(false);
    } else {
      setSelectedFootprint([]);
      setSelectedNoOptions([]);
      setError(false);
    }
  };

  const handleFootprintButtons = (value) => {
    console.log(document.getElementsByName(value)[0]);
    if (selectedFootprint.includes(value)) {
      setSelectedFootprint((prev) =>
        prev.filter((item) => {
          return item !== value;
        })
      );
      setSelectedFootprintBool({ ...selectedFootprintBool, [value]: false });
    } else {
      setSelectedFootprint((prev) => [...prev, value]);
      setSelectedFootprintBool({ ...selectedFootprintBool, [value]: true });
      setError(false);
    }
  };

  const handleNoButtons = (value) => {
    if (selectedNoOptions.includes(value)) {
      setSelectedNoOptions((prev) =>
        prev.filter((item) => {
          return item !== value;
        })
      );
    } else {
      setSelectedNoOptions((prev) => [...prev, value]);
    }
  };

  const selectYesOption = (id) => {
    if (yesOption === "") {
      Alert.error("Select at least one Option");
      setError(true);
    } else {
      let obj = {
        ...clientDetails,
        customisableconvenience: yesOrNo,
        email: yesOption,
        "clientDetails.ccopt": yesOption,
      };
      DiningExperience.sendData(obj, id, clientDetails);
    }
  };

  const onPrevious = (id) => {
    dispatch(prevAccordionOpen(id));
  };

  const selectNoOption = (id) => {
    let station = "";
    if (selectedFootprint.length === 0) {
      Alert.error("Select at least one footprint");
      setError(true);
    } else {
      if (selectedNoOptions.length > 0) {
        station = selectedNoOptions.toString();
      }
      let obj = {
        ...clientDetails,
        customisableconvenience: yesOrNo,
        customisableconvenienceoption: "",
        mobile: mobile,
        kiosk: kiosk,
        selfcheckout: selfCheckout,
        cashier: cashier,
        station: station,
      };
      DiningExperience.sendData(obj, id, clientDetails);
    }
  };

  function calculation() {
    let calcObj = {
      population: clientDetails.population,
      wintheme: clientDetails.wintheme,
      customisableconvenience: yesOrNo,
      customisableconvenienceoption: yesOption,
      mobile: selectedFootprintBool.mobile,
      kiosk: selectedFootprintBool.kiosk,
      selfcheckout: selectedFootprintBool.selfCheckout,
      cashier: selectedFootprintBool.cashier,
      station: selectedNoOptions.toString(),
      digitalsignage: undefined,
      digitalsignageqty55: undefined,
      digitalsignageqty50: undefined,
      digitalsignageqty65: undefined,
      catering: undefined,
      pos: masterData.pos,
      suportingfeature: undefined,
      wtproduct: undefined,
      master: masterData,
    };
    calculatedata.getcalculation(calcObj);
  }

  function createGridView() {
    return (
      <div
        style={{
          flexWrap: "nowrap",
          overflowX: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {master.map((data, index) => {
          return (
            <div style={{ margin: "0px 10px 0.5em 10px" }} key={index}>
              <div
                className="yesOptions action"
                id={"themesBtn" + index}
                onClick={() => handleYesButtons(data.custConvOption)}
                style={{
                  overflow: "hidden",
                  border: error
                    ? "2px solid #880505"
                    : yesOption === data.custConvOption
                    ? "2px solid #4BAE4F"
                    : "1px solid #ebebeb",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    width: "21px",
                    height: "21px",
                    accentColor: "#4BAE4F",
                    border: "15px solid red",
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                  }}
                  labelStyle={{ color: "white" }}
                  iconStyle={{ fill: "white" }}
                  checked={yesOption === data.custConvOption}
                  name="checkedSacCode"
                  id={"theme_check" + index}
                  className="yesData_selecting"
                  onChange={(e) => handleYesButtons(data.custConvOption)}
                />
                <img
                  src={data.image}
                  alt={data.image}
                  style={{
                    display: "block",
                    margin: "0.5em 3.5em",
                    top: "20%",
                    position: "absolute",
                    width: "176px",
                    height: "105px",
                  }}
                />
                <div className="theme_label_container">
                  <span className="themesLabel" id={"thmsLbl" + index}>
                    {data.custConvOption}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  useEffect(() => {
    calculation();
  }, [yesOption, selectedNoOptions, selectedFootprintBool]);

  useEffect(() => {
    refresh();
  }, [yesOrNo]);

  function isFormEnableOrDisabled() {
    let isFormActive = "stepOne isStepDiabled";
    if (disabled === false) {
      isFormActive = "stepOne isStepActive";
    }
    return isFormActive;
  }

  return (
    <div
      onClick={() =>
        disabled === true ? Alert.error("Step 2 is not yet completed") : ""
      }
    >
      <div className={isFormEnableOrDisabled()}>
        {isMatchSm || isMatchMd ? (
          <>
            <div className="logoNToggleRs">
              <img
                className="customizable-convenience-img"
                src={ccOption}
                alt={ccOption}
              />
              <Switch
                className="switchButtonRs"
                inputProps={{ "aria-label": "secondary checkbox" }}
                color="success"
                style={{ float: "right" }}
                checked={yesOrNo}
                onChange={handleYesOrNoChange}
              />
            </div>
            <br />
            {yesOrNo ? (
              <>
                <Row className="OptionRs">
                  {/* <Col className="heading" md={12}>
                  <Typography variant="subtitle1">
                    <b> What option would they like?</b>
                  </Typography>
                </Col> */}
                  {createGridView()}
                </Row>
                <br />
                <Row className="lastButtons">
                  <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    className="previous_btn"
                    style={{
                      isMobileView,
                    }}
                    onClick={() => onPrevious(accordionId - 1)}
                  >
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontSize: isMobileView ? "12px" : "16px",
                      }}
                    >
                      Previous
                    </Typography>
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    className="next_btn3Rs"
                    onClick={() => selectYesOption(accordionId)}
                  >
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontSize: isMobileView ? "12px" : "16px",
                      }}
                    >
                      Next
                    </Typography>
                  </Button>
                </Row>
                <br />
              </>
            ) : (
              <>
                <Row className="OptionRs">
                  <Col className="headingRs" md={12}>
                    <Typography variant="subtitle1">
                      <b>Footprint</b>
                    </Typography>
                  </Col>
                  <Row className="DataScrollRs">
                    {footprintData.map((data, index) => (
                      <Button
                        className="formButtonsRs"
                        variant="light"
                        key={data.value}
                        name={data.value}
                        value={data.value}
                        onClick={() => handleFootprintButtons(data.name)}
                        style={{
                          backgroundColor: selectedFootprint.includes(data.name)
                            ? "#4BAE4F"
                            : "#fff",
                          color: selectedFootprint.includes(data.name)
                            ? "white"
                            : "black",
                          border: selectedFootprint.includes(data.name)
                            ? ""
                            : error === true
                            ? "1px solid #880505"
                            : "1px solid #979797",
                        }}
                      >
                        <Typography variant="h6">{data.value}</Typography>
                      </Button>
                    ))}
                  </Row>
                </Row>
                <br />
                <Row className="OptionRs">
                  <Col className="headingRs" md={12}>
                    <Typography variant="subtitle1">
                      <b>On the go</b>
                    </Typography>
                  </Col>
                  <Row className="DataScrollRs">
                    {stationList
                      .filter((item) => item.type === "On the go")
                      .map((data, index) => (
                        <Button
                          className="formButtonsRs"
                          variant="light"
                          name={data.station}
                          value={data.station}
                          onClick={() => handleNoButtons(data.station)}
                          style={{
                            backgroundColor: selectedNoOptions.includes(
                              data.station
                            )
                              ? "#4BAE4F"
                              : "#fff",
                            color: selectedNoOptions.includes(data.station)
                              ? "white"
                              : "black",
                            border: selectedNoOptions.includes(data.station)
                              ? ""
                              : "1px solid #979797",
                          }}
                        >
                          <Typography variant="h6">{data.station}</Typography>
                        </Button>
                      ))}
                  </Row>
                </Row>
                <br />
                <Row className="OptionRs">
                  <Col className="headingRs" md={12}>
                    <Typography variant="subtitle1">
                      <b>
                        Local
                        <br />
                        Variety
                      </b>
                    </Typography>
                  </Col>
                  <Row className="DataScrollRs">
                    {stationList
                      .filter((item) => item.type === "Local Veriety")
                      .map((data, index) => (
                        <Button
                          className="formButtonsRs"
                          variant="light"
                          name={data.value}
                          value={data.value}
                          onClick={(e) => handleNoButtons(data.station)}
                          style={{
                            backgroundColor: selectedNoOptions.includes(
                              data.station
                            )
                              ? "#4BAE4F"
                              : "#fff",
                            color: selectedNoOptions.includes(data.station)
                              ? "white"
                              : "black",
                            border: selectedNoOptions.includes(data.station)
                              ? ""
                              : "1px solid #979797",
                          }}
                        >
                          <Typography variant="h6">{data.station}</Typography>
                        </Button>
                      ))}
                  </Row>
                </Row>
                <br />
                <Row className="OptionRs">
                  <Col className="headingRs" md={12}>
                    <Typography variant="subtitle1">
                      <b>A la carte</b>
                    </Typography>
                  </Col>
                  <Row className="DataScrollRs">
                    {stationList
                      .filter((item) => item.type === "alacarte")
                      .map((data, index) => (
                        <Button
                          className="formButtonsRs"
                          variant="light"
                          name={data.value}
                          value={data.value}
                          onClick={(e) => handleNoButtons(data.station)}
                          style={{
                            backgroundColor: selectedNoOptions.includes(
                              data.station
                            )
                              ? "#4BAE4F"
                              : "#fff",
                            color: selectedNoOptions.includes(data.station)
                              ? "white"
                              : "black",
                            border: selectedNoOptions.includes(data.station)
                              ? ""
                              : "1px solid #979797",
                          }}
                        >
                          <Typography variant="h6">{data.station}</Typography>
                        </Button>
                      ))}
                  </Row>
                </Row>
                <br />
                <Row className="lastButtons">
                  <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    className="previous_btn"
                    onClick={() => onPrevious(accordionId - 1)}
                  >
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontSize: isMobileView ? "12px" : "16px",
                      }}
                    >
                      Previous
                    </Typography>
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    className="next_btn"
                    onClick={() => selectNoOption(accordionId)}
                  >
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontSize: isMobileView ? "12px" : "16px",
                      }}
                    >
                      Next
                    </Typography>
                  </Button>
                </Row>
                <br />
              </>
            )}
          </>
        ) : (
          <>
            <div className="logoNToggle">
              <img
                src={ccOption}
                alt={ccOption}
                className="customizable-convenience-img"
              />
              {/* <FormGroup>
              <FormControlLabel
                control={<Android12Switch defaultChecked />}
              />
            </FormGroup> */}
              <Switch
                inputProps={{ "aria-label": "secondary checkbox" }}
                color="success"
                style={{ float: "right" }}
                checked={yesOrNo}
                onChange={handleYesOrNoChange}
              />
            </div>
            <br />
            {yesOrNo ? (
              <>
                <Row className="rowSeprator ">{createGridView()}</Row>
                <Row className="rowSeprator" style={{ padding: "0 0.3em" }}>
                  <Col md={6} style={{ textAlign: "left" }}>
                    <Button
                      variant="contained"
                      size="small"
                      type="submit"
                      className="previous_btn"
                      onClick={() => onPrevious(accordionId - 1)}
                    >
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontSize: isMobileView ? "12px" : "16px",
                        }}
                      >
                        Previous
                      </Typography>
                    </Button>
                  </Col>
                  <Col md={6} style={{ textAlign: "right" }}>
                    <Button
                      variant="contained"
                      size="small"
                      type="submit"
                      className="next_btn3"
                      onClick={() => selectYesOption(accordionId)}
                    >
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontSize: isMobileView ? "12px" : "16px",
                        }}
                      >
                        Next
                      </Typography>
                    </Button>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Row className="Option">
                  <div className="heading">
                    <Typography variant="caption">
                      <b>
                        Digital
                        <br />
                        Touchpoints
                      </b>
                    </Typography>
                  </div>
                  {footprintData.map((data, index) => (
                    <Button
                      className="formButtons"
                      variant="light"
                      key={data.value}
                      name={data.value}
                      value={data.value}
                      onClick={() => handleFootprintButtons(data.name)}
                      style={{
                        backgroundColor: selectedFootprint.includes(data.name)
                          ? "#4BAE4F"
                          : "#fff",
                        color: selectedFootprint.includes(data.name)
                          ? "white"
                          : "black",
                        border: selectedFootprint.includes(data.name)
                          ? ""
                          : error === true
                          ? "2px solid #880505"
                          : "1px solid #979797",
                      }}
                    >
                      {data.value}
                    </Button>
                  ))}
                </Row>
                <Row className="serviceOfferings">SERVICE OFFERINGS</Row>
                <Row className="Option">
                  <div className="heading">
                    <Typography variant="caption">
                      <b>On the go</b>
                    </Typography>
                  </div>
                  <Col>
                    <Row className="alaCarteRow">
                      {stationList
                        .filter((item) => item.type === "On the go")
                        .map((data, index) => (
                          <Button
                            className="formButtons"
                            variant="light"
                            name={data.station}
                            value={data.station}
                            onClick={() => handleNoButtons(data.station)}
                            style={{
                              backgroundColor: selectedNoOptions.includes(
                                data.station
                              )
                                ? "#4BAE4F"
                                : "#fff",
                              color: selectedNoOptions.includes(data.station)
                                ? "white"
                                : "black",
                              border: selectedNoOptions.includes(data.station)
                                ? ""
                                : "1px solid #979797",
                            }}
                          >
                            {" "}
                            {data.station}
                          </Button>
                        ))}
                    </Row>
                  </Col>
                </Row>
                <Row className="Option">
                  <div className="headingLocal">
                    <Typography variant="caption">
                      <b>
                        Local
                        <br />
                        Variety
                      </b>
                    </Typography>
                  </div>
                  {stationList
                    .filter((item) => item.type === "Local Veriety")
                    .map((data, index) => (
                      <Button
                        className="formButtons"
                        variant="light"
                        name={data.station}
                        value={data.station}
                        onClick={(e) => handleNoButtons(data.station)}
                        style={{
                          backgroundColor: selectedNoOptions.includes(
                            data.station
                          )
                            ? "#4BAE4F"
                            : "#fff",
                          color: selectedNoOptions.includes(data.station)
                            ? "white"
                            : "black",
                          border: selectedNoOptions.includes(data.station)
                            ? ""
                            : "1px solid #979797",
                        }}
                      >
                        {data.station}
                      </Button>
                    ))}
                </Row>
                <Row className="Option">
                  <div className="headingAla">
                    <Typography variant="caption">
                      <b>A la carte</b>
                    </Typography>
                  </div>
                  <Col>
                    <Row>
                      {stationList
                        .filter((item) => item.type === "alacarte")
                        .map((data, index) => (
                          <Button
                            className="formButtons"
                            variant="light"
                            name={data.value}
                            value={data.value}
                            onClick={(e) => handleNoButtons(data.station)}
                            style={{
                              backgroundColor: selectedNoOptions.includes(
                                data.station
                              )
                                ? "#4BAE4F"
                                : "#fff",
                              color: selectedNoOptions.includes(data.station)
                                ? "white"
                                : "black",
                              border: selectedNoOptions.includes(data.station)
                                ? ""
                                : "1px solid #979797",
                            }}
                          >
                            {data.station}
                          </Button>
                        ))}
                    </Row>
                  </Col>
                </Row>
                <br />
                <Row className="" style={{ padding: "0 0.3em" }}>
                  <Col style={{ textAlign: "left" }}>
                    <Button
                      variant="contained"
                      size="small"
                      type="submit"
                      className="previous_btn"
                      onClick={() => onPrevious(accordionId - 1)}
                    >
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontSize: isMobileView ? "12px" : "16px",
                        }}
                      >
                        Previous
                      </Typography>
                    </Button>
                  </Col>
                  <Col style={{ textAlign: "right" }}>
                    <Button
                      variant="contained"
                      size="small"
                      type="submit"
                      className="next_btn"
                      onClick={() => selectNoOption(accordionId)}
                    >
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontSize: isMobileView ? "12px" : "16px",
                        }}
                      >
                        Next
                      </Typography>
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Step3;
