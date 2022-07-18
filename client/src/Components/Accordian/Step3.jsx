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
const onTheGoData = [
  {
    value: "Grab-n-go(in cafe)",
  },
  {
    value: "Micromarket(Standalone)",
  },
  {
    value: "Coffee-Barista",
  },
  {
    value: "Coffee-Self-Serve",
  },
];
const localVarietyData = [
  {
    value: "Local restaurant row",
  },
  {
    value: "Pop-up",
  },
  {
    value: "Flex",
  },
];
const alaCarteData = [
  {
    value: "Honor Market/Pantry",
  },
  {
    value: "Market/Salad Bar",
  },
  {
    value: "MTO salad",
  },
  {
    value: "Deli",
  },
  {
    value: "Global",
  },
  {
    value: "Grill",
  },
  {
    value: "Entree/Exhibition",
  },
  {
    value: "Sushi/Poke Bowl",
  },
  {
    value: "Pizza/Italian",
  },
];

const Step3 = () => {
  const DiningExperience = new DiningExperienceService();
  const calculatedata = new calculatedataService()
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
  const { mobile, kiosk, selfCheckout, cashier } = selectedFootprintBool;
  const [footButtons, setFootButtons] = useState([
    {
      value: "",
      name: "",
    },
  ]);
  const dispatch = useDispatch();
  const { accordionId } = useSelector((state) => state.Reducer);
  const { masterData } = useSelector((state) => state.Master);
  const theme = useTheme();
  const isMatchSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMatchMd = useMediaQuery(theme.breakpoints.down("md"));
  const { clientDetails } = useSelector((state) => state.Reducer);
  let yesDatas = [];
  if (masterData.ccoption) {
    yesDatas = masterData.ccoption;
  }

  const handleYesOrNoChange = (e) => {
    setYesOrNo(e.target.checked);
    calculation();
  };

  const handleYesButtons = (value) => {
    if (yesOption === value) {
      setYesOption("");
    } else {
      setYesOption(value);
    }
    calculation();
  };

  const handleFootprintButtons = (value) => {
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
    calculation();
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
    calculation();
  };

  const selectYesOption = (id) => {
    if (yesOption === "") {
      Alert.error("select any Option");
    } else {
      let obj = {
        customisableconvenience: yesOrNo,
        customisableconvenienceoption: yesOption,
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
        customisableconvenience: yesOrNo,
        mobile: mobile,
        kiosk: kiosk,
        selfCheckout: selfCheckout,
        cashier: cashier,
        station: station,
      };
      DiningExperience.sendData(obj, id, clientDetails);
    }
  };

  const filteringFootButtons = () => {
    if (clientDetails.population < 100) {
      setFootButtons(
        footprintData.filter((data) => {
          return data.name === "mobile" || data.name === "selfCheckout";
        })
      );
    }else if(clientDetails.population >= 101 && clientDetails.population <= 149){
      setFootButtons(
        footprintData.filter((data) => {
      return data.name === "kiosk" || data.name === "selfCheckout";
        }));
    }else if(clientDetails.population >= 150 && clientDetails.population <= 200){
      setFootButtons(
        footprintData.filter((data) => {
      return data.name === "mobile" 
        }));
    }else if(clientDetails.population >= 201 && clientDetails.population <= 300){
      setFootButtons(
        footprintData.filter((data) => {
      return data.name === "cashier" || data.name === "selfCheckout";
        }));
    }else if(clientDetails.population >= 301 && clientDetails.population <= 499){
      setFootButtons(
        footprintData.filter((data) => {
      return data.name === "kiosk" || data.name === "cashier";
        }));
    }else if(clientDetails.population >= 500 && clientDetails.population <= 550){
      setFootButtons(
        footprintData.filter((data) => {
      return data.name === "cashier";
        }));
    }else if(clientDetails.population >= 551 && clientDetails.population <= 600){
      setFootButtons(
        footprintData.filter((data) => {
      return data.name === "selfCheckout";
        }));
    }else if(clientDetails.population >= 601 && clientDetails.population <= 1000){
      setFootButtons(
        footprintData.filter((data) => {
      return data.name === "kiosk";
        }));
    }else if(clientDetails.population >= 1001 && clientDetails.population <= 3000){
      setFootButtons(
        footprintData.filter((data) => {
      return data.name === "mobile" || data.name === "kiosk";
        }));
    }else if(clientDetails.population >= 3001 && clientDetails.population <= 5000){
      setFootButtons(
        footprintData.filter((data) => {
      return data.name === "mobile" || data.name === "kiosk" || data.name === "cashier";
        }));
    }
  };

  useEffect(() => {
    filteringFootButtons();
    console.log("footButtons" + JSON.stringify(footButtons));
    console.log("clientDetailsss" + JSON.stringify(clientDetails.population));
  }, [accordionId]);


  function calculation() {
    let calcObj ={
      "population":clientDetails.population,  
      "wintheme":clientDetails.wintheme,
      "customisableconvenience":yesOrNo,
      "customisableconvenienceoption":yesOption,
      "mobile":selectedFootprintBool.mobile,
      "kiosk":selectedFootprintBool.kiosk,
      "selfcheckout":selectedFootprintBool.selfCheckout,
      "cashier":selectedFootprintBool.cashier,
      "station":selectedNoOptions,
      "digitalsignage": undefined,
      "digitalsignageqty":undefined,
      "catering":undefined,
      "pos":undefined,
      "suportingfeature":undefined,
      "wtproduct":undefined,
      "master":masterData
    }
    calculatedata.getcalculation(calcObj);
    
  }


  return (
    <>
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
                          yesOption === data.custConvOption ? "white" : "black",
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
              <br/>
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
                      onClick={() => handleFootprintButtons(data.name)}
                      style={{
                        backgroundColor: selectedFootprint.includes(data.value)
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
                  {onTheGoData.map((data, index) => (
                    <Button
                      className="formButtonsRs"
                      variant="light"
                      name={data.value}
                      value={data.value}
                      onClick={() => handleNoButtons(data.value)}
                      style={{
                        backgroundColor: selectedNoOptions.includes(data.value)
                          ? "#4BAE4F"
                          : "#fff",
                        color: selectedNoOptions.includes(data.value)
                          ? "white"
                          : "black",
                        border: selectedNoOptions.includes(data.value)
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
                    <b>
                      Local
                      <br />
                      Variety
                    </b>
                  </Typography>
                </Col>
                <Row className="DataScrollRs">
                  {localVarietyData.map((data, index) => (
                    <Button
                      className="formButtonsRs"
                      variant="light"
                      name={data.value}
                      value={data.value}
                      onClick={(e) => handleNoButtons(data.value)}
                      style={{
                        backgroundColor: selectedNoOptions.includes(data.value)
                          ? "#4BAE4F"
                          : "#fff",
                        color: selectedNoOptions.includes(data.value)
                          ? "white"
                          : "black",
                        border: selectedNoOptions.includes(data.value)
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
                    <b>A la carte</b>
                  </Typography>
                </Col>
                <Row className="DataScrollRs">
                  {alaCarteData.map((data, index) => (
                    <Button
                      className="formButtonsRs"
                      variant="light"
                      name={data.value}
                      value={data.value}
                      onClick={(e) => handleNoButtons(data.value)}
                      style={{
                        backgroundColor: selectedNoOptions.includes(data.value)
                          ? "#4BAE4F"
                          : "#fff",
                        color: selectedNoOptions.includes(data.value)
                          ? "white"
                          : "black",
                        border: selectedNoOptions.includes(data.value)
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
              <br/>
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
                        yesOption === data.custConvOption ? "#4BAE4F" : "#fff",
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
                {footButtons.map((data, index) => (
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
                    {onTheGoData.map((data, index) => (
                      <Button
                        className="formButtons"
                        variant="light"
                        name={data.value}
                        value={data.value}
                        onClick={() => handleNoButtons(data.value)}
                        style={{
                          backgroundColor: selectedNoOptions.includes(
                            data.value
                          )
                            ? "#4BAE4F"
                            : "#fff",
                          color: selectedNoOptions.includes(data.value)
                            ? "white"
                            : "black",
                          border: selectedNoOptions.includes(data.value)
                            ? ""
                            : "1px solid #979797",
                        }}
                      >
                        <Typography variant="subtitle2">
                          {" "}
                          {data.value}
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
                {localVarietyData.map((data, index) => (
                  <Button
                    className="formButtons"
                    variant="light"
                    name={data.value}
                    value={data.value}
                    onClick={(e) => handleNoButtons(data.value)}
                    style={{
                      backgroundColor: selectedNoOptions.includes(data.value)
                        ? "#4BAE4F"
                        : "#fff",
                      color: selectedNoOptions.includes(data.value)
                        ? "white"
                        : "black",
                      border: selectedNoOptions.includes(data.value)
                        ? ""
                        : "1px solid #979797",
                    }}
                  >
                    <Typography variant="subtitle2"> {data.value}</Typography>
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
                    {alaCarteData.map((data, index) => (
                      <Button
                        className="formButtonsAla"
                        variant="light"
                        name={data.value}
                        value={data.value}
                        onClick={(e) => handleNoButtons(data.value)}
                        style={{
                          backgroundColor: selectedNoOptions.includes(
                            data.value
                          )
                            ? "#4BAE4F"
                            : "#fff",
                          color: selectedNoOptions.includes(data.value)
                            ? "white"
                            : "black",
                          border: selectedNoOptions.includes(data.value)
                            ? ""
                            : "1px solid #979797",
                        }}
                      >
                        <Typography variant="subtitle2">
                          {" "}
                          {data.value}
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
    </>
  );
};

export default Step3;
