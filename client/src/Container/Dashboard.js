import React, { useEffect, useState } from "react";
import { Col, Row, Modal } from "react-bootstrap";
import CancelIcon from "@mui/icons-material/Cancel";
import aramarkLogo from "../Assets/images/aramarkLogo.png";
import aramarkLogo_mobile from "../Assets/images/aramark_logo_sm.png";
import { NavInfoList } from "./Static";
import "./Dashboard.css";
import AccordionComponent from "../Components/Accordian/AccordionComponent";
import Calculator from "../Components/Calculator/Calculator";
import { useDispatch, useSelector } from "react-redux";
import { getMasterData } from "../Redux/Actions";
function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMasterData());
  }, []);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 600);
  const [selectedAccordion, setSelectedAccordion] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(isMobileView);

  const handleWindowResize = (e) => {
    if (e.target.innerWidth < 600) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  function handleAccordionChange(id) {
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
      <ul style={{ listStyle: "none", padding: "0px" }}>
        {isMobileView ? (
          <div className="popup_header_container">
            <h5 className="nav_header_popup">{navInfo.header}</h5>{" "}
            <CancelIcon
              onClick={handleCloseModal}
              style={{
                height: "18px",
                width: "18px",
                position: "relative",
                color: "white",
              }}
            />
          </div>
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
        <Row className="main_header">
          <Col
            md={isMobileView ? 4 : 3}
            className="aramark_header_logo_container"
          >
            <img
              src={isMobileView ? aramarkLogo_mobile : aramarkLogo}
              alt="aramarLogo"
              className="aramark_header_logo"
            />
          </Col>
          <Col md={isMobileView ? 8 : 9} className="aramark_header_bg">
            <div className="aramark_header_text">Experience calculator</div>
          </Col>
        </Row>
      </header>
    );
  }

  return (
    <div className={`aramark_dashboard ${isMobileView && "mobile_layout"}`}>
      {headerBar()}

      {isMobileView ? (
        <Modal
          contentClassName="content_modal"
          backdropClassName="modal_backdrop"
          centered={true}
          show={isModalOpen}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body className="content_modal_body">
            {showNavDetails(selectedAccordion)}
          </Modal.Body>
        </Modal>
      ) : (
        <nav>{showNavDetails(selectedAccordion)}</nav>
      )}

      <section>
        <Row className="aramark_section">
          <Col md={8} className="accordianContent">
            {isMobileView && <Calculator isMobileView={true} />}
            <article>
              {" "}
              <AccordionComponent
                handleAccordionChange={handleAccordionChange}
                handleOpenModal={handleOpenModal}
                isMobileView={isMobileView}
              />
            </article>
          </Col>
          {isMobileView === false && (
            <Col md={4}>
              {selectedAccordion === 0 ? (
                <div className="tootalCalculationSection">
                  <div className="tootalCalculationSection_container"></div>
                </div>
              ) : (
                <Calculator />
              )}
            </Col>
          )}
        </Row>
      </section>
    </div>
  );
}

export default Dashboard;
