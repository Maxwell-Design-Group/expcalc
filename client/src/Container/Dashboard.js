import React, { useState } from "react";
import { Col, Row, Modal } from "react-bootstrap";
import CancelIcon from "@mui/icons-material/Cancel";
import aramarkLogo from "../Assets/images/aramarkLogo.png";
import aramarkLogo_mobile from "../Assets/images/aramark_logo_sm.png";
import { NavInfoList } from "./Static";
import "./Dashboard.css";
import AccordianComponent from "../Components/Accordian/AccordionComponent";
import Calculator from "../Components/Calculator/Calculator";

function Dashboard() {
  const isMobileView = window.innerWidth < 430;
  const [selectedAccordion, setSelectedAccordion] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(isMobileView);

  function handleAccordianChange(id) {
    setSelectedAccordion(id);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleOpenModal(e) {
    e.stopPropagation();
    setIsModalOpen(true);
  }

  function showNavDetails(id) {
    const navInfo = NavInfoList.filter((item) => item.id === id)[0];
    return (
      <ul style={{ listStyle: "none" }}>
        {isMobileView ? (
          <Row>
            <Col md={12}>
              <h5 className="nav_header_popup">{navInfo.header}</h5>{" "}
              <CancelIcon
                onClick={handleCloseModal}
                style={{
                  float: "right",
                  height: "18px",
                  width: "18px",
                  top: "-60px",
                  position: "relative",
                }}
              />
            </Col>
          </Row>
        ) : (
          <li>
            <div className="nav_header_container">
              <h5 className="nav_header">{navInfo.header}</h5>
            </div>
          </li>
        )}

        <li>
          <div
            className={
              id === 0
                ? "nav_description_container"
                : "nav_description_container_expanded"
            }
          >
            <p className="nav_description">{navInfo.description1}</p>
            <p className="nav_description">{navInfo.description2}</p>
          </div>
        </li>

        {isMobileView === false && (
          <li className="version_details">
            <p className="version_txt">© 2022 Aramark Corporation. | EC v0.1</p>
          </li>
        )}
      </ul>
    );
  }

  function headerBar() {
    return (
      <header>
        <Row>
          <Col
            md={isMobileView ? 4 : 3}
            className="aramark_header_logo_container"
          >
            {" "}
            <div className="logo">
              <img
                src={isMobileView ? aramarkLogo_mobile : aramarkLogo}
                alt="aramarLogo"
                className="aramark_header_logo"
              />
              <h5 style={{ fontSize: "0.5em" }}></h5>
            </div>
          </Col>
          <Col md={isMobileView ? 8 : 9} className="aramark_header_bg">
            <h5 className="aramark_header_text">Experience calculator</h5>
          </Col>
        </Row>
      </header>
    );
  }

  return (
    <div className={`aramark_dashboard ${isMobileView && "mobile_layout"}`}>
      {headerBar()}
      <nav>{showNavDetails(selectedAccordion)}</nav>

      <section>
        <Row className="aramark_section ">
          <Col md={8} className="accordianContent">
            <article>
              {" "}
              <AccordianComponent
                handleAccordianChange={handleAccordianChange}
                handleCloseModal={handleCloseModal}
                handleOpenModal={handleOpenModal}
              />
            </article>
          </Col>
          <Col md={3}>
            {selectedAccordion === 0 ? (
              <div className="tootalCalculationSection">
                <div className="tootalCalculationSection_container"></div>
              </div>
            ) : (
              <Calculator />
            )}
          </Col>
        </Row>
      </section>
      {isMobileView && (
        <Modal
          show={isModalOpen}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>{showNavDetails(selectedAccordion)}</Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default Dashboard;
