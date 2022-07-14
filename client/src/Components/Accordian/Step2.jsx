import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CommunityInvolvement from "../../Assets/images/Community-Involvement.png";
import CostConsciousnes from "../../Assets/images/Cost-Consciousnes.png";
import DEI from "../../Assets/images/DEI.png";
import LeadershipVisibility from "../../Assets/images/Leadership-Visibility.png";
import OperationalResults from "../../Assets/images/Operational-Results.png";
import ProactiveInnovation from "../../Assets/images/Proactive-Innovation.png";
import RightTeamOnTheGround from "../../Assets/images/Right-Team-On-The-Ground.png";
import Sustainability from "../../Assets/images/Sustainability.png";
import { prevAccordionOpen } from "../../Redux/Actions";

import WinthemeDetailService from "../../Services/WinthemeDetailService";
import ClientDetailService from "../../Services/ClientDetailService";
import Alert from "../Alert/Alert";

const Step2 = () => {
  const winThemeDetails = new WinthemeDetailService();
  const [userSelectedThemes, setUserSelectedThemes] = useState([]);
  const dispatch = useDispatch();
  const { accordionId } = useSelector((state) => state.Reducer);
  const { clientId } = useSelector((state) => state.Reducer);
  const [winThemelist, setWinThemes] = useState([
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
  ]);

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
    return <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >

        {winThemelist.map((theme, index) => {
          return <Grid item xs={2} sm={4} md={4} key={index}>
            <div style={{ marginBottom: "0.5em" }} key={index}>
              <div className="themes action" id={"themesBtn" + index} onClick={() => selectedThemes(theme.theme, index)}>
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
                  checked={userSelectedThemes.includes(theme.theme)}
                  name="checkedSacCode"
                  id={"theme_check" + index}
                  className="theme_checkbox_color"
                  onChange={() => selectedThemes(theme.theme, index)}
                />
                <img
                  src={theme.img}
                  alt={theme.img}
                  style={{ display: "block", margin: "0.5em 3.5em", top: "20%", position: "absolute" }}
                />
                <div className="theme_label_container">
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
          </Grid>
        })}
      </Grid>
    </Box>
  }

  function addWinThemes(id) {
    

    console.log(userSelectedThemes);

    if (userSelectedThemes.length === 0) {
      Alert.error("Choose at least 1 win theme");
      for (let i = 0; i < winThemelist.length; i++) {
        document.getElementById("themesBtn" + i).style.border = "1px solid red";
      }
    } else {
      let wth = "";
      for (let i = 0; i < userSelectedThemes.length; i++) {
        wth = wth + "," + userSelectedThemes[i];
        
      }
        // let obj = {
        //   email: "",
        //   clientname: clientName,
        //   contracttype: contractType,
        //   lifeworks: isLifeworks,
        //   anticipatedrevenue: anticipatedRevenue,
        //   population: population,
        //   industrytype: industryType,
        //   wintheme:wth,
        // };

        // console.log(obj);
        // clientDetailService.updateDate(obj, id); // should be pass client id
      
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
