import { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getSupportingQuestionDetails,
  prevAccordionOpen,
} from "../../Redux/Actions";
import "./Step5.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "react-bootstrap/Table";
import SupportingQuestionService from "../../Services/SupportingQuestionService";
import Alert from "../Alert/Alert";
import calculatedataService from "../../Services/calculatedataService";
import { Typography } from "@mui/material";

const Step5 = (props) => {
  const { isMobileView = false, disabled = disabled } = props;
  const SupportingQuestion = new SupportingQuestionService();
  const calculatedata = new calculatedataService();
  const tableRows = [];
  const supportingFeatures = [];
  const POSData = [];
  let POS = [];

  const [checked, setChecked] = useState(false);
  const [expand, setExpand] = useState(false);
  const [pos, setPos] = useState("");
  const [featureChecked, setFeatureChecked] = useState(false);
  const [userSelectedProducts, setUserSelectedProducts] = useState([]);
  const [userSelectedFeatures, setUserSelectedFeatures] = useState([]);
  const dispatch = useDispatch();
  const { masterData } = useSelector((state) => state.Master);
  const { accordionId } = useSelector((state) => state.Reducer);
  const { themes } = useSelector((state) => state.Reducer);
  const { clientDetails } = useSelector((state) => state.Reducer);
  const { posDetails } = useSelector((state) => state.Reducer);
  const { supportingFeatureDetails } = useSelector((state) => state.Reducer);

  const [supportingQuestionData, setSupportingQuestionData] = useState([]);
  const tableData2 = [];
  // const POS = [
  //   { label: "Dish $2345", value: "Dish" },
  //   { label: "365 Retail $3445", value: "365 Retail" },
  //   { label: "Micros $5345", value: "Micros" },
  // ];
  let supportingFeatureData = [];
  // if (masterData.supportingfeature) {
  //   supportingFeatureData = masterData.supportingfeature;
  // }
  useEffect(() => {
    // var clientDetailsObj = Object.keys(clientDetails).length;
    // if (clientDetailsObj > 0) {
    //   dispatch(getSupportingQuestionDetails());
    // }
  }, []);
  const onPrevious = (id) => {
    dispatch(prevAccordionOpen(id));
  };

  const selectNoOption = (id) => {
    let suportingfeature = "";
    if (userSelectedFeatures.length > 0) {
      suportingfeature = userSelectedFeatures.toString();
    }
    let wtproduct = "";
    if (userSelectedProducts.length > 0) {
      wtproduct = userSelectedProducts.toString();
    }
    let obj = {
      ...clientDetails,
      pos: pos,
      suportingfeature: suportingfeature,
      wtproduct: wtproduct,
    };
    SupportingQuestion.sendData(obj, id, clientDetails);
  };

  function calculation() {
    let calcObj = {
      population: clientDetails.population,
      wintheme: clientDetails.wintheme,
      customisableconvenience: clientDetails.customisableconvenience,
      customisableconvenienceoption: clientDetails.email,
      mobile: clientDetails.mobile,
      kiosk: clientDetails.kiosk,
      selfcheckout:
        clientDetails.selfcheckout === undefined
          ? false
          : clientDetails.selfcheckout,
      cashier: clientDetails.cashier,
      station: clientDetails.station,
      digitalsignage: undefined,
      catering: clientDetails.catering.toString(),
      pos: undefined,
      suportingfeature: undefined,
      wtproduct: userSelectedProducts.toString(),
      digitalsignage50: clientDetails.digitalsignage50,
      digitalsignage55: clientDetails.digitalsignage55,
      digitalsignage65: clientDetails.digitalsignage65,
      master: masterData,
    };
    console.log(calcObj);
    console.log(clientDetails);
    calculatedata.getcalculation(calcObj);
  }

  // useEffect(() => {
  //   console.log("pos");
  //   console.log(pos);
  //   calculation();
  // }, [pos]);

  const handleChange = (e, rowData, index) => {
    const { checked } = e.target;
    let products = userSelectedProducts;
    if (checked === true) {
      products.push(rowData.product);

      setUserSelectedProducts(products);
    } else {
      for (let i = 0; i < products.length; i++) {
        if (products[i] === rowData.product) {
          products.splice(i, 1);

          setUserSelectedProducts(products);
        }
      }
    }
    calculation();
  };
  const handleChangeFeatures = (e, rowData, index) => {
    const { checked } = e.target;
    let features = userSelectedFeatures;

    if (checked === true) {
      if (rowData.indexOf("Digital Signage55") !== -1) {
        features.push("55");
      }
      if (rowData.indexOf("Digital Signage50") !== -1) {
        features.push("50");
      }
      if (rowData.indexOf("Digital Signage65") !== -1) {
        features.push("65");
      }

      setUserSelectedFeatures(features);
    } else {
      for (let i = 0; i < features.length; i++) {
        let rfeature = "";
        if (rowData.indexOf("Digital Signage55") !== -1) {
          rfeature = "55";
        }
        if (rowData.indexOf("Digital Signage50") !== -1) {
          rfeature = "50";
        }
        if (rowData.indexOf("Digital Signage65") !== -1) {
          rfeature = "65";
        }

        if (features[i] === rfeature) {
          features.splice(i, 1);

          setUserSelectedFeatures(features);
        }
      }
    }

    //calculation();
  };
  if (themes) {
    themes.forEach((row, index) => {
      tableRows.push(
        <tr>
          <td>
            <input
              type="checkbox"
              style={{
                accentColor: "#4BAE4F",
                border: "15px solid red",
              }}
              labelStyle={{ color: "white" }}
              iconStyle={{ fill: "white" }}
              defaultChecked={checked}
              name="checkedSacCode"
              id={"theme_check" + index}
              onChange={(e) => handleChange(e, row, index)}
            />
            &nbsp;
            {row.product}
          </td>
          <td
            style={{
              letterSpacing: "-0.52px",
              textAlign: "left",
              wordBreak: "break-all",
            }}
          >
            {row.productDescription}
          </td>
          <td style={{ textAlign: "right" }}>{row.Total}</td>
        </tr>
      );
    });
  }

  if (supportingFeatureDetails) {
    supportingFeatureData = supportingFeatureDetails;
    supportingFeatureData.forEach((feature, index) => {
      supportingFeatures.push(
        <div class="fs_button sports">
          <label>
            <input
              type="checkbox"
              value={feature.label}
              defaultChecked={featureChecked}
              onChange={(e) => handleChangeFeatures(e, feature, index)}
            />
            <span>{feature}</span>
          </label>
        </div>
      );
    });
  }

  const handlePosChange = (ev) => {
    //save your value here with state variable
    setPos(ev.target.value);
  };
  if (posDetails) {
    POS = posDetails;
    console.log("POS ", POS.length);
    POS.forEach((pos, index) => {
      POSData.push(
        <div class="pos_btn">
          <input
            type="radio"
            id="a25"
            name="check-substitution-2"
            onChange={handlePosChange}
            value={pos.pos}
          />
          <label class="btn btn-default" for="a25">
            {pos.pos}
            <div>
              {" $" + parseInt(parseInt(pos.capex) + parseInt(pos.opex))}
            </div>
          </label>
        </div>
      );
    });
  }

  function onAccordianChange(params) {
    setExpand(!expand);
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
        disabled === true ? Alert.error("Step 4 is not yet completed") : ""
      }
    >
      <div className={isFormEnableOrDisabled()}>
        <div
          className="POS_Container"
          style={{
            flexDirection: isMobileView ? "column" : "row",
          }}
        >
          <div className="POS_text">Point-of-Sale</div>

          <div
            // style={{
            //   height: "80px",
            //   display: "flex",
            //   alignItems: "center",
            // }}
            className={
              POS.length > 2
                ? "pos_options_container_scroll"
                : "pos_options_container"
            }
          >
            {POSData}

            {/* <div class="pos_btn">
              <input
                type="radio"
                id="a50"
                name="check-substitution-2"
                onChange={handlePosChange}
                value="365 Retail"
              />
              <label class="btn btn-default" for="a50">
                365 Retail $3445
              </label>
            </div>
            <div class="pos_btn">
              <input
                type="radio"
                id="a75"
                name="check-substitution-2"
                onChange={handlePosChange}
                value="Micros"
              />
              <label class="btn btn-default" for="a75">
                Micros $5345
              </label>
            </div> */}
          </div>
        </div>

        <div
          className="POS_Container"
          style={{
            flexDirection: isMobileView ? "column" : "row",
          }}
        >
          <div className="SF_text">Supporting Feature</div>
          <div className="POS_main_container">{supportingFeatures}</div>
        </div>

        <div
          className="POS_Container"
          style={{
            flexDirection: isMobileView ? "column" : "row",
          }}
        >
          <div className="you-may-also-like">You may also like</div>
          <div className="you-may-also-like-main-container">
            {" "}
            <Col md={12}>
              <div class="tableFixHead">
                <table
                  striped
                  bordered
                  hover
                  style={{
                    tableLayout: "fixed",
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  <thead
                    style={{
                      // borderBottom: "1px solid #cfcfcf",
                      textAlign: "left",
                      font: "normal normal 400 14px/36px Gotham",
                      letterSpacing: "0.25px",
                      color: "#4B4B4B",
                      opacity: "1",
                    }}
                  >
                    <tr>
                      <th style={{ width: "15%", background: "#fff" }}>
                        Product
                      </th>
                      <th style={{ width: "45%", background: "#fff" }}>
                        Brief Description
                      </th>
                      <th
                        style={{
                          width: "10%",
                          background: "#fff",
                          textAlign: "right",
                        }}
                      >
                        Cost
                      </th>
                    </tr>
                  </thead>

                  <tbody>{tableRows}</tbody>
                </table>
              </div>
            </Col>
          </div>
        </div>
        <Row className="rowSeprator" style={{ flexWrap: "nowrap" }}>
          <Col md={6} style={{ textAlign: "left" }}>
            <Button
              variant="contained"
              size="small"
              type="submit"
              className="previous_btn"
              onClick={() => onPrevious(accordionId - 1)}
            >
              <Typography
                variant="subtitle1"
                style={{
                  fontSize: isMobileView ? "12px" : "16px",
                }}
              >
                Previous
              </Typography>
            </Button>
          </Col>

          <Col md={6} style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              size="small"
              type="submit"
              className="next_btn"
              onClick={() => selectNoOption(accordionId)}
            >
              <Typography
                variant="subtitle1"
                style={{
                  fontSize: isMobileView ? "12px" : "16px",
                }}
              >
                Submit
              </Typography>
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

Step5.propTypes = {};

export default Step5;
