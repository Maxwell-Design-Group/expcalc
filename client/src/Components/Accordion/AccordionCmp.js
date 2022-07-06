import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Accordions from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import LifeWork from "../../assets/img/isLifeWork.png";
import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
// import { createMuiTheme } from "@material-ui/core";
// import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
// const formLabelsTheme = createMuiTheme({
//   overrides: {
//     MuiFormLabel: {
//       asterisk: {
//         color: "#db3131",
//         "&$error": {
//           color: "#db3131",
//         },
//       },
//     },
//   },
// });
class AccordionCmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: false,
      step1Data: null,
      step2Data: null,
      step3Data: null,
      step4Data: null,
      expanded: "",
      marks1: [
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
      ],
      marks2: [
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
      ],
      anticipatedRevenue: 0,
      isIndustryType: false,
      population: 0,
      userSelectedIndustryType: [],
      userSelectedThemes: [],
      isLifeworks: false,
      contractType: null,
      industryType: null,
      clientName: "",
      isThemesErrorMsg: false,
    };
  }

  handleInputNameChange(e) {
    this.setState({
      clientName: e.target.value,
    });
  }

  handleContractTypeChange(contractType) {
    this.state.contractType = contractType;
    this.setState({
      contractType: contractType,
    });
    if (undefined !== this.state.onChange && null !== this.state.onChange) {
      this.state.onChange(this.state);
    }
  }
  handleIndustryTypeChange(industryType) {
    this.state.industryType = industryType;
    this.setState({
      industryType: industryType,
    });
    if (undefined !== this.state.onChange && null !== this.state.onChange) {
      this.state.onChange(this.state);
    }
  }
  handleLifeworksChange(e) {
    this.setState({
      isLifeworks: e.target.checked,
    });
  }

  handleAnticipatedRevenueChange = (e, data) => {
    this.setState({
      anticipatedRevenue: data,
    });
  };
  handlePopulationChange = (e, data) => {
    this.setState({
      population: data,
    });
  };
  selectIndustry(e, industry, index) {
    const { checked } = e.target;
    let industries = this.state.userSelectedIndustryType;
    if (checked === true) {
      document.getElementById("industryBtn" + index).style.backgroundColor =
        "#EB2035";
      industries.push(industry);
      this.setState({
        userSelectedIndustryType: industries,
      });
    } else {
      for (let i = 0; i < industries.length; i++) {
        if (industries[i] === industry) {
          industries.splice(i, 1);
          document.getElementById("industryBtn" + index).style.backgroundColor =
            "white";
          this.setState({
            userSelectedIndustryType: industries,
          });
        }
      }
    }
  }
  handleAccordianChange(id) {
    this.setState({
      expanded: id,
    });
  }
  collapse(e) {
    if (this.state.onClick) {
      this.state.onClick(this.state);
    }
  }
  selectedThemes(e, theme, index) {
    const { checked } = e.target;
    let themes = this.state.userSelectedThemes;
    if (checked === true) {
      // document.getElementById("themesBtn" + index).style.backgroundColor =
      //   "#EB2035";
      document.getElementById("themesBtn" + index).style.backgroundColor =
        "#fff";
      document.getElementById("themesBtn" + index).style.border =
        "2px solid #4BAE4F";
      document.getElementById("theme_check" + index).style.opacity = "1";
      document.getElementById("thmsLbl" + index).style.color = "#566573";
      // document.getElementById("thmsLbl" + index).style.color = "#ffff";
      this.state.theme = true;
      themes.push(theme);
      this.setState({
        userSelectedThemes: themes,
      });
    } else {
      for (let i = 0; i < themes.length; i++) {
        if (themes[i] === theme) {
          themes.splice(i, 1);
          // document.getElementById("themesBtn" + index).style.backgroundColor =
          //   "#D5D8DC";
          document.getElementById("theme_check" + index).style.opacity = "0.1";
          document.getElementById("themesBtn" + index).style.border =
            "1px solid #fff";
          document.getElementById("thmsLbl" + index).style.color = "#808B96";

          this.setState({
            userSelectedThemes: themes,
          });
        }
      }
    }
  }
  accordionDetails(
    id,
    themes,
    onClientCreate,
    onThemeSelected,
    isThemesErrorMsg,
    onPrevious,
    contractTypes,
    industryTypes,
    onCheckWithTheme
  ) {
    const label = { inputProps: { "aria-label": "Switch demo" } };
    let winThemes = [];
    themes.forEach((theme, index) => {
      winThemes.push(
        <Col md={3} style={{ marginBottom: "0.5em" }} key={index}>
          <div className="">
            <div className="themes action" id={"themesBtn" + index}>
              {/* <label> */}
              <input
                type="checkbox"
                style={{
                  width: "100%",
                  margin: "-1em 0px 0px -11.4em",
                  height: "20px",
                  accentColor: "#4BAE4F",
                  border: "15px solid red",
                }}
                {...label}
                labelStyle={{ color: "white" }}
                iconStyle={{ fill: "white" }}
                defaultChecked={this.state.theme}
                name="checkedSacCode"
                id={"theme_check" + index}
                className="theme_checkbox_color"
                onChange={(e) => this.selectedThemes(e, theme.theme, index)}
              />
              {/* <Checkbox
                {...label}
                defaultChecked={this.state.theme}
                style={{
                  width: "100%",
                  margin: "-1em 0px 0px -11.4em !important",
                  height: "20px  !important",
                }}
                color="success"
                onChange={(e) => this.selectedThemes(e, theme.theme, index)}
              /> */}
              <img
                src={theme.img}
                alt={theme.img}
                style={{ display: "block", margin: "0.5em 3.5em" }}
              />
              {/* <span style={{ display: "flex" }}>
                  <span id={"themeIcon" + index}> {theme.icon}</span>
                  &nbsp;{" "}
                  <span className="themesLabel" id={"thmsLbl" + index}>
                    {theme.theme}
                  </span>
                </span> */}
              {/* </label> */}
              <div
                className="theme_label_container"
                // className={
                //   index === 3 || index === 6 || index === 7
                //     ? "theme_label_container1"
                //     : "theme_label_container"
                // }
              >
                <span className="themesLabel" id={"thmsLbl" + index}>
                  {theme.theme}
                </span>
                {index === 5 || index === 6 || index === 7 ? (
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.5em",
                      marginTop: "-1.5em",
                    }}
                  >
                    {theme.description}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </Col>
      );
    });

    if (id === 1) {
      return (
        <>
          {/* <MuiThemeProvider theme={formLabelsTheme}> */}
          <Row md={12} className="rowSeprator">
            <Col md={6}>
              <TextField
                id="clientName"
                label="Client Name"
                variant="outlined"
                size="small"
                fullWidth
                required
                value={this.state.clientName}
                onChange={this.handleInputNameChange.bind(this)}
              />
            </Col>
            <Col md={6} style={{ marginBottom: "1em" }}>
              {" "}
              <Autocomplete
                disablePortal
                id="contractType"
                options={contractTypes}
                sx={{ width: 300 }}
                value={this.state.contractTypes}
                getOptionLabel={(option) => option.contracttypelist}
                onChange={(event, value) => {
                  this.handleContractTypeChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Contract Type"
                    required
                  />
                )}
              />
            </Col>
          </Row>
          <Row className="rowSeprator">
            <Col md={6} style={{ marginBottom: "1em" }}>
              {" "}
              <Autocomplete
                disablePortal
                id="industryType"
                options={industryTypes}
                sx={{ width: 300 }}
                value={this.state.industryType}
                getOptionLabel={(option) => option.industrytype}
                onChange={(event, value) => {
                  this.handleIndustryTypeChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Industry Type"
                    required
                  />
                )}
              />
            </Col>
            <Col md={6}>
              {/* <div className="toggle_switch_rounded_bg"> */}
              <span className="switchLabel">
                {" "}
                <img src={LifeWork} alt="lifeWork" />
              </span>
              <Switch
                {...label}
                id="Lifeworks"
                color="success"
                style={{ float: "left" }}
                checked={this.state.isLifeworks}
                onChange={this.handleLifeworksChange.bind(this)}
              />
              {/* </div> */}
            </Col>
          </Row>
          <Row className="rowSeprator">
            <Col md={6} style={{ marginBottom: "1em" }}>
              {/* <div className="range_rounded_bg"> */}
              <div>
                &nbsp;
                <span className="switchLabel"> Anticipated Revenue * </span>
                <Slider
                  aria-label="Always visible"
                  id="AnticipatedRevenue"
                  onChange={this.handleAnticipatedRevenueChange}
                  value={this.state.anticipatedRevenue}
                  min={0}
                  max={10}
                  marks={this.state.marks1}
                />
              </div>
            </Col>
            <Col md={6}>
              {/* <div className="range_rounded_bg"> */}
              <div>
                &nbsp;
                <span className="switchLabel"> Population *</span>
                <Slider
                  aria-label="Always visible"
                  id="Population"
                  min={0}
                  max={5000}
                  onChange={this.handlePopulationChange}
                  value={this.state.population}
                  step={10}
                  marks={this.state.marks2}
                  valueLabelDisplay="on"
                />
              </div>
            </Col>
          </Row>
          {/* <Row className="rowSeprator">
            <Col md={12}>
              <div className="Industry_type_rounded_bg" id="industry_Type">
                <span className="switchLabel"> Select Industry Type *</span>
                <br></br>
                <br></br>
                <div>
                  <Row>{industryTypes}</Row>
                </div>
              </div>
            </Col>
          </Row> */}
          <Row className="rowSeprator">
            <Col md={12} style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                size="small"
                type="submit"
                className="next_btn"
                onClick={onClientCreate}
              >
                Next
              </Button>
            </Col>
          </Row>
          {/* </MuiThemeProvider> */}
        </>
      );
    } else if (id === 2) {
      return (
        <>
          <Row style={{ textAlign: "left" }}>
            {/* <span className="switchLabel">WIN THEMES</span> */}
            {isThemesErrorMsg === true ? (
              <span
                className="switchLabel"
                style={{ color: "red", fontWeight: "bold" }}
              >
                *Choose at least 1 win theme.
              </span>
            ) : (
              ""
            )}
          </Row>

          <Row className="rowSeprator ">{winThemes}</Row>
          <Row className="rowSeprator" style={{ padding: "0 0.3em" }}>
            <Col md={6} style={{ textAlign: "left" }}>
              <Button
                variant="contained"
                size="small"
                type="submit"
                className="previous_btn"
                onClick={onPrevious}
              >
                Previous
              </Button>
            </Col>
            <Col md={6} style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                size="small"
                type="submit"
                className="next_btn"
                // style={{
                //   background: "black",
                //   color: "white",
                //   fontSize: "0.65em",
                //   minWidth: "10%",
                //   borderRadius: "15px",
                // }}
                onClick={onThemeSelected}
              >
                Next
              </Button>
            </Col>
          </Row>
        </>
      );
    }
  }
  render() {
    const {
      title,
      formData,
      expand,
      onAccordianChange,
      id,
      themes,
      onClientCreate,
      onPrevious,
      onThemeSelected,
      isThemesErrorMsg,
      contractTypes,
      industryTypes,
      onCheckWithTheme,
    } = this.props;
    let className = "";

    if (formData !== null && expand === true) {
      className = "step_edit";
    } else if (formData !== null && expand === false) {
      className = "step_completed";
    } else {
      className = "";
    }

    return (
      <Accordions
        onChange={onAccordianChange}
        id={"accordian" + id}
        expanded={expand}
        className={className}
      >
        <AccordionSummary
          expandIcon={
            formData !== null ? (
              <CheckCircleIcon className="icon_step_complete" />
            ) : expand === true ? (
              <RemoveCircleIcon style={{ margin: "-0.4em 0 0 0 !important" }} />
            ) : (
              <AddCircleIcon />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ flexDirection: "row-reverse", margin: "11px 0 0 0" }}
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {this.accordionDetails(
            id,
            themes,
            onClientCreate,
            onThemeSelected,
            isThemesErrorMsg,
            onPrevious,
            contractTypes,
            industryTypes,
            onCheckWithTheme
          )}
        </AccordionDetails>
      </Accordions>
    );
  }
}

export default AccordionCmp;
