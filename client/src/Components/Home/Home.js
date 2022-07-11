import React, { Component } from "react";
import aramarkLogo from "../../assets/img/aramarkLogo.png";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "../../assets/vendor/aos/aos.css";
import "../../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../../assets/vendor/boxicons/css/boxicons.min.css";
import "../../assets/vendor/glightbox/css/glightbox.min.css";
import "../../assets/vendor/remixicon/remixicon.css";
import "../../assets/vendor/swiper/swiper-bundle.min.css";
import "../../assets/css/style.css";
import TextField from "@mui/material/TextField";
import QuotesIcon from "../../assets/svg/Quotes";
import homePageImg from "../../assets/img/homePageImg.png";
import Dots from "../../assets/svg/Dots";
import Alert from "../Alert/Alert";
import "./Home.css";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarClass: "navbar",
      mobileNavToggle: "bi bi-list mobile-nav-toggle",
      email: "",
      password: "",
    };
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
  handleInputEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }
  handleInputPasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }
  auth() {
    if (this.state.email.length === 0) {
      document.getElementById("email").focus();
      Alert.error("Email is required");
    } else if (this.state.password.length === 0) {
      document.getElementById("password").focus();
      Alert.error("Password is required");
    } else {
      this.props.history.push({
        pathname: "/dashboard",
      });
    }
  }
  render() {
    return (
      <div className="aramark_home">
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Vesperr Bootstrap Template - Index</title>
        <meta content name="description" />
        <meta content name="keywords" />

        {/* ======= Header ======= */}
        <header id="header" className="fixed-top d-flex align-items-center">
          <div
            className="container d-flex align-items-center justify-content-between"
            style={{ maxWidth: "1700px" }}
          >
            <a href="/home">
              <div className="logo">
                <img
                  src={aramarkLogo}
                  alt="aramarLogo"
                  style={{ height: "3em" }}
                />
                <h5 style={{ fontSize: "0.5em" }}>
                  {/* <b>Experience calculator (AEC)</b> */}
                </h5>
                {/* Uncomment below if you prefer to use an image logo */}
                {/* <a href="index.html"><img src="../../assets/img/logo.png" alt="" class="img-fluid"></a>*/}
              </div>
            </a>
            <nav id="navbar" className={this.state.navbarClass}>
              <ul>
                <li>
                  {" "}
                  <TextField
                    id="email"
                    label="Email"
                    type="text"
                    variant="outlined"
                    size="small"
                    value={this.state.email}
                    onChange={this.handleInputEmailChange.bind(this)}
                  />
                </li>
                &nbsp;
                <li>
                  {" "}
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    value={this.state.password}
                    onChange={this.handleInputPasswordChange.bind(this)}
                  />
                </li>
                &nbsp;
                <li>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={this.auth.bind(this)}
                  >
                    Sign in
                  </Button>
                  {/* <a className="getstarted scrollto" href="/signIn"></a> */}
                </li>
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
          <div className="">
            <div className="row heroSection">
              <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
                <h1 data-aos="fade-up">
                  Lets get started with our calculations!
                </h1>
                {/* <div data-aos="fade-up" data-aos-delay={800}>
                  <a href="/clientInfo" className="btn-get-started scrollto">
                    Get Started
                  </a>
                </div> */}
                <div data-aos="fade-up" data-aos-delay={800}>
                  <h6 data-aos="fade-up" data-aos-delay={400}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum.
                  </h6>
                </div>
              </div>
              <div
                className="col-lg-6 order-1 order-lg-2 hero-img"
                data-aos="fade-left"
                data-aos-delay={200}
              >
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
                  <div className="dotsWrapper">
                    <Dots />
                  </div>
                </div>
                <div className="lightBg grayDiv"></div>
              </div>
            </div>
          </div>
        </section>
        {/* End Hero */}
        <main id="main">
          {/* ======= Clients Section ======= */}
          <section id="clients" className="clients clients">
            <div className="container">
              <div className="row">
                <div className="col-lg-2 col-md-4 col-6">
                  <img
                    src="../../assets/img/clients/client-1.png"
                    className="img-fluid"
                    alt=""
                    data-aos="zoom-in"
                  />
                </div>
                <div className="col-lg-2 col-md-4 col-6">
                  <img
                    src="../../assets/img/clients/client-2.png"
                    className="img-fluid"
                    alt=""
                    data-aos="zoom-in"
                    data-aos-delay={100}
                  />
                </div>
                <div className="col-lg-2 col-md-4 col-6">
                  <img
                    src="../../assets/img/clients/client-3.png"
                    className="img-fluid"
                    alt=""
                    data-aos="zoom-in"
                    data-aos-delay={200}
                  />
                </div>
                <div className="col-lg-2 col-md-4 col-6">
                  <img
                    src="../../assets/img/clients/client-4.png"
                    className="img-fluid"
                    alt=""
                    data-aos="zoom-in"
                    data-aos-delay={300}
                  />
                </div>
                <div className="col-lg-2 col-md-4 col-6">
                  <img
                    src="../../assets/img/clients/client-5.png"
                    className="img-fluid"
                    alt=""
                    data-aos="zoom-in"
                    data-aos-delay={400}
                  />
                </div>
                <div className="col-lg-2 col-md-4 col-6">
                  <img
                    src="../../assets/img/clients/client-6.png"
                    className="img-fluid"
                    alt=""
                    data-aos="zoom-in"
                    data-aos-delay={500}
                  />
                </div>
              </div>
            </div>
          </section>
          {/* End Clients Section */}

          <section id="services" className="services">
            <div className="container">
              <div className="section-title" data-aos="fade-up">
                <h2>Industry Type</h2>
                <p>
                  Magnam dolores commodi suscipit eius consequatur ex aliquid
                  fug
                </p>
              </div>
              <div className="row rowSeprator">
                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div
                    className="icon-box"
                    data-aos="fade-up"
                    data-aos-delay={100}
                  >
                    <div className="icon">
                      <i className="bx bxl-dribbble" />
                    </div>
                    <h4 className="title">
                      <a href>Technology</a>
                    </h4>
                    <p className="description">
                      Voluptatum deleniti atque corrupti quos dolores et quas
                      molestias excepturi
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div
                    className="icon-box"
                    data-aos="fade-up"
                    data-aos-delay={200}
                  >
                    <div className="icon">
                      <i className="bx bx-file" />
                    </div>
                    <h4 className="title">
                      <a href>Fin-Tech</a>
                    </h4>
                    <p className="description">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div
                    className="icon-box"
                    data-aos="fade-up"
                    data-aos-delay={300}
                  >
                    <div className="icon">
                      <i className="bx bx-tachometer" />
                    </div>
                    <h4 className="title">
                      <a href>Manufacturing</a>
                    </h4>
                    <p className="description">
                      Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div
                    className="icon-box"
                    data-aos="fade-up"
                    data-aos-delay={400}
                  >
                    <div className="icon">
                      <i className="bx bx-world" />
                    </div>
                    <h4 className="title">
                      <a href> Banking</a>
                    </h4>
                    <p className="description">
                      At vero eos et accusamus et iusto odio dignissimos ducimus
                      qui blanditiis
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div
                    className="icon-box"
                    data-aos="fade-up"
                    data-aos-delay={100}
                  >
                    <div className="icon">
                      <i className="bx bxl-dribbble" />
                    </div>
                    <h4 className="title">
                      <a href>Retail</a>
                    </h4>
                    <p className="description">
                      Voluptatum deleniti atque corrupti quos dolores et quas
                      molestias excepturi
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div
                    className="icon-box"
                    data-aos="fade-up"
                    data-aos-delay={200}
                  >
                    <div className="icon">
                      <i className="bx bx-file" />
                    </div>
                    <h4 className="title">
                      <a href>Service Agency</a>
                    </h4>
                    <p className="description">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div
                    className="icon-box"
                    data-aos="fade-up"
                    data-aos-delay={300}
                  >
                    <div className="icon">
                      <i className="bx bx-tachometer" />
                    </div>
                    <h4 className="title">
                      <a href>Real Estate</a>
                    </h4>
                    <p className="description">
                      Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                  <div
                    className="icon-box"
                    data-aos="fade-up"
                    data-aos-delay={400}
                  >
                    <div className="icon">
                      <i className="bx bx-world" />
                    </div>
                    <h4 className="title">
                      <a href> Insurance</a>
                    </h4>
                    <p className="description">
                      At vero eos et accusamus et iusto odio dignissimos ducimus
                      qui blanditiis
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* End Services Section */}
        </main>
        {/* End #main */}
      </div>
    );
  }
}

export default Home;
