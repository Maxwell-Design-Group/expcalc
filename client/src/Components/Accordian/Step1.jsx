import Paper from "@mui/material//Paper";
import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LifeWork from "../../Assets/images/isLifeWork.png";
import axios from "axios";
import ClientDetailService from "../../Services/ClientDetailService";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Alert from "../Alert/Alert";
const Step1 = (props) => {
  const dispatch = useDispatch();
  const { isMobileView } = props;

  const clientDetailService = new ClientDetailService();
  const [clientName, setClientName] = useState("");
  const [contractType, setContractTypes] = useState(null);
  const [industryType, setiIndustryType] = useState(null);
  const [isLifeworks, setIsLifeworks] = useState(false);
  const [anticipatedRevenue, setAnticipatedRevenue] = useState("");
  const [population, setPopulation] = useState("");

  const { accordionId } = useSelector((state) => state.Reducer);
  const { masterData } = useSelector((state) => state.Master);
  let industrytypes = [];
  let contractTypes = [];
  if (masterData.industrytype) {
    industrytypes = masterData.industrytype;
    contractTypes = masterData.contracttypelist;
  }

  const [anticipatedRevenueRange, setAnticipatedRevenueRange] = useState([
    {
      value: 0,
      label: "$0",
    },
    // {
    //   value: 0,
    //   label: "$0",
    // },
    {
      value: 10,
      label: "$10M",
    },
  ]);
  const [populationRange, setPopulationRange] = useState([
    {
      value: 0,
      label: "0",
    },
    // {
    //   value: 1000,
    //   label: "1000",
    // },
    // {
    //   value: 2000,
    //   label: "2000",
    // },
    // {
    //   value: 3000,
    //   label: "3000",
    // },
    // {
    //   value: 4000,
    //   label: "4000",
    // },
    {
      value: 5000,
      label: "5000",
    },
  ]);

  function addClient(id) {
    let obj = {
      email: "",
      clientname: clientName,
      contracttype: contractType,
      lifeworks: isLifeworks,
      anticipatedrevenue: anticipatedRevenue,
      population: population,
      industrytype: industryType,

    };
    if (clientName === "" || clientName.length > 255) {
      Alert.error("Enter client name,0-255 characters");
      document.getElementById("clientName").focus();
    } else if (contractType === null || contractType === "") {
      Alert.error("Choose a contract type");
      document.getElementById("contractType").focus();
    } else if (industryType === null || industryType === "") {
      Alert.error("Select at least one industry type");
    } else if (Number(anticipatedRevenue) === 0) {
      Alert.error("Select the anticipated revenue");
      document.getElementById("AnticipatedRevenue").focus();
    } else if (Number(population) === 0) {
      Alert.error("Estimate the population");
      document.getElementById("Population").focus();
    } else {
      clientDetailService.sendData(obj, id);
    }
  }

  let contractTypeOption = [];
  contractTypes.forEach((data, index) => {
    contractTypeOption.push(
      <option value={data.industrytype}>{data.contracttypelist}</option>
    );
  });

  let industrytypeOption = [];
  industrytypes.forEach((data, index) => {
    industrytypeOption.push(
      <option value={data.industrytype}>{data.industrytype}</option>
    );
  });

  return (
    <div className="stepOne">
      <Row className="rowSeprator">
        <Col>
          <div style={{ display: "grid" }}>
            <label style={{ textAlign: "left" }} className="switchLabel">
              Client Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="clientName"
              value={clientName}
              placeholder="Enter Client Name"
              onChange={(e) => setClientName(e.target.value)}
              style={{
                border: "1px solid #D0CDCD",
                borderRadius: "25px",

                height: isMobileView ? "35px" : "45px",
                padding: isMobileView ? "0px 10px" : "10px 20px",
                width: "100%",
              }}
            />
          </div>
        </Col>
        <Col md={6}>
          <label style={{ float: "left" }} className="switchLabel">
            Contract Type<span style={{ color: "red" }}>*</span>
          </label>
          <select
            value={contractType}
            className={contractType ? "" : "select_placeholder"}
            onChange={(e) => {
              setContractTypes(e.target.value);
            }}
            id="contractType"
            style={{
              border: "1px solid #D0CDCD",
              borderRadius: "25px",
              height: isMobileView ? "35px" : "45px",
              padding: isMobileView ? "0px 10px" : "10px 15px",
              width: "100%",
              borderRight: "16px solid transparent",
              borderLeft: "1px solid transparent",
              borderTop: "1px solid transparent",
              borderBottom: "1px solid transparent",
              outline: "1px solid rgb(208, 205, 205)",
            }}
          >
            <option value="" selected>
              Select
            </option>
            {contractTypeOption}
          </select>
        </Col>
      </Row>
      <Row
        className="rowSeprator"
        style={{
          flexWrap: "nowrap",
        }}
      >
        <Col md={6} style={{
          paddingRight: isMobileView ? "0px" : "15px"
        }}>
          <label style={{ float: "left" }} className="switchLabel">
            Industry Type<span style={{ color: "red" }}>*</span>
          </label>{" "}
          <select
            id="industryType"
            className={industryType ? "" : "select_placeholder"}
            value={industryType}
            onChange={(e) => {
              setiIndustryType(e.target.value);
            }}
            style={{
              border: "1px solid #D0CDCD",
              borderRadius: "25px",
              height: isMobileView ? "35px" : "45px",
              padding: isMobileView ? "0px 10px" : "10px 15px",
              width: "100%",
              borderRight: "16px solid transparent",
              borderLeft: "1px solid transparent",
              borderTop: "1px solid transparent",
              borderBottom: "1px solid transparent",
              outline: "1px solid rgb(208, 205, 205)",
            }}
          >
            <option value="" selected>
              Select
            </option>
            {industrytypeOption}
          </select>
        </Col>
        <Col md={6} className="switchColumn">
          <img
            src={LifeWork}
            alt="lifeWork"
            style={isMobileView ? { width: "94px", height: "18px" } : { width: "104px", height: "20px" }}
          />
          <Switch
            id="Lifeworks"
            color="success"
            style={{ float: "left" }}
            checked={isLifeworks}
            onChange={(e) => setIsLifeworks(e.target.checked)}
          />
        </Col>
      </Row>
      <Row className="slider-container" style={{ paddingTop: "15px" }}>
        <Col md={6}>
          <div>
            <label
              style={{ float: "left", whiteSpace: "nowrap", margin: "0px" }}
              className="switchLabel-slider"
            >
              Anticipated Revenue<span style={{ color: "red" }}>*</span>
            </label>
            <Slider
              aria-label="Always visible"
              id="AnticipatedRevenue"
              style={{
                color: "#da291c",
                width: "91%",
                padding: "0px 0px",
                marginBottom: "20px",
              }}
              onChange={(e) => setAnticipatedRevenue(e.target.value)}
              value={anticipatedRevenue}
              min={0}
              max={10}
              marks={anticipatedRevenueRange}
              valueLabelDisplay="auto"
            />
          </div>
        </Col>
        <Col md={6} style={{ marginBottom: "1em" }}>
          <div>
            <label
              style={{ float: "left", whiteSpace: "nowrap" }}
              className="switchLabel-slider switchLabel-slider-pop"
            >
              Population<span style={{ color: "red" }}>*</span>
            </label>
            <Slider
              aria-label="Always visible"
              id="Population"
              min={0}
              max={5000}
              style={{
                color: "#da291c",
                width: "91%",
                padding: "0px 0px",
                marginBottom: "20px",
              }}
              onChange={(e) => setPopulation(e.target.value)}
              value={population}
              step={10}
              valueLabelDisplay="auto"
              marks={populationRange}
            />
          </div>
        </Col>
      </Row>
      <Row className="rowSeprator">
        <Col md={12} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            size="small"
            type="submit"
            className="next_btn"
            onClick={() => addClient(accordionId + 1)}
          >
            Next
          </Button>
        </Col>
      </Row>
    </div>
  );
};

Step1.propTypes = {};

export default Step1;
