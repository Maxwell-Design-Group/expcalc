import Paper from "@mui/material//Paper";
import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LifeWork from "../../Assets/images/isLifeWork.png";
import "../../Assets/Style/style.css";
import axios from "axios";
import ClientDetailService from "../../Services/ClientDetailService";
import Alert from "../Alert/Alert";
const Step1 = (props) => {
  const dispatch = useDispatch();

  const clientDetailService = new ClientDetailService();
  const [expand, setExpand] = useState(false);
  const [clientName, setClientName] = useState("");
  const [contractType, setContractTypes] = useState(null);
  const [industryType, setiIndustryType] = useState(null);
  const [isLifeworks, setIsLifeworks] = useState(false);
  const [anticipatedRevenue, setAnticipatedRevenue] = useState("");
  const [population, setPopulation] = useState("");

  const { accordionId } = useSelector((state) => state.Reducer);
  const { masterData } = useSelector((state) => state.Master);
  console.log("masterData ", masterData);
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
    {
      value: 0,
      label: "$0",
    },
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
    {
      value: 1000,
      label: "1000",
    },
    {
      value: 2000,
      label: "2000",
    },
    {
      value: 3000,
      label: "3000",
    },
    {
      value: 3000,
      label: "3000",
    },
    {
      value: 5000,
      label: "5000",
    },
  ]);
  console.log("industrytype ", masterData);
  function onAccordianChange(params) {
    setExpand(!expand);
  }
  function addClient(id) {
    let obj = {
      email: "",
      ClientName: clientName,
      ContractType: contractType,
      LifeWorks: isLifeworks,
      AnticipatedRevenue: anticipatedRevenue,
      Population: population,
      industry_Type: industryType,
    };
    if (clientName === "" || clientName.length > 255) {
      Alert.error("Enter client name,0-255 characters");
      document.getElementById("clientName").focus();
    } else if (contractType === null) {
      Alert.error("Choose a contract type");
      document.getElementById("contractType").focus();
    } else if (industryType === null) {
      Alert.error("Select at least one industry type");
    } else if (anticipatedRevenue === 0) {
      Alert.error("Select the anticipated revenue");
      document.getElementById("AnticipatedRevenue").focus();
    } else if (population === 0) {
      Alert.error("Estimate the population");
      document.getElementById("Population").focus();
    } else {
      console.log("id ", id);
      clientDetailService.sendData(obj, id);
    }
  }
  const label = { inputProps: { "aria-label": "Switch demo" } };
  console.log("accordionId ", accordionId);
  return (
    <div className="stepOne">
      <Row className="rowSeprator">
        <Col md={6} style={{ margin: "0 0 2em 0" }}>
          <TextField
            id="clientName"
            label="Client Name"
            variant="outlined"
            size="small"
            fullWidth
            required
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </Col>
        <Col md={6} style={{ marginBottom: "1em" }}>
          <Paper elevation={0}>
            <Autocomplete
              disablePortal
              id="contractType"
              options={contractTypes}
              sx={{ width: 300 }}
              value={contractType}
              getOptionLabel={(option) => option.contracttypelist}
              onChange={(event, value) => {
                setContractTypes(value);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Contract Type" required />
              )}
            />
          </Paper>
        </Col>
      </Row>
      <Row className="rowSeprator">
        <Col md={6} style={{ marginBottom: "1em" }}>
          <Paper elevation={0}>
            {" "}
            <Autocomplete
              disablePortal
              id="industryType"
              options={industrytypes}
              sx={{ width: 300 }}
              value={industryType}
              getOptionLabel={(option) => option.industrytype}
              onChange={(e, value) => {
                setiIndustryType(value);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Industry Type" required />
              )}
            />
          </Paper>
        </Col>
        <Col md={6}>
          <span className="switchLabel">
            {" "}
            <img src={LifeWork} alt="lifeWork" />
          </span>
          <Switch
            id="Lifeworks"
            color="success"
            style={{ float: "left" }}
            checked={isLifeworks}
            onChange={(e) => setIsLifeworks(e.target.checked)}
          />
        </Col>
      </Row>
      <Row className="rowSeprator">
        <Col md={6} style={{ marginBottom: "1em" }}>
          <div>
            &nbsp;
            <span className="switchLabel"> Anticipated Revenue * </span>
            <Slider
              aria-label="Always visible"
              id="AnticipatedRevenue"
              onChange={(e) => setAnticipatedRevenue(e.target.value)}
              value={anticipatedRevenue}
              min={0}
              max={10}
              marks={anticipatedRevenueRange}
            />
          </div>
        </Col>
        <Col md={6}>
          <div>
            &nbsp;
            <span className="switchLabel"> Population *</span>
            <Slider
              aria-label="Always visible"
              id="Population"
              min={0}
              max={5000}
              onChange={(e) => setPopulation(e.target.value)}
              value={population}
              step={10}
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
