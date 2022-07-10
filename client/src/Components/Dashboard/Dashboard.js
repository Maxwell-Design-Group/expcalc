import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import Avatar from "@mui/material/Avatar";
import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import "../../assets/css/style.css";
import aramarkLogo from "../../assets/img/aramarkLogo.png";
import homePageImg from "../../assets/img/homePageImg.png";
import QuotesIcon from "../../assets/svg/Quotes";
import "../../assets/vendor/aos/aos.css";
import "../../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../../assets/vendor/boxicons/css/boxicons.min.css";
import "../../assets/vendor/glightbox/css/glightbox.min.css";
import "../../assets/vendor/remixicon/remixicon.css";
import "../../assets/vendor/swiper/swiper-bundle.min.css";
import AccordionCmp from "../Accordion/AccordionCmp";
import ClientDetailService from "../Accordion/ClientDetailService";
import Alert from "../Alert/Alert";
import "./Dashboard.css";
import CostConsciousnes from "../../assets/img/Cost-Consciousnes.png";
import CommunityInvolvement from "../../assets/img/Community-Involvement.png";
import DEI from "../../assets/img/DEI.png";
import LeadershipVisibility from "../../assets/img/Leadership-Visibility.png";
import OperationalResults from "../../assets/img/Operational-Results.png";
import ProactiveInnovation from "../../assets/img/Proactive-Innovation.png";
import RightTeamOnTheGround from "../../assets/img/Right-Team-On-The-Ground.png";
import Sustainability from "../../assets/img/Sustainability.png";
import axios from "axios";
import { getTypographyUtilityClass } from "@mui/material";
import WinthemeDetailService from "../Accordion/WinthemeDetailService";
class Dashboard extends Component {
  accordianCmpntRef = [];

  constructor(props) {
    super(props);

    this.state = {
      navbarClass: "navbar",
      mobileNavToggle: "bi bi-list mobile-nav-toggle",
      contractType: [],
      steps: [
        {
          id: 1,
          title: "Tell us about your prospect",
          data: null,
          expanded: false,
          backgroundColor: "#808080",
        },
        {
          id: 2,
          title: "What is important to them?",
          data: null,
          expanded: false,
          backgroundColor: "#000080",
        },
        {
          id: 3,
          title: "How do they envision the dining experience?",
          data: null,
          expanded: false,
          backgroundColor: "#A93226",
        },
        {
          id: 4,
          title: "What additional services will best support this experience?",
          data: null,
          expanded: false,
          backgroundColor: "#16A085",
        },
        {
          id: 5,
          title: "Supporting Question?",
          data: null,
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
      theme: false,
      population: 0,
      selectedAccordian: 0,
      industryTypes: [],
      contractTypes: [],
      winThemesData: [
        {
          theme: "Cost-Consciousness",
          icon: <LocalAtmIcon style={{ margin: "-0.4em 0 0 0" }} />,
          img: CostConsciousnes,
          description: "",
        },
        {
          theme: "Leadership-Visibility",
          icon: <Avatar />,
          img: LeadershipVisibility,
          description: "",
        },
        {
          theme: "Operational-Results",
          icon: <Avatar />,
          img: OperationalResults,
          description: "",
        },
        {
          theme: "Right-Team-On-The-Ground",
          icon: <Avatar />,
          img: RightTeamOnTheGround,
          description: "",
        },
        {
          theme: "Proactive-Innovation",
          icon: <Avatar />,
          img: ProactiveInnovation,
          description: "",
        },
        // {
        //   theme: "Deep-Client-Understanding",
        //   icon: <Avatar />,
        //   img: CostConsciousnes,
        // },
        {
          theme: "DEI",
          icon: <Avatar />,
          img: DEI,
          description: "DEEP CLIENT UNDERSTANDING",
        },
        {
          theme: "Sustainability",
          icon: (
            <EnergySavingsLeafOutlinedIcon style={{ margin: "-0.4em 0 0 0" }} />
          ),
          img: Sustainability,
          description: "DEEP CLIENT UNDERSTANDING",
        },
        {
          theme: "Community-Involvement",
          icon: <Avatar />,
          img: CommunityInvolvement,
          description: "DEEP CLIENT UNDERSTANDING",
        },
      ],
      userSelectedIndustryType: [],
      userSelectedThemes: [],
      formData: null,
      step1Data: null,
      step2Data: null,
      step3Data: null,
      step4Data: null,
      accordiondisabled: false,
      isThemesErrorMsg: false,
      total: 0,
      isCalculations: false,
      isUserShow: false,
      render: false,
    };
    this.clientDetails = new ClientDetailService();
    this.winThemeDetails = new WinthemeDetailService();
  }
  componentDidMount = () => {
    axios
      .get("http://https://expcalc-dev.herokuapp.com/contracttypelists")
      .then((response) => {
        this.setState({
          contractTypes: response.data,
        });
      })
      .catch((error) => {});

    axios
      .get("http://https://expcalc-dev.herokuapp.com/industrytypes")
      .then((response) => {
        this.setState({
          industryTypes: response.data,
          render: true,
        });
      })
      .catch((error) => {});
  };
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

  toggle(id) {
    let index = "";
    this.setState((prevState, props) => {
      index = prevState.steps.findIndex((item) => item.id === id);
      // for (let i = 0; i < prevState.steps.length; i++) {
      //   if (index === i) {
      //     prevState.steps[i].expanded = true;
      //   } else {
      //     prevState.steps[i].expanded = false;
      //   }
      // }
      prevState.steps[index].expanded = !prevState.steps[index].expanded;
      this.showCalculations(id, prevState.steps[index].expanded, index);
      if (prevState.steps[index].expanded === false) {
        return { steps: prevState.steps, selectedAccordian: 0 };
      } else {
        return { steps: prevState.steps, selectedAccordian: id };
      }
    });
  }
  showCalculations(id, isCalculation, index) {
    if (
      id === 1 &&
      this.state.steps[index].data === null &&
      isCalculation === false
    ) {
      this.setState({
        isCalculations: false,
      });
    } else {
      this.setState({
        isCalculations: true,
      });
    }
  }
  nextAccoordianOpen(id) {
    this.setState((prevState, props) => {
      const index = prevState.steps.findIndex((item) => item.id === id);
      prevState.steps[index].expanded = !prevState.steps[index].expanded;
      prevState.steps[index + 1].expanded =
        !prevState.steps[index + 1].expanded;

      return {
        steps: prevState.steps,
      };
    });
    this.setState({
      selectedAccordian: id,
    });
  }
  valuetext(value) {
    return `${value}`;
  }
  toPreviousStep(id) {
    this.setState((prevState, props) => {
      const index = prevState.steps.findIndex((item) => item.id === id);
      // prevState.blocks[index].expanded = !prevState.blocks[index].expanded;
      prevState.steps[index - 1].expanded =
        !prevState.steps[index - 1].expanded;
      prevState.steps[index].expanded = false;

      return { steps: prevState.steps };
    });
  }

  createClient(id) {
    for (let i = 0; i < this.accordianCmpntRef.length; i++) {
      if (i === id) {
        if (
          this.accordianCmpntRef[i].current.state.clientName === "" ||
          this.accordianCmpntRef[i].current.state.clientName.length > 255
        ) {
          Alert.error("Enter client name,0-255 characters");
          document.getElementById("clientName").focus();
        } else if (
          this.accordianCmpntRef[i].current.state.contractType === null
        ) {
          Alert.error("Choose a contract type");
          document.getElementById("contractType").focus();
        } else if (
          this.accordianCmpntRef[i].current.state.industryType === null
        ) {
          Alert.error("Select at least one industry type");
          document.getElementById("industryType").focus();
          // for (
          //   let i = 0;
          //   i < this.accordianCmpntRef[i].current.state.industryTypes.length;
          //   i++
          // ) {
          //   document.getElementById("industryBtn" + i).style.border =
          //     "1px solid red";
          // }
        } else if (
          this.accordianCmpntRef[i].current.state.anticipatedRevenue === 0
        ) {
          Alert.error("Select the anticipated revenue");
          document.getElementById("AnticipatedRevenue").focus();
        } else if (this.accordianCmpntRef[i].current.state.population === 0) {
          Alert.error("Estimate the population");
          document.getElementById("Population").focus();
        } else {
          let obj = {
            email: "",
            ClientName: this.accordianCmpntRef[i].current.state.clientName,
            ContractType: this.accordianCmpntRef[i].current.state.contractType,
            LifeWorks: this.accordianCmpntRef[i].current.state.isLifeworks,
            AnticipatedRevenue:
              this.accordianCmpntRef[i].current.state.anticipatedRevenue,
            Population: this.accordianCmpntRef[i].current.state.population,
            industry_Type: this.accordianCmpntRef[i].current.state.industryType,
          };
          this.clientDetails.sendData(obj);
          Alert.success("ClientDetail added successfully");
          this.state.steps[i].data = {};
          this.setState({
            selectedAccordian: 2,
            clientName: this.accordianCmpntRef[i].current.state.clientName,
            isUserShow: true,
          });
          this.nextAccoordianOpen(this.state.steps[i].id);
        }
      }
    }
  }
  addWinthemes(id) {
    if (
      this.accordianCmpntRef[id].current.state.userSelectedThemes.length === 0
    ) {
      for (let i = 0; i < this.state.winThemesData.length; i++) {
        document.getElementById("themesBtn" + i).style.border = "1px solid red";
      }
      this.state.steps[id].data = null;
      this.setState({
        isThemesErrorMsg: true,
      });
    } else {
      for (
        let i = 0;
        i < this.accordianCmpntRef[id].current.state.userSelectedThemes.length;
        i++
      ) {
        let obj = {
          email: "",
          winthemedetail:
            this.accordianCmpntRef[i].current.state.userSelectedThemes,
        };
        this.winThemeDetails.sendData(obj);
      }
      this.state.steps[id].data = {};
      this.setState({});
      this.nextAccoordianOpen(this.state.steps[id].id);
      Alert.success("WinthemeDetail added successfully");
      this.setState({
        isThemesErrorMsg: false,
      });
    }

    // for (let i = 0; i < this.accordianCmpntRef.length; i++) {
    //   if (i === id) {
    //     if (
    //       this.accordianCmpntRef[i].current.state.userSelectedThemes.length ===
    //       0
    //     ) {
    //       for (let i = 0; i < this.state.winThemesData.length; i++) {
    //         document.getElementById("themesBtn" + i).style.border =
    //           "1px solid red";
    //       }
    //       this.setState({
    //         isThemesErrorMsg: true,
    //       });
    //     } else {
    //       let inputObj = {
    //         winthemedetail:
    //           this.accordianCmpntRef[i].current.state.userSelectedTheme,
    //       };
    //       this.state.steps[i].data = {};
    //       this.setState({});
    //       this.nextAccoordianOpen(this.state.steps[i].id);
    //     }
    //   }
    // }
  }
  // saveWinTheme(id) {
  //   if (this.accordianCmpntRef[id].current.state.theme === true) {
  //     let obj = {
  //       email: "",
  //       winthemedetail:
  //         this.accordianCmpntRef[id].current.state.userSelectedThemes.at(-1),
  //     };
  //     this.winThemeDetails.sendData(obj);
  //     Alert.success("WinthemeDetail added successfully");
  //   }
  //   //     "themes log ",
  //   //     this.accordianCmpntRef[id].current.state.userSelectedThemes
  //   //   );
  //   //   "themes boolean ",
  //   //   this.accordianCmpntRef[id].current.state.theme
  //   // );
  //   //   "themes ",
  //   //   this.accordianCmpntRef[id].current.state.userSelectedThemes.at(-1)
  //   // );
  // }
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

  selectedThemes(e, theme, index) {
    const { checked } = e.target;
    let themes = this.state.userSelectedThemes;
    if (checked === true) {
      // document.getElementById("themesBtn" + index).style.backgroundColor =
      //   "#fff";
      document.getElementById("themesBtn" + index).style.border =
        "2px solid #4BAE4F";
      // document.getElementById("themesBtn" + index).style.border =
      //   "1px solid #000";
      document.getElementById("thmsLbl" + index).style.color = "#566573";

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
          document.getElementById("themesBtn" + index).style.border =
            "1px solid #fff";
          document.getElementById("thmsLbl" + index).style.color = "#808B96";
          document
            .getElementById("themeIcon" + index)
            .classList.add(".css-i4bv87-MuiSvgIcon-root");
          this.setState({
            userSelectedThemes: themes,
          });
        }
      }
    }
  }
  handleAccordianChange(panel) {
    this.setState({
      expanded: panel,
    });
  }
  setNavDetails(id) {
    if (id === 0) {
      return (
        <ul>
          <li>
            <div className="nav_header_container">
              <h5 className="nav_header">WELCOME, JOHN DOE</h5>
            </div>
          </li>
          <li>
            <div className="nav_description_container">
              <p className="nav_description">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </p>
              <p className="nav_description">
                At vero eos et accusam et justo duo dolores et ea rebum. Stet
                clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
                dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                sadipscing elitr, sed diam nonumy.
              </p>
            </div>
          </li>
          <li className="version_details">
            <p className="version_txt">© 2022 Aramark Corporation. | EC v0.1</p>
          </li>
        </ul>
      );
    } else if (id === 1) {
      return (
        <ul>
          <li>
            <div className="nav_header_container">
              <h5 className="nav_header">
                LET’S GET STARTED WITH SOME BASIC INFORMATION
              </h5>
            </div>
          </li>
          <li>
            <div className="nav_description_container_expanded">
              <p className="nav_description">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </p>
              <p className="nav_description">
                At vero eos et accusam et justo duo dolores et ea rebum. Stet
                clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
                dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                sadipscing elitr, sed diam nonumy.
              </p>
            </div>
          </li>
          <li className="version_details">
            <p className="version_txt">© 2022 Aramark Corporation. | EC v0.1</p>
          </li>
        </ul>
      );
    } else if (id === 2) {
      return (
        <ul>
          <li>
            <div className="nav_header_container">
              <h5 className="nav_header">
                WHAT IS IMPORTANT TO YOUR PROSPECT?
              </h5>
            </div>
          </li>
          <li>
            <div className="nav_description_container_expanded">
              <p className="nav_description">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </p>
              <p className="nav_description">
                At vero eos et accusam et justo duo dolores et ea rebum. Stet
                clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
                dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                sadipscing elitr, sed diam nonumy.
              </p>
            </div>
          </li>
          <li className="version_details">
            <p className="version_txt">© 2022 Aramark Corporation. | EC v0.1</p>
          </li>
        </ul>
      );
    } else if (id === 3) {
      return (
        <ul>
          <li>
            <div className="nav_header_container">
              <h5 className="nav_header">
                HOW DO THEY ENVISION THE DINING EXPERIENCE?
              </h5>
            </div>
          </li>
          <li>
            <div className="nav_description_container_expanded">
              <p className="nav_description">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </p>
              <p className="nav_description">
                At vero eos et accusam et justo duo dolores et ea rebum. Stet
                clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
                dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                sadipscing elitr, sed diam nonumy.
              </p>
            </div>
          </li>
          <li className="version_details">
            <p className="version_txt">© 2022 Aramark Corporation. | EC v0.1</p>
          </li>
        </ul>
      );
    } else if (id === 4) {
      return (
        <ul>
          <li>
            <div className="nav_header_container">
              <h5 className="nav_header">
                WHAT ADDITIONAL SERVICES WILL BEST SUPPORT THIS EXPERIENCE?
              </h5>
            </div>
          </li>
          <li>
            <div className="nav_description_container_expanded">
              <p className="nav_description">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </p>
              <p className="nav_description">
                At vero eos et accusam et justo duo dolores et ea rebum. Stet
                clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
                dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                sadipscing elitr, sed diam nonumy.
              </p>
            </div>
          </li>
          <li className="version_details">
            <p className="version_txt">© 2022 Aramark Corporation. | EC v0.1</p>
          </li>
        </ul>
      );
    } else if (id === 5) {
      return (
        <ul>
          <li>
            <div className="nav_header_container">
              <h5 className="nav_header">SUPPORTING QUESTION?</h5>
            </div>
          </li>
          <li>
            <div className="nav_description_container_expanded">
              <p className="nav_description">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </p>
              <p className="nav_description">
                At vero eos et accusam et justo duo dolores et ea rebum. Stet
                clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
                dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                sadipscing elitr, sed diam nonumy.
              </p>
            </div>
          </li>
          <li className="version_details">
            <p className="version_txt">© 2022 Aramark Corporation. | EC v0.1</p>
          </li>
        </ul>
      );
    }
  }
  render() {
    if (this.state.render === false) {
      return <></>;
    } else {
      let accordians = [];

      this.state.steps.forEach((item, index) => {
        this.accordianCmpntRef[index] = React.createRef();
        accordians.push(
          <Row className="rowSeprator ">
            <AccordionCmp
              key={index}
              title={item.title}
              isThemesErrorMsg={this.state.isThemesErrorMsg}
              ref={this.accordianCmpntRef[index]}
              body={item.body}
              expand={item.expanded}
              bgColor={item.backgroundColor}
              themes={this.state.winThemesData}
              formData={item.data}
              id={item.id}
              contractTypes={this.state.contractTypes}
              industryTypes={this.state.industryTypes}
              // onCheckWithTheme={this.saveWinTheme.bind(this, index)}
              onAccordianChange={this.toggle.bind(this, item.id)}
              onClientCreate={this.createClient.bind(this, index)}
              onPrevious={this.toPreviousStep.bind(this, item.id)}
              onThemeSelected={this.addWinthemes.bind(this, index)}
            />
          </Row>
        );
      });
      return (
        <div className="aramark_dashboard">
          <nav>{this.setNavDetails(this.state.selectedAccordian)}</nav>
          <header>
            <Row>
              <Col md={3}>
                {" "}
                <div className="logo">
                  <img
                    src={aramarkLogo}
                    alt="aramarLogo"
                    className="aramark_header_logo"
                  />
                  <h5 style={{ fontSize: "0.5em" }}>
                    {/* <b>Experience calculator (AEC)</b> */}
                  </h5>
                  {/* Uncomment below if you prefer to use an image logo */}
                  {/* <a href="index.html"><img src="../../assets/img/logo.png" alt="" class="img-fluid"></a>*/}
                </div>
              </Col>
              <Col md={9} className="aramark_header_bg">
                <h5 className="aramark_header_text">Experience calculator</h5>
              </Col>
            </Row>
          </header>
          <section>
            <Row className="aramark_section">
              <Col md={8} className="accordianContent">
                <article>{accordians}</article>
              </Col>
              <Col md={3}>
                {this.state.isCalculations === false ? (
                  <div className="tootalCalculationSection">
                    <div className="tootalCalculationSection_container"></div>
                  </div>
                ) : (
                  <div className="tootalCalculationSection_expanded">
                    <div className="tootalCalculationSection_container">
                      <h5 className="nav_header">ESTIMATED COSTS</h5>

                      <div className="user_container">
                        {this.state.isUserShow === true ? (
                          <p className="client_info">{this.state.clientName}</p>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="capEx">
                        <div className="capEx_sign_container">
                          <p className="capEx_sign">$</p>
                        </div>
                        <div className="capexValue_container">
                          <p className="capexValue_label">Cap Ex</p>
                          <p className="capexValue">$0</p>
                        </div>
                      </div>
                      <br></br>
                      <div className="opEx">
                        <div className="opEx_sign_container">
                          <p className="opEx_sign">$</p>
                        </div>
                        <div className="opexValue_container">
                          <p className="opexValue_label">Op Ex</p>
                          <p className="opexValue">$0</p>
                        </div>
                      </div>

                      <div className="capExOpex_total_container">
                        <p className="capExOpex_total">
                          {" "}
                          {"$" + this.state.total}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
            {/* <article>
            <h1>London</h1>
            <p>
              London is the capital city of England. It is the most populous
              city in the United Kingdom, with a metropolitan area of over 13
              million inhabitants.
            </p>
            <p>
              Standing on the River Thames, London has been a major settlement
              for two millennia, its history going back to its founding by the
              Romans, who named it Londinium.
            </p>
          </article> */}
          </section>

          {/* <footer>
          <p>Footer</p>
        </footer> */}
        </div>
      );
    }
  }
}

export default Dashboard;
