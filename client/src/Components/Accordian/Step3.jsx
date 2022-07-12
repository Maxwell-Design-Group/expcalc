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
//import { makeStyles } from "@mui/styles";
import Alert from "../Alert/Alert";
const  makeStyles=new Object();

const useStyles = makeStyles({
  root: {
    width: "50px",
    height: "24px",
    padding: "0px",
  },
  switchBase: {
    color: "#818181",
    padding: "1px",
    "&$checked": {
      "& + $track": {
        backgroundColor: "#23bf58",
      },
    },
  },
  thumb: {
    color: "white",
    width: "22px",
    height: "22px",
    margin: "1px",
  },
  track: {
    borderRadius: "20px",
    backgroundColor: "#818181",
    opacity: "1 !important",
    "&:after, &:before": {
      color: "white",
      fontSize: "12px",
      position: "absolute",
      top: "3px",
      bottom: "3px",
    },
    "&:after": {
      content: "'Yes'",
      left: "8px",
    },
    "&:before": {
      content: "'No'",
      right: "7px",
    },
  },
  checked: {
    color: "#23bf58 !important",
    transform: "translateX(26px) !important",
  },
});

const yesDatas = [
  {
    value: "Essential",
  },
  {
    value: "Essential+",
  },
  {
    value: "Elevated",
  },
  {
    value: "Elevated+",
  },
];
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

  const classes = useStyles();

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
    dispatch(nextAccordionOpen(id));
  };
  let yesData = [];
  yesDatas.forEach((data, index) => {
    yesData.push(
      <Button
        className="formButtons"
        variant="secondary"
        name={data.value}
        value={data.value}
        onClick={(e) => handleYesButtons(data.value)}
        style={{
          backgroundColor: yesOption === data.value ? "#4BAE4F" : "#fff",
          color: yesOption === data.value ? "white" : "black",
          border: yesOption === data.value ? "" : "1px solid #979797",
        }}
      >
        {data.value}
      </Button>
    );
  });

  let footprintDatas = [];
  footprintData.forEach((data, index) => {
    footprintDatas.push(
      <Button
        className="formButtons"
        variant="secondary"
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
        variant="secondary"
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
        variant="secondary"
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
        variant="secondary"
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
  return (
    <>
      <Row className="logoNToggle">
        {/* <Col md={2}>
          <Button variant="secondary" className="LogoButton">
            Logo
          </Button>
        </Col>
        <Col md={1}>
          <Switch
            //   {...label}
            classes={{
              root: classes.root,
              switchBase: classes.switchBase,
              thumb: classes.thumb,
              track: classes.track,
              checked: classes.checked,
            }}
            inputProps={{ "aria-label": "secondary checkbox" }}
            color="success"
            style={{ float: "right" }}
            checked={yesOrNo}
            onChange={handleYesOrNoChange}
          />
        </Col> */}
      </Row>
      {/* <br />
      {yesOrNo ? (
        <>
          <Row className="Option">
            <Col className="heading" md={4}>
              <Typography variant="h6">
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
              <Typography variant="h6">
                <b>Footprint</b>
              </Typography>
            </Col>
            {footprintDatas}
          </Row>
          <br />
          <Row className="Option">
            <Col className="heading" md={2}>
              <Typography variant="h6">
                <b>On the go</b>
              </Typography>
            </Col>
            <Col>
              <Row className="alaCarteRow">{ontheGoDatas}</Row>
            </Col>
          </Row>
          <br />
          <Row className="Option">
            <Col className="heading" md={2}>
              <Typography variant="h6">
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
            <Col className="heading" md={2}>
              <Typography variant="h6">
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
                onClick={() => selectNoOption(accordionId + 1)}
              >
                Next
              </Button>
            </Col>
          </Row>
        </>
      )} */}
    </>
  );
};

export default Step3;
