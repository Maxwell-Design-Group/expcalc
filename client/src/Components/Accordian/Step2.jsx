import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CommunityInvolvement from "../../Assets/images/Community-Involvement.png";
import CostConsciousnes from "../../Assets/images/Cost-Consciousnes.png";
import DEI from "../../Assets/images/DEI.png";
import LeadershipVisibility from "../../Assets/images/Leadership-Visibility.png";
import OperationalResults from "../../Assets/images/Operational-Results.png";
import ProactiveInnovation from "../../Assets/images/Proactive-Innovation.png";
import RightTeamOnTheGround from "../../Assets/images/Right-Team-On-The-Ground.png";
import Sustainability from "../../Assets/images/Sustainability.png";
import { prevAccordionOpen, setWinThemes } from "../../Redux/Actions";

import WinthemeDetailService from "../../Services/WinthemeDetailService";
import Alert from "../Alert/Alert";

const Step2 = (props) => {
  const { isMobileView = false } = props;
  const [expand, setExpand] = useState(false);
  const [selectedTheme, setTheme] = useState(false);

  const winThemeDetails = new WinthemeDetailService();
  const [userSelectedThemes, setUserSelectedThemes] = useState([]);
  const dispatch = useDispatch();
  const { accordionId } = useSelector((state) => state.Reducer);
  const { clientId } = useSelector((state) => state.Reducer);
  const { masterData } = useSelector((state) => state.Master);

  const winThemelist = [
    {
      img: CostConsciousnes,
      description: "",
    },
    {
      img: LeadershipVisibility,
      description: "",
    },
    {
      img: OperationalResults,
      description: "",
    },
    {
      img: RightTeamOnTheGround,
      description: "",
    },
    {
      img: ProactiveInnovation,
      description: "",
    },
    {
      img: DEI,
      description: "DEEP CLIENT UNDERSTANDING",
    },
    {
      img: Sustainability,
      description: "DEEP CLIENT UNDERSTANDING",
    },
    {
      img: CommunityInvolvement,
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
    return <Box sx={{ flexGrow: 1, width: isMobileView ? "100%" : "auto" }}>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 2, sm: 6, md: 12 }}
        style={{
          flexWrap: isMobileView ? "nowrap" : "wrap",
          overflowX: isMobileView ? "scroll" : "hidden",
          marginLeft: isMobileView ? 0 : "-16px"
        }}
      >

        {master.map((theme, index) => {
          return <Grid item xs={2} sm={3} key={index}>
            <div style={{ marginBottom: "0.5em" }} key={index}>
              <div className="themes action" id={"themesBtn" + index} onClick={() => selectedThemes(theme.wintheme, index)}>
                <input
                  type="checkbox"
                  style={{
                    width: "21px",
                    height: "21px",
                    accentColor: "#4BAE4F",
                    border: "15px solid red",
                    position: "absolute",
                    left: "0px",
                    top: "0px"
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
                  style={{ display: "block", margin: "0.5em 3.5em", top: "20%", position: "absolute" }}
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
        })}
      </Grid>
    </Box>
  }

  function addWinThemes(id) {
    let obj = {
      email: "",
      winthemedetail: userSelectedThemes,
    };

    if (userSelectedThemes.length === 0) {
      Alert.error("Choose at least 1 win theme");
      for (let i = 0; i < winThemelist.length; i++) {
        document.getElementById("themesBtn" + i).style.border = "1px solid red";
      }
    } else {
      for (let i = 0; i < userSelectedThemes.length; i++) {
        let obj = {
          email: "",
          winthemedetail: userSelectedThemes,
        };

        if (masterData.wtproduct.length !== 0) {
          let wtProducts = masterData.wtproduct;
          for (let j = 0; j < wtProducts.length; j++) {
            // for (let j = 0; j < themes.length; j++) {

            if (
              userSelectedThemes[i].toUpperCase() ===
              wtProducts[j].Wintheme.toUpperCase()
            ) {
              tableData2.push(wtProducts[j]);
              dispatch(setWinThemes(tableData2));
            }
            // }
          }
        }
        winThemeDetails.sendData(obj, id);
      }
    }
  }

  return (
    <div className="stepOne">
      <Row className="rowSeprator ">{createGridView()}</Row>
      <Row className="rowSeprator" style={{ padding: "0 0.3em", flexWrap: "nowrap" }}>
        <Col md={6} style={{ textAlign: "left" }}>
          <Button
            variant="contained"
            size="small"
            type="submit"
            className="previous_btn"
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
            className="next_btn"
            onClick={() => addWinThemes(accordionId)}
          >
            Next
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Step2;