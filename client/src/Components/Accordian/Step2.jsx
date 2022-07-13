import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
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
import Alert from "../Alert/Alert";

const Step2 = (props) => {
  const winThemeDetails = new WinthemeDetailService();
  const [expand, setExpand] = useState(false);
  const [selectedTheme, setTheme] = useState(false);
  const [userSelectedThemes, setUserSelectedThemes] = useState([]);
  const dispatch = useDispatch();
  const { accordionId } = useSelector((state) => state.Reducer);
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

  function selectedThemes(e, theme, index) {
    const { checked } = e.target;
    let themes = userSelectedThemes;
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
  let winThemes = [];
  winThemelist.forEach((theme, index) => {
    winThemes.push(
      <Col md={3} style={{ marginBottom: "0.5em" }} key={index}>
        <div className="themes action" id={"themesBtn" + index}>
          <input
            type="checkbox"
            style={{
              width: "100%",
              margin: "-1em 0px 0px -11.4em",
              height: "21px",
              accentColor: "#4BAE4F",
              border: "15px solid red",
            }}
            labelStyle={{ color: "white" }}
            iconStyle={{ fill: "white" }}
            defaultChecked={selectedTheme}
            name="checkedSacCode"
            id={"theme_check" + index}
            className="theme_checkbox_color"
            onChange={(e) => selectedThemes(e, theme.theme, index)}
          />
          <img
            src={theme.img}
            alt={theme.img}
            style={{ display: "block", margin: "0.5em 3.5em" }}
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
      </Col>
    );
  });
  function onAccordianChange(params) {
    setExpand(!expand);
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
        winThemeDetails.sendData(obj, id);
      }
    }
  }
  return (
    <div className="stepOne">
      <Row className="rowSeprator ">{winThemes}</Row>
      <Row className="rowSeprator" style={{ padding: "0 0.3em" }}>
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

Step2.propTypes = {};

export default Step2;
