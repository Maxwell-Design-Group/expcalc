import { Switch, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  completedSteps,
  nextAccordionOpen,
  prevAccordionOpen,
} from "../../Redux/Actions";
import { useSelector } from "react-redux";
import "../../Assets/Style/style.css";
import Alert from "../Alert/Alert";
import { useMediaQuery, useTheme } from "@mui/material";

const footprintData = [
  {
    id: 0,
    value: "Mobile",
  },
  {
    id: 1,
    value: "Kiosk",
  },
  {
    id: 2,
    value: "Self-Checkout",
  },
  {
    id: 3,
    value: "Cashier",
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
  const [yesOrNo, setYesOrNo] = useState(false);
  const [yesOption, setYesOption] = useState("");
  const [selectedFootprint, setSelectedFootprint] = useState([]);
  const [selectedNoOptions, setSelectedNoOptions] = useState([]);
  const dispatch = useDispatch();
  const { accordionId } = useSelector((state) => state.Reducer);
  const { masterData } = useSelector((state) => state.Master);
  const theme = useTheme();
  const isMatchSm = useMediaQuery(theme.breakpoints.down("sm"));

  let yesDatas = [];
  if (masterData.ccoption) {
    yesDatas = masterData.ccoption;
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
    if (selectedFootprint.includes(value)) {
      setSelectedFootprint((prev) =>
        prev.filter((item) => {
          return item !== value;
        })
      );
    } else {
      setSelectedFootprint((prev) => [...prev, value]);
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
      console.log("empty yes option");
    } else {
      dispatch(completedSteps(id));
      dispatch(nextAccordionOpen(id + 1));
    }
  };

  const onPrevious = (id) => {
    dispatch(prevAccordionOpen(id));
  };

  const selectNoOption = (id) => {
    let obj = {
      selectedNoOptions: selectedNoOptions,
      selectedFootprint: selectedFootprint,
    };
    if(selectedFootprint.length===0){
      Alert.error("select one option from Footprint");
    }else{
      dispatch(completedSteps(id));
      dispatch(nextAccordionOpen(id+1));
    }
    
  };

  let yesData = [];
  yesDatas.forEach((data, index) => {
    yesData.push(
      <Button
        className="formButtons"
        variant="light"
        name={data.custConvOption}
        value={data.custConvOption}
        onClick={(e) => handleYesButtons(data.custConvOption)}
        style={{
          backgroundColor:
            yesOption === data.custConvOption ? "#4BAE4F" : "#fff",
          color: yesOption === data.custConvOption ? "white" : "black",
          border: yesOption === data.custConvOption ? "" : "1px solid #979797",
        }}
      >
        {data.custConvOption}
      </Button>
    );
  });

  let footprintDatas = [];
  footprintData.forEach((data, index) => {
    footprintDatas.push(
      <Button
        className="formButtons"
        variant="light"
        key={data.value}
        name={data.value}
        value={data.value}
        onClick={() => handleFootprintButtons(data.value)}
        style={{
          backgroundColor: selectedFootprint.includes(data.value)
            ? "#4BAE4F"
            : "#fff",
          color: selectedFootprint.includes(data.value) ? "white" : "black",
          border: selectedFootprint.includes(data.value)
            ? ""
            : "1px solid #979797",
        }}
      >
        {data.value}
      </Button>
    );
  });

  let ontheGoDatas = [];
  onTheGoData.forEach((data, index) => {
    ontheGoDatas.push(
      <Button
        className="formButtons"
        variant="light"
        name={data.value}
        value={data.value}
        onClick={() => handleNoButtons(data.value)}
        style={{
          backgroundColor: selectedNoOptions.includes(data.value)
            ? "#4BAE4F"
            : "#fff",
          color: selectedNoOptions.includes(data.value) ? "white" : "black",
          border: selectedNoOptions.includes(data.value)
            ? ""
            : "1px solid #979797",
        }}
      >
        {data.value}
      </Button>
    );
  });

  let localVarietyDatas = [];
  localVarietyData.forEach((data, index) => {
    localVarietyDatas.push(
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
          color: selectedNoOptions.includes(data.value) ? "white" : "black",
          border: selectedNoOptions.includes(data.value)
            ? ""
            : "1px solid #979797",
        }}
      >
        {data.value}
      </Button>
    );
  });

  
  let alaCarteDatas = [];
  alaCarteData.forEach((data, index) => {
    alaCarteDatas.push(
      <Button
        className="formButtonsAla"
        variant="light"
        name={data.value}
        value={data.value}
        onClick={(e) => handleNoButtons(data.value)}
        style={{
          backgroundColor: selectedNoOptions.includes(data.value)
            ? "#4BAE4F"
            : "#fff",
          color: selectedNoOptions.includes(data.value) ? "white" : "black",
          border: selectedNoOptions.includes(data.value)
            ? ""
            : "1px solid #979797",
        }}
      >
        {data.value}
      </Button>
    );
  });
  

  function addStep3(id) {
    

    //console.log(userSelectedThemes);
     let userSelectedThemes ="";
    if (userSelectedThemes.length === 0) {
      // Alert.error("Choose at least 1 win theme");
      // for (let i = 0; i < winThemelist.length; i++) {
      //   document.getElementById("themesBtn" + i).style.border = "1px solid red";
      // }
    } else {
      // let wth = "";
      // for (let i = 0; i < userSelectedThemes.length; i++) {
      //   wth = wth + "," + userSelectedThemes[i];
        
      // }
        // let obj = {
        //   email: "",
        //   clientname: clientName,
        //   contracttype: contractType,
        //   lifeworks: isLifeworks,
        //   anticipatedrevenue: anticipatedRevenue,
        //   population: population,
        //   industrytype: industryType,
        //   wintheme:wth,
        // };

        // console.log(obj);
        // clientDetailService.updateDate(obj, id); // should be pass client id
      
    }
  }

  return (
    <>
    {isMatchSm ? (
      <>
     
      <Row className="logoNToggleSm">
        <Col>
          <Button variant="secondary" className="LogoButton">
            Logo
          </Button>
        </Col>
        <Col >
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
              <Typography variant="subtitle1">
                <b> What option would they like?</b>
              </Typography>
            </Col>
            {yesData}
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
            {footprintDatas}
          </Row>
          <br />
          <Row className="Option">
            <Col className="heading" md={2}>
              <Typography variant="subtitle1">
                <b>On the go</b>
              </Typography>
            </Col>
            <Col>
              <Row className="alaCarteRow">{ontheGoDatas}</Row>
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
            {localVarietyDatas}
          </Row>
          <br />
          <Row className="OptionAla">
            <Col className="headingAla" md={2}>
              <Typography variant="subtitle1">
                <b>A la carte</b>
              </Typography>
            </Col>
            <Col>
              <Row>{alaCarteDatas}</Row>
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
    ):(
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
              <Typography variant="subtitle1">
                <b> What option would they like?</b>
              </Typography>
            </Col>
            {yesData}
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
            {footprintDatas}
          </Row>
          <br />
          <Row className="Option">
            <Col className="heading" md={2}>
              <Typography variant="subtitle1">
                <b>On the go</b>
              </Typography>
            </Col>
            <Col>
              <Row className="alaCarteRow">{ontheGoDatas}</Row>
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
            {localVarietyDatas}
          </Row>
          <br />
          <Row className="OptionAla">
            <Col className="headingAla" md={2}>
              <Typography variant="subtitle1">
                <b>A la carte</b>
              </Typography>
            </Col>
            <Col>
              <Row>{alaCarteDatas}</Row>
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
