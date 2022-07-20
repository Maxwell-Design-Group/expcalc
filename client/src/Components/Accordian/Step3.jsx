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
//import stationlist from "../../../src/models/stationlist";
// import digitalsignage from "../../../src/models/digitalsignage";
// import posdata from "../../../src/models/posdata";
// import wtproduct from "../../../src/models/wtproduct";

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

const Step3 = (props) => {

  const { disabled = disabled } = props;
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

  const dispatch = useDispatch();
  const { accordionId } = useSelector((state) => state.Reducer);
  const { masterData } = useSelector((state) => state.Master);
  const theme = useTheme();
  const isMatchSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMatchMd = useMediaQuery(theme.breakpoints.down("md"));
  const { clientDetails } = useSelector((state) => state.Reducer);
  const { mobile, kiosk, selfCheckout, cashier } = selectedFootprintBool;

  let yesDatas = [];
  if (masterData.ccoption) {
    yesDatas = masterData.ccoption;
  }

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

      if (document.getElementsByName("Mobile")[0]!=undefined){
        document.getElementsByName("Mobile")[0].disabled=false;
        document.getElementsByName("Cashier")[0].disabled=false;
        document.getElementsByName("Self-Checkout")[0].disabled=false;
        document.getElementsByName("Kiosk")[0].disabled=false;
      }
      
     if (population>=0 && population<=250){
      
         document.getElementsByName("Kiosk")[0].disabled=true;
         document.getElementsByName("Self-Checkout")[0].disabled=true;
                    
     } 



  const handleYesOrNoChange = (e) => {
    setYesOrNo(e.target.checked);
  };

  const handleYesButtons = (value) => {
    if (yesOption === value) {
      setYesOption("");
    } else {
      setYesOption(value);
    }
  };

  const handleFootprintButtons = (value) => {

    console.log( document.getElementsByName(value)[0]);

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
      Alert.error("select any Option");
    } else {
      
      let obj = {
        ...clientDetails,
        customisableconvenience: yesOrNo,        
        email:yesOption,
        'clientDetails.ccopt':yesOption,
        
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
      Alert.error("select one option from Footprint");
    } else {
      if (selectedNoOptions.length > 0) {
        station = selectedNoOptions.toString();
      }
      let obj = {
        ...clientDetails,
        customisableconvenience: yesOrNo,
        customisableconvenienceoption:"",
        mobile: mobile,
        kiosk: kiosk,
        selfCheckout: selfCheckout,
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
      station: selectedNoOptions,
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
  useEffect(() => {
    calculation();
  }, [yesOption]);

  useEffect(() => {
    calculation();
    
    console.log(selectedNoOptions.toString());
  }, [selectedNoOptions]);

  useEffect(() => {
    calculation();
    console.log(selectedFootprintBool);
    console.log(selectedNoOptions.toString());
  }, [selectedFootprintBool]);


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
            <Row className="logoNToggleRs">
              <Button variant="secondary" className="LogoButtonRs">
                Logo
              </Button>
              <Switch
                className="switchButtonRs"
                inputProps={{ "aria-label": "secondary checkbox" }}
                color="success"
                style={{ float: "right" }}
                checked={yesOrNo}
                onChange={handleYesOrNoChange}
              />
            </Row>
            <br />
            {yesOrNo ? (
              <>
                <Row className="OptionRs">
                  <Col className="heading" md={12}>
                    <Typography variant="subtitle1">
                      <b> What option would they like?</b>
                    </Typography>
                  </Col>
                  <Row className="DataScrollRs">
                    {yesDatas.map((data, index) => (
                      <Button
                        className="formButtonsRs"
                        variant="light"
                        name={data.custConvOption}
                        value={data.custConvOption}
                        onClick={(e) => handleYesButtons(data.custConvOption)}
                        style={{
                          backgroundColor:
                            yesOption === data.custConvOption
                              ? "#4BAE4F"
                              : "#fff",
                          color:
                            yesOption === data.custConvOption
                              ? "white"
                              : "black",
                          border:
                            yesOption === data.custConvOption
                              ? ""
                              : "1px solid #979797",
                        }}
                      >
                        <Typography variant="h6">
                          {" "}
                          {data.custConvOption}
                        </Typography>
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
                    className="previous_btn3Rs"
                    onClick={() => onPrevious(accordionId - 1)}
                  >
                    <Typography variant="subtitle1">Previous</Typography>
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    className="next_btn3Rs"
                    onClick={() => selectYesOption(accordionId)}
                  >
                    <Typography variant="subtitle1">Next</Typography>
                  </Button>
                </Row>
                <br />
              </>
            ) : (
              <>
                <Row className="OptionRs">
                  <Col className="heading" md={12}>
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
                        onClick={() => handleFootprintButtons(data.value)}
                        style={{
                          backgroundColor: selectedFootprint.includes(
                            data.value
                          )
                            ? "#4BAE4F"
                            : "#fff",
                          color: selectedFootprint.includes(data.value)
                            ? "white"
                            : "black",
                          border: selectedFootprint.includes(data.value)
                            ? ""
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
                  <Col className="heading" md={12}>
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
                  <Col className="heading" md={12}>
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
                  <Col className="heading" md={12}>
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
                    className="previous_btn3Rs"
                    onClick={() => onPrevious(accordionId - 1)}
                  >
                    <Typography variant="subtitle1">Previous</Typography>
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    className="next_btn3Rs"
                    onClick={() => selectNoOption(accordionId)}
                  >
                    <Typography variant="subtitle1">Next</Typography>
                  </Button>
                </Row>
                <br />
              </>
            )}
          </>
        ) : (
          <>
            <Row className="logoNToggle">
              <Col md={2}>
                <Button variant="secondary" className="LogoButton">
                  Logo
                </Button>
              </Col>
              <Col md={1}>
                <Switch
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  color="success"
                  style={{ float: "right" }}
                  checked={yesOrNo}
                  onChange={handleYesOrNoChange}
                />
              </Col>
            </Row>
            <br />
            {yesOrNo ? (
              <>
                <Row className="Option">
                  <Col className="heading" md={4}>
                    <Typography variant="subtitle2">
                      <b> What option would they like?</b>
                    </Typography>
                  </Col>
                  {yesDatas.map((data, index) => (
                    <Button
                      className="formButtons"
                      variant="light"
                      name={data.custConvOption}
                      value={data.custConvOption}
                      onClick={(e) => handleYesButtons(data.custConvOption)}
                      style={{
                        backgroundColor:
                          yesOption === data.custConvOption
                            ? "#4BAE4F"
                            : "#fff",
                        color:
                          yesOption === data.custConvOption ? "white" : "black",
                        border:
                          yesOption === data.custConvOption
                            ? ""
                            : "1px solid #979797",
                      }}
                    >
                      <Typography variant="subtitle2">
                        {" "}
                        {data.custConvOption}
                      </Typography>
                    </Button>
                  ))}
                </Row>
                <br />
                <Row className="rowSeprator" style={{ padding: "0 0.3em" }}>
                  <Col md={6} style={{ textAlign: "left" }}>
                    <Button
                      variant="contained"
                      size="small"
                      type="submit"
                      className="previous_btn3"
                      onClick={() => onPrevious(accordionId - 1)}
                    >
                      Previous
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
                      Next
                    </Button>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Row className="Option">
                  <Col className="heading" md={2}>
                    <Typography variant="subtitle1">
                      <b>Footprint</b>
                    </Typography>
                  </Col>
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
                        color: selectedFootprint.includes(data.value)
                          ? "white"
                          : "black",
                        border: selectedFootprint.includes(data.value)
                          ? ""
                          : "1px solid #979797",
                      }}
                    >
                      <Typography variant="subtitle2"> {data.value}</Typography>
                    </Button>
                  ))}
                </Row>
                <br />
                <Row className="Option">
                  <Col className="heading" md={2}>
                    <Typography variant="subtitle1">
                      <b>On the go</b>
                    </Typography>
                  </Col>
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
                            <Typography variant="subtitle2">
                              {" "}
                              {data.station}
                            </Typography>
                          </Button>
                        ))}
                    </Row>
                  </Col>
                </Row>
                <br />
                <Row className="Option">
                  <Col className="headingLocal" md={2}>
                    <Typography variant="subtitle1">
                      <b>
                        Local
                        <br />
                        Variety
                      </b>
                    </Typography>
                  </Col>
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
                        <Typography variant="subtitle2">
                          {" "}
                          {data.station}
                        </Typography>
                      </Button>
                    ))}
                </Row>
                <br />
                <Row className="OptionAla">
                  <Col className="headingAla" md={2}>
                    <Typography variant="subtitle1">
                      <b>A la carte</b>
                    </Typography>
                  </Col>
                  <Col md={9}>
                    <Row>
                      {stationList
                        .filter((item) => item.type === "alacarte")
                        .map((data, index) => (
                          <Button
                            className="formButtonsAla"
                            variant="light"
                            name={data.value}
                            value={data.value}
                            onClick={(e) => handleNoButtons(data.station)}
                            style={{
                              backgroundColor: selectedNoOptions.includes(
                                data.value
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
                            <Typography variant="subtitle2">
                              {" "}
                              {data.station}
                            </Typography>
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
                      className="previous_btn3"
                      onClick={() => onPrevious(accordionId - 1)}
                    >
                      Previous
                    </Button>
                  </Col>
                  <Col style={{ textAlign: "right" }}>
                    <Button
                      variant="contained"
                      size="small"
                      type="submit"
                      className="next_btn3"
                      onClick={() => selectNoOption(accordionId)}
                    >
                      Next
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
