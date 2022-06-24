import React, { Component } from "react";
import aramarkLogo from "../../assets/img/aramarkLogo.png";
import "../../assets/vendor/aos/aos.css";
import "../../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../../assets/vendor/boxicons/css/boxicons.min.css";
import "../../assets/vendor/glightbox/css/glightbox.min.css";
import "../../assets/vendor/remixicon/remixicon.css";
import "../../assets/vendor/swiper/swiper-bundle.min.css";
import "../../assets/css/style.css";
import QuotesIcon from "../../assets/svg/Quotes";
import homePageImg from "../../assets/img/homePageImg.png";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Switch from "@mui/material/Switch";
// import Accordion from "../Accordion/Accordion";
import { Button, Col, Row } from "react-bootstrap";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Fab from "@mui/material/Fab";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import Slider from "@mui/material/Slider";
import Alert from "../Alert/Alert";
import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";
import "./Dashboard.css";

import clientDetailService from './ClientDetailService';
import industoryService from './IndustoryService';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarClass: "navbar",
      mobileNavToggle: "bi bi-list mobile-nav-toggle",
      contractType: [],
      blocks: [
        {
          id: 1,
          title: "Who is the client?",
          body: null,
          expanded: false,
          backgroundColor: "#808080",
        },
        {
          id: 2,
          title: "What is important to them?",
          body: "Form 2",
          expanded: true,
          backgroundColor: "#000080",
        },
        {
          id: 3,
          title: "How do they envision the dining experience?",
          body: "Form 3",
          expanded: false,
          backgroundColor: "#A93226",
        },
        {
          id: 4,
          title: "What additional services will best support this experience?",
          body: "Form 4",
          expanded: false,
          backgroundColor: "#16A085",
        },
      ],
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
      contractTypes: ["Subsidy", "P&L", "Cost+", "Other"],
      industryTypes: [
        "Technology",
        "Banking",
        "FinTech",
        "Insurance",
        "Transport",
        "Manufacturing",
        "Retail",
        "RealEstate",
        "ServiceAgency",
      ],
      userSelectedIndustryType: [],
      isLifeworks: false,
      contractType: null,
      clientName: "",
    };
	
	super(props);
        this.state = {
            value: '',
			value: false,
			value: '',
			value: '',
			value: 0,
			value: 0,
			value: '',
        }
        this.addService = new clientDetailService();
  }
  
  

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    handleSubmit = (event) => {
        //alert(this.state.value);
        event.preventDefault();
        this.addService.sendData(this.state.value);
        this.props.history.push('/');
    }

  mobileToggle(navClass, e) {
    if (navClass === "navbar") {
      this.setState({
        navbarClass: "navbar navbar-mobile",
        mobileNavToggle: "bi mobile-nav-toggle bi-x",
      });
    } else {
      this.setState({
        navbarClass: "navbar",
        mobileNavToggle: "bi bi-list mobile-nav-toggle",
      });
    }
  }

  toggle(id, data) {
    this.setState((prevState, props) => {
      const index = prevState.blocks.findIndex((item) => item.id === id);

      prevState.blocks[index].expanded = !prevState.blocks[index].expanded;

      return { blocks: prevState.blocks };
    });
  }

  nextAccoordianOpen(id, data) {
    this.setState((prevState, props) => {
      const index = prevState.blocks.findIndex((item) => item.id === id);
      prevState.blocks[index].expanded = !prevState.blocks[index].expanded;
      prevState.blocks[index + 1].expanded =
        !prevState.blocks[index + 1].expanded;

      return { blocks: prevState.blocks };
    });
  }
  valuetext(value) {
    return `${value}`;
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
  handleLifeworksChange(e) {
    this.setState({
      isLifeworks: e.target.checked,
    });
  }
  // handleAnticipatedRevenueChange(e) {
  //   this.setState({
  //     anticipatedRevenue: e.target.value,
  //   });
  // }

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

  createClient() {
    if (this.state.clientName === "") {
      Alert.error("Name is required");
      document.getElementById("clientName").focus();
    } else if (this.state.contractType === null) {
      Alert.error("Contract Type is required");
      document.getElementById("contractType").focus();
    } else if (this.state.isLifeworks === false) {
      Alert.error("Lifeworks is should be true");
      document.getElementById("Lifeworks").focus();
    } else if (this.state.anticipatedRevenue === 0) {
      Alert.error("Anticipated Revenue is required more than zero");
      document.getElementById("AnticipatedRevenue").focus();
    } else if (this.state.population === 0) {
      Alert.error("population is required more than zero");
      document.getElementById("Population").focus();
    } else if (this.state.userSelectedIndustryType.length === 0) {
      Alert.error("Industry types is required");
      document.getElementById("industry_Type").focus();
    } else {
      let obj = {
        name: this.state.clientName,
        contractType: this.state.contractType,
        isLifeworks: this.state.isLifeworks,
        anticipatedRevenue: this.state.anticipatedRevenue,
        population: this.state.population,
      };
    }
  }
  selectIndustry(e, industry, index) {
    const { checked } = e.target;
    let industries = this.state.userSelectedIndustryType;
    if (checked === true) {
      document.getElementById("industryBtn" + index).style.backgroundColor =
        "red";
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

    // let id = document.getElementById("industryBtn" + index);
  }
  render() {
    let industryTypes = [];
    this.state.industryTypes.forEach((industry, index) => {
      industryTypes.push(
        <Col
          md={3}
          style={{ marginBottom: "0.5em" }}
          // onClick={this.selectIndustry.bind(this, industry, index)}
        >
          <div className="">
            <div className="cat action" id={"industryBtn" + index}>
              <label>
                <input
                  type="checkbox"
                  style={{
                    background: "white",
                    color: "black",
                  }}
                  defaultChecked={this.state.isIndustryType}
                  name="checkedSacCode"
                  onChange={(e) => this.selectIndustry(e, industry, index)}
                />
                {industry}
              </label>
            </div>
          </div>
          {/* <Fab
            id={"industryBtn" + index}
            variant="extended"
            size="small"
            color="primary"
            aria-label="add"
            style={{
              background: "white",
            }}
          >
            {industry}
          </Fab> */}
        </Col>
      );
    });
    const label = { inputProps: { "aria-label": "Switch demo" } };
    return (
      <div>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Vesperr Bootstrap Template - Index</title>
        <meta content name="description" />
        <meta content name="keywords" />

        {/* ======= Header ======= */}
        <header id="header" className="fixed-top d-flex align-items-center">
          <div className="container d-flex align-items-center justify-content-between">
            <a href="/home">
              <div className="logo">
                <img
                  src={aramarkLogo}
                  alt="aramarLogo"
                  style={{ height: "3em" }}
                />
                {/* Uncomment below if you prefer to use an image logo */}
                {/* <a href="index.html"><img src="../../assets/img/logo.png" alt="" class="img-fluid"></a>*/}
              </div>
            </a>
            <nav id="navbar" className={this.state.navbarClass}>
              <ul>
                {/* <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
                  <li><a className="nav-link scrollto" href="#about">About</a></li>
                  <li><a className="nav-link scrollto" href="#services">Services</a></li>
                  <li><a className="nav-link scrollto " href="#portfolio">Portfolio</a></li>
                  <li><a className="nav-link scrollto" href="#team">Team</a></li>
                  <li><a className="nav-link scrollto" href="#pricing">Pricing</a></li>
                  <li className="dropdown"><a href="#"><span>Drop Down</span> <i className="bi bi-chevron-down" /></a>
                    <ul>
                      <li><a href="#">Drop Down 1</a></li>
                      <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right" /></a>
                        <ul>
                          <li><a href="#">Deep Drop Down 1</a></li>
                          <li><a href="#">Deep Drop Down 2</a></li>
                          <li><a href="#">Deep Drop Down 3</a></li>
                          <li><a href="#">Deep Drop Down 4</a></li>
                          <li><a href="#">Deep Drop Down 5</a></li>
                        </ul>
                      </li>
                      <li><a href="#">Drop Down 2</a></li>
                      <li><a href="#">Drop Down 3</a></li>
                      <li><a href="#">Drop Down 4</a></li>
                    </ul>
                  </li>*/}
                <li>
                  <h5>
                    <b>Experience calculator (AEC)</b>
                  </h5>
                </li>
                {/* <li>
                  <a className="getstarted scrollto" href="/signIn">
                    Sign in
                  </a>
                </li> */}
              </ul>
              <i
                className={this.state.mobileNavToggle}
                onClick={this.mobileToggle.bind(this, this.state.navbarClass)}
              />
            </nav>
            {/* .navbar */}
          </div>
        </header>
        {/* End Header */}
        {/* ======= Hero Section ======= */}
        <section id="hero" className="hero d-flex align-items-center">
          <div className="aramark_dashboard">
            {/* <Row style={{ margin: "5em 0 0 0" }}></Row> */}

            <Row className="heroSection ">
              <Col md={6} style={{ margin: "5em 0 0 0" }}>
                <Row className="rowSeprator ">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Who is the client?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
					<form onSubmit={this.handleSubmit}>
                      <Row md={12} className="rowSeprator">
					  
                        <Col md={12}>
                          <TextField
                            id="clientName"
                            label="Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={this.state.clientName}
                            onChange={this.handleInputNameChange.bind(this); this.handleChange.bind(this);}
                          />
                        </Col>
                      </Row>
                      <Row className="rowSeprator">
                        <Col md={6}>
                          {" "}
                          <Autocomplete
                            disablePortal
                            id="contractType"
                            options={this.state.contractTypes}
                            sx={{ width: 300 }}
                            value={this.state.contractType}
                            getOptionLabel={(option) => option}
                            onChange={(event, value) => {
                              this.handleContractTypeChange(value);this.handleChange.bind(this);
                            }}
                            // onChange={this.handleContractTypeChange.bind(this)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Select Contract Type"
                                required
                              />
                            )}
                          />
                        </Col>
                        <Col md={6}>
                          <div className="toggle_switch_rounded_bg">
                            <Switch
                              {...label}
                              id="Lifeworks"
                              style={{ float: "left" }}
                              checked={this.state.isLifeworks}
                              onChange={this.handleLifeworksChange.bind(this);this.handleChange.bind(this);}
                            />
                            <span className="switchLabel"> Lifeworks? *</span>
                          </div>
                        </Col>
                      </Row>
                      <Row className="rowSeprator">
                        <Col md={6}>
                          <div className="range_rounded_bg">
                            &nbsp;
                            <span className="switchLabel">
                              {" "}
                              Anticipated Revenue *{" "}
                            </span>
                            <Slider
                              aria-label="Always visible"
                              // defaultValue={80}
                              // getAriaValueText={this.state.anticipatedRevenue}

                              id="AnticipatedRevenue"
                              onChange={this.handleAnticipatedRevenueChange}
                              value={this.state.anticipatedRevenue}
                              min={0}
                              max={10}
                              // step={10}
                              marks={this.state.marks1}
                              // valueLabelDisplay="on"
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="range_rounded_bg">
                            &nbsp;
                            <span className="switchLabel"> Population *</span>
                            <Slider
                              aria-label="Always visible"
                              id="Population"
                              min={0}
                              max={5000}
                              // getAriaValueText={this.valuetext}
                              onChange={this.handlePopulationChange}
                              value={this.state.population}
                              step={10}
                              marks={this.state.marks2}
                              valueLabelDisplay="on"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row className="rowSeprator">
                        <Col md={12}>
                          <div
                            className="Industry_type_rounded_bg"
                            id="industry_Type"
                          >
                            <span className="switchLabel">
                              {" "}
                              Select Industry Type *
                            </span>
                            <br></br>
                            <br></br>
                            <div>
                              <Row>{industryTypes}</Row>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Row className="rowSeprator">
                        <Col md={12} style={{ textAlign: "center" }}>
                          <Fab
                            variant="extended"
                            size="small"
                            color="primary"
                            aria-label="add"
                            style={{
                              background: "black",
                              color: "white",
                              width: "10em",
                            }}
                            onClick={this.createClient.bind(this)}
                          >
                            Next
                          </Fab>
                        </Col>						
                      </Row>
					  </form>
                    </AccordionDetails>
                  </Accordion>
                </Row>
                <Row className="rowSeprator ">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>What is important to them?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Row style={{ textAlign: "left" }}>
                        <span className="switchLabel">WIN THEMES</span>
                      </Row>

                      <Row className="rowSeprator ">
                        <Col md={6}>
                          <div className=" win_themes">
                            <LocalAtmIcon />
                            &nbsp;{" "}
                            <span className="themesLabelActive">
                              Cost consciousness
                            </span>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className=" win_themes_deactive">
                            <span style={{ display: "flex" }}>
                              <span>
                                {" "}
                                <Avatar></Avatar>
                              </span>
                              &nbsp;{" "}
                              <span className="themesLabel">
                                Leadership visibilty
                              </span>
                            </span>
                          </div>
                        </Col>
                      </Row>
                      <Row className="rowSeprator ">
                        <Col md={6}>
                          <div className=" win_themes_deactive">
                            <span style={{ display: "flex" }}>
                              <span>
                                {" "}
                                <Avatar></Avatar>
                              </span>
                              &nbsp;{" "}
                              <span className="themesLabel">
                                Operation result
                              </span>
                            </span>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className=" win_themes_deactive">
                            <span style={{ display: "flex" }}>
                              <span>
                                {" "}
                                <Avatar></Avatar>
                              </span>
                              &nbsp;{" "}
                              <span className="themesLabel">
                                Right team on ground
                              </span>
                            </span>
                          </div>
                        </Col>
                      </Row>
                      <Row className="rowSeprator ">
                        <Col md={6}>
                          <div className=" win_themes_deactive">
                            <span style={{ display: "flex" }}>
                              <span>
                                {" "}
                                <Avatar></Avatar>
                              </span>
                              &nbsp;{" "}
                              <span className="themesLabel">
                                Proactive innovation
                              </span>
                            </span>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className=" win_themes">
                            <span
                              style={{ display: "flex", lineHeight: "1.5em" }}
                            >
                              <span style={{ margin: "0.2em 0 0 0" }}>
                                <Avatar style={{ background: "#000" }}></Avatar>
                              </span>
                              &nbsp;{" "}
                              <span className="themesLabelActive">
                                DEI (Deep client understanding)
                              </span>
                            </span>
                          </div>
                        </Col>
                      </Row>
                      <Row className="rowSeprator ">
                        <Col md={6}>
                          <div className=" win_themes_deactive">
                            <span style={{ display: "flex" }}>
                              <span>
                                {" "}
                                <Avatar></Avatar>
                              </span>
                              &nbsp;{" "}
                              <span className="themesLabel">
                                Community involvment
                              </span>
                            </span>
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className=" win_themes">
                            <EnergySavingsLeafOutlinedIcon />
                            &nbsp;{" "}
                            <span className="themesLabelActive">
                              Sustainability
                            </span>
                          </div>
                        </Col>
                      </Row>
                      <Row className="rowSeprator">
                        <Col md={12} style={{ textAlign: "center" }}>
                          <Fab
                            variant="extended"
                            size="small"
                            color="primary"
                            aria-label="add"
                            style={{
                              background: "black",
                              color: "white",
                              width: "10em",
                            }}
                          >
                            Next
                          </Fab>
                        </Col>
                      </Row>
                    </AccordionDetails>
                  </Accordion>
                </Row>
                <Row className="rowSeprator ">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        How do they envision the dining experience?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                  </Accordion>
                </Row>
                <Row className="rowSeprator ">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        What additional services will best support this
                        experience?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                  </Accordion>
                </Row>
              </Col>
              <Col md={6}>
                <div className="" data-aos="fade-left" data-aos-delay={200}>
                  <div className="imageWrapper">
                    <img
                      src={homePageImg}
                      className="img-fluid "
                      alt=""
                      style={{ marginTop: "2em", borderRadius: "1rem" }}
                    />
                    <div className="quoteWrapper flexCenter darkBg radius8">
                      <div className="QuotesWrapper">
                        <QuotesIcon />
                      </div>
                      <div>
                        <p className="font15 whiteColor">
                          <em>
                            Friends, such as we desire, are dreams and fables.
                            Friendship demands the ability to do without it.
                          </em>
                        </p>
                        <p
                          className="font13 orangeColor textRight"
                          style={{ marginTop: "10px" }}
                        >
                          Ralph Waldo Emerson
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="lightBg grayDiv"></div>
                </div>
              </Col>
            </Row>
            {/* <div className="row heroSection">
              <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
                {/* <dl className="accordion">
                  {this.state.blocks.map((item) => (
                    <Accordion
                      key={item.id}
                      title={item.title}
                      body={item.body}
                      expand={item.expanded}
                      bgColor={item.backgroundColor}
                      id={item.id}
                      onClick={this.toggle.bind(this, item.id)}
                      onSubmit={this.nextAccoordianOpen.bind(this, item.id)}
                    />
                  ))}
                </dl> 
              </div>
            </div> */}
          </div>
        </section>
        {/* End Hero */}

        {/* End #main */}
      </div>
    );
  }
}

export default Dashboard;
