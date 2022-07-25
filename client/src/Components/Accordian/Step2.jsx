import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CommunityInvolvement from "../../Assets/images/winthemesImages/Community-Involvement.png";
import CostConsciousnes from "../../Assets/images/winthemesImages/Cost-Consciousnes.png";
import DEI from "../../Assets/images/winthemesImages/DEI.png";
import LeadershipVisibility from "../../Assets/images/winthemesImages/Leadership-Visibility.png";
import OperationalResults from "../../Assets/images/winthemesImages/Operational-Results.png";
import ProactiveInnovation from "../../Assets/images/winthemesImages/Proactive-Innovation.png";
import RightTeamOnTheGround from "../../Assets/images/winthemesImages/Right-Team-On-The-Ground.png";
import Sustainability from "../../Assets/images/winthemesImages/Sustainability.png";
import { prevAccordionOpen, setWinThemes } from "../../Redux/Actions";

import WinthemeDetailService from "../../Services/WinthemeDetailService";
import Alert from "../Alert/Alert";
import { Typography } from "@mui/material";

const Step2 = (props) => {
  const { isMobileView = false, disabled = disabled } = props;
  const [expand, setExpand] = useState(false);
  const [selectedTheme, setTheme] = useState(false);

  const winThemeDetails = new WinthemeDetailService();
  const [userSelectedThemes, setUserSelectedThemes] = useState([]);
  const dispatch = useDispatch();
  const { accordionId } = useSelector((state) => state.Reducer);
  const { masterData } = useSelector((state) => state.Master);
  const { clientDetails } = useSelector((state) => state.Reducer);
  const winThemelist = [
    {
      img: CostConsciousnes,
      description: "",
    },
    {
      img: OperationalResults,
      description: "",
    },
    {
      img: ProactiveInnovation,
      description: "",
    },
    {
      img: LeadershipVisibility,
      description: "",
    },
    {
      img: RightTeamOnTheGround,
      description: "",
    },
    {
      img: DEI,
      description: "DEEP CLIENT UNDERSTANDING",
    },
    {
      img: CommunityInvolvement,
      description: "DEEP CLIENT UNDERSTANDING",
    },
    {
      img: Sustainability,
      description: "DEEP CLIENT UNDERSTANDING",
    },
  ];

  const tableData2 = [];
  var master = [];

  if (masterData.wintheme) {
    master = masterData.wintheme.map((master, index) => {
      if (winThemelist[index]) {
        return {
          ...master,
          image: winThemelist[index].img,
          description: winThemelist[index].description,
        };
      }
    });
    master = master.filter(function (el) {
      return el != null;
    });
  }

  const onPrevious = (id) => {
    dispatch(prevAccordionOpen(id));
  };

  function selectedThemes(theme, index) {
    const checked = !userSelectedThemes.includes(theme);
    let themes = [...userSelectedThemes];
    if (checked === true) {
      for (let i = 0; i < winThemelist.length; i++) {
        if (userSelectedThemes.length === 0) {
          document.getElementById("themesBtn" + i).style.border = "none";
        }
      }
      document.getElementById("themesBtn" + index).style.backgroundColor =
        "#fff";
      document.getElementById("themesBtn" + index).style.border =
        "2px solid #4BAE4F";
      document.getElementById("theme_check" + index).style.opacity = "1";
      document.getElementById("thmsLbl" + index).style.color = "#566573";
      themes.push(theme);
      setUserSelectedThemes(themes);
    } else {
      for (let i = 0; i < themes.length; i++) {
        for (let i = 0; i < winThemelist.length; i++) {
          if (userSelectedThemes.length === 0) {
            document.getElementById("themesBtn" + i).style.border = "none";
          }
        }
        if (themes[i] === theme) {
          themes.splice(i, 1);
          document.getElementById("theme_check" + index).style.opacity = "0.1";
          document.getElementById("themesBtn" + index).style.border =
            "1px solid #fff";
          document.getElementById("thmsLbl" + index).style.color = "#808B96";
          setUserSelectedThemes(themes);
        }
      }
    }
  }

  function createGridView() {
    return (
      <Box
        sx={{
          flexGrow: 1,
          width: isMobileView ? "100%" : "auto",
          overflow: "hidden",
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 2, sm: 6, md: 12 }}
          style={{
            flexWrap: isMobileView ? "nowrap" : "wrap",
            overflowX: isMobileView ? "scroll" : "hidden",
            marginLeft: isMobileView ? 0 : "-16px",
            width: isMobileView ? "100%" : "calc(100% + 16px)",
          }}
        >
          {master.map((theme, index) => {
            return (
              <Grid item xs={2} sm={3} key={index}>
                <div style={{ marginBottom: "0.5em" }} key={index}>
                  <div
                    className="themes action"
                    id={"themesBtn" + index}
                    onClick={() => selectedThemes(theme.wintheme, index)}
                  >
                    <div
                      className="three-dots"
                      style={{
                        position: "absolute",
                        top: "0px",
                        right: "0px",
                        cursor: "pointer",
                      }}
                    >
                      &#xFE19;
                    </div>
                    <input
                      type="checkbox"
                      style={{
                        width: "21px",
                        height: "21px",
                        accentColor: "#4BAE4F",
                        border: "15px solid red",
                        position: "absolute",
                        left: "0px",
                        top: "0px",
                      }}
                      labelStyle={{ color: "white" }}
                      iconStyle={{ fill: "white" }}
                      checked={userSelectedThemes.includes(theme.wintheme)}
                      name="checkedSacCode"
                      id={"theme_check" + index}
                      className="theme_checkbox_color"
                      onChange={(e) => selectedThemes(theme.wintheme, index)}
                    />
                    <img
                      src={theme.image}
                      alt={theme.image}
                      style={{
                        height: "44px",
                        width: "auto",
                        // display: "block",
                        // margin: "0.5em 3.5em",
                        // top: "20%",
                        // position: "absolute",
                      }}
                    />
                    <div className="theme_label_container">
                      <span className="themesLabel" id={"thmsLbl" + index}>
                        {theme.wintheme}
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
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  }

  function addWinThemes(id) {
    if (userSelectedThemes.length === 0) {
      Alert.error("Choose at least 1 win theme");
      for (let i = 0; i < winThemelist.length; i++) {
        document.getElementById("themesBtn" + i).style.border = "1px solid red";
      }
    } else {
      let wintheme = "";
      if (userSelectedThemes) {
        wintheme = userSelectedThemes.toString();
      }

      let obj = {
        email: "",
        ...clientDetails,
        wintheme: wintheme,
      };
      for (let i = 0; i < userSelectedThemes.length; i++) {
        if (masterData.wtproduct.length !== 0) {
          let wtProducts = masterData.wtproduct;
          for (let j = 0; j < wtProducts.length; j++) {
            // for (let j = 0; j < themes.length; j++) {
            if (wtProducts[j].Wintheme !== undefined) {
              if (
                userSelectedThemes[i] != undefined &&
                userSelectedThemes[i].toUpperCase() ===
                wtProducts[j].Wintheme.toUpperCase()
              ) {
                tableData2.push(wtProducts[j]);
                console.log("tableData2 ", tableData2);
                dispatch(setWinThemes(tableData2));
              }
            }
          }
        }
      }
      winThemeDetails.sendData(obj, id, clientDetails);
    }
  }

  function isFormEnableOrDisabled() {
    let isFormActive = "stepOne isStepDiabled";
    if (disabled === false) {
      isFormActive = "stepOne isStepActive";
    }
    return isFormActive;
  }

  return (
    <div
      onClick={() =>
        disabled === true ? Alert.error("Step 1 is not yet completed") : ""
      }
    >
      <div className={isFormEnableOrDisabled()}>
        <Row className="rowSeprator ">{createGridView()}</Row>
        <Row className="rowSeprator" style={{ flexWrap: "nowrap" }}>
          <Col
            md={6}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingLeft: isMobileView ? "16px" : "4px"
            }}
          >
            <Button
              variant="contained"
              size="small"
              type="submit"
              className="previous_btn"
              onClick={() => onPrevious(accordionId - 1)}
            >
              <Typography variant="subtitle1" style={{
                fontSize: isMobileView ? "12px" : "16px"
              }}>Previous</Typography>
            </Button>
          </Col>
          <Col
            md={6}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: isMobileView ? "16px" : "4px"
            }}
          >
            <Button
              variant="contained"
              size="small"
              type="submit"
              className="next_btn"
              onClick={() => addWinThemes(accordionId)}
            >
              <Typography variant="subtitle1" style={{
                fontSize: isMobileView ? "12px" : "16px"
              }}>Next</Typography>
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Step2;
