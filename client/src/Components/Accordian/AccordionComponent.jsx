import React, { useState } from "react";
import Step3 from "./Step3";
import Accordions from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Typography } from "@mui/material";
import "../../Assets/Style/accordianStyle.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useDispatch, useSelector } from "react-redux";
import { updateAccordionId } from "../../Redux/Actions";
import { useEffect } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step5 from "./Step5";
import Step4 from "./Step4";

const AccordionComponent = (props) => {
  const { handleAccordionChange = () => { },
    isMobileView = false,
    handleOpenModal = () => { } } = props;
  const dispatch = useDispatch();
  const { accordionId } = useSelector((state) => state.Reducer);
  const { completedSteps } = useSelector((state) => state.Reducer);
  const [steps, setSteps] = useState([
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
  ]);

  const accordionOpen = (accordionId) => {
    handleAccordionChange(accordionId);
    const newState = steps.map((obj) => {
      if (obj.id === accordionId) {
        return { ...obj, expanded: true };
      } else if (obj.id !== accordionId) {
        return { ...obj, expanded: false };
      }
      return obj;
    });

    setSteps(newState);
  };

  const onAccordionChange = (id) => {
    handleAccordionChange(id);
    const newState = steps.map((obj) => {
      if (obj.id === id) {
        if (obj.expanded === true) {
          dispatch(updateAccordionId(0));
          return { ...obj, expanded: false };
        } else {
          dispatch(updateAccordionId(id));
        }
      }
      return obj;
    });

    setSteps(newState);
  };
  useEffect(() => {
    accordionOpen(accordionId);
  }, [accordionId]);
  return (
    <div className="aramark_section stepOne">
      {steps.map((item, index) => (
        <Accordions
          onChange={() => onAccordionChange(item.id)}
          id={"accordion" + item.id}
          expanded={item.expanded}
          className={
            completedSteps.includes(item.id) && item.expanded === true
              ? "step_edit"
              : completedSteps.includes(item.id) && item.expanded === false
                ? "step_completed"
                : null
          }
        >
          <AccordionSummary
            expandIcon={
              completedSteps.includes(item.id) ? (
                <CheckCircleIcon className="icon_step_complete" />
              ) : item.expanded === true ? (
                <RemoveCircleIcon
                  style={{ margin: "0px 0px 0px 10px !important", color: "black", opacity: 1 }}
                />
              ) : (
                <AddCircleIcon />
              )
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="accordian-summary-header"
            style={{
              flexDirection: "row-reverse",
              margin: "11px 0 0 0",
              padding: item.expanded ? "0px" : "16px"
            }}
          >
            <div style={{
              display: "flex",
              padding: isMobileView ? "0px" : "0px 20px",
              justifyContent: "space-between",
              flex: 1
            }}>
              <Typography>{item.title}</Typography>
              {
                isMobileView && item.expanded === true && <InfoIcon style={{ color: "black", opacity: 1 }} onClick={(e) => handleOpenModal(e)} />
              }
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {item.id === 3 ? (
              <Step3 />
            ) : item.id === 1 ? (
              <Step1 />
            ) : item.id === 2 ? (
              <Step2 isMobileView={isMobileView} />
            ) : item.id === 5 ? (
              <Step5 />
            ) : item.id === 4 ? (
              <Step4 />
            ) : null}
          </AccordionDetails>
        </Accordions>
      ))}
    </div>
  );
};

export default AccordionComponent;