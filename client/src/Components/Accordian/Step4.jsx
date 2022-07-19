import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  completedSteps,
  nextAccordionOpen,
  prevAccordionOpen,
} from "../../Redux/Actions";
import ExperienceService from "../../Services/ExperienceService";
import calculatedataService from "../../Services/calculatedataService";
import "./step4.css";
import Alert from "../Alert/Alert";

const Step4 = (props) => {
  const { isMobileView = false, disabled = disabled } = props;
  const Experience = new ExperienceService();
  const calculatedata = new calculatedataService();
  const { clientDetails } = useSelector((state) => state.Reducer);

  const tableRows = [];
  let features = [];
  const [checked, setChecked] = useState(false);
  const [featureChecked, setFeatureChecked] = useState(false);
  const [userSelectedProducts, setUserSelectedProducts] = useState([]);
  const [userSelectedFeatures, setUserSelectedFeatures] = useState([]);
  const [digitalSinage50, setDigitalSinage50] = useState("");
  const [digitalSinage55, setDigitalSinage55] = useState("");
  const [digitalSinage65, setDigitalSinage65] = useState("");
  const dispatch = useDispatch();
  const { accordionId } = useSelector((state) => state.Reducer);
  const { masterData } = useSelector((state) => state.Master);
  const [tableData, setTabledata] = useState([
    {
      product: "Yokai",
      description: "Lorem ipsum dolor sit amet, consetetur sadipssed",
      cost: "$ 231,453",
    },
    {
      product: "Basil Street",
      description: "Lorem ipsum dolor sit amet, consetetur sadipssed",
      cost: "$ 231,453",
    },
    {
      product: "Enable",
      description: "Lorem ipsum dolor sit amet, consetetur sadipssed",
      cost: "$ 231,453",
    },
    {
      product: "Marko",
      description: "Lorem ipsum dolor sit amet, consetetur sadipssed",
      cost: "$ 231,453",
    },
  ]);

  const supportingFeatureData = [
    {
      label: "Catertrax Catering",
    },
    {
      label: "Catering B2C",
    },
  ];

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
    
  };

  const handleChangeFeatures = (e, rowData) => {
    const { checked } = e.target;
    features = userSelectedFeatures;
    if (checked === true) {
      features.push(rowData.label);

      setUserSelectedFeatures(features);
    } else {
      for (let i = 0; i < features.length; i++) {
        if (features[i] === rowData.label) {
          features.splice(i, 1);

          setUserSelectedFeatures(features);
        }
      }
    }
    // calculation();
  };

  tableData.forEach((row, index) => {
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
        <td>{row.description}</td>
        <td>{row.cost}</td>
      </tr>
    );
  });

  const onPrevious = (id) => {
    dispatch(prevAccordionOpen(id));
  };

  

  const selectNoOption = (id) => {
    let catering = "";
    if (
      digitalSinage50 == "" &&
      digitalSinage55 == "" &&
      digitalSinage65 == ""
    ) {
      Alert.error(
        "It looks like you are not requesting any digital signage or catering for this client.  Is that correct?"
      );
    } else if (features.length == 0) {
      Alert.error(
        "It looks like you are not requesting any digital signage or catering for this client.  Is that correct?"
      );
    } else {
      if (features.length > 0) {
        catering = features.toString();
      }
      let obj = {
        ...clientDetails,
        digitalsignage50: digitalSinage50,
        digitalsignage55: digitalSinage55,
        digitalsignage65: digitalSinage65,
        catering: catering,
      };
      Experience.sendData(obj, id, clientDetails);
      // calculation();
    }
  };

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
        disabled === true ? Alert.error("Step 3 is not yet completed") : ""
      }
    >
      <div className={isFormEnableOrDisabled()}>
        <div
          className="digital_signage"
          style={{
            flexDirection: isMobileView ? "column" : "row",
          }}
        >
          <div className="digital_signage_text">Digital Sinage</div>

          <div
            style={{
              height: "80px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div class="ds_btn">
              <span
                style={{ position: "absolute", top: "-27px", left: "24px" }}
              >
                50&deg;
              </span>
              <input
                type="text"
                id="digitalSinage50"
                value={digitalSinage50}
                placeholder="QTY"
                onChange={(e) => setDigitalSinage50(e.target.value)}
              />
            </div>
            <div class="ds_btn">
              <span
                style={{ position: "absolute", top: "-27px", left: "24px" }}
              >
                55&deg;
              </span>
              <input
                type="text"
                id="digitalSinage55"
                placeholder="QTY"
                value={digitalSinage55}
                onChange={(e) => setDigitalSinage55(e.target.value)}
              />
            </div>
            <div class="ds_btn">
              <span
                style={{ position: "absolute", top: "-27px", left: "24px" }}
              >
                65&deg;
              </span>
              <input
                type="text"
                id="digitalSinage65"
                placeholder="QTY"
                value={digitalSinage65}
                onChange={(e) => setDigitalSinage65(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div
          className="digital_signage"
          style={{
            flexDirection: isMobileView ? "column" : "row",
          }}
        >
          <div className="digital_signage_text">Catering</div>
          <div className="catering-sports-container">
            {" "}
            {supportingFeatureData.map((feature, index) => {
              return (
                <div class="catering sports">
                  <label>
                    <input
                      type="checkbox"
                      value={feature.label}
                      defaultChecked={featureChecked}
                      onChange={(e) => handleChangeFeatures(e, feature, index)}
                    />
                    <span> {feature.label}</span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <Row
          className="rowSeprator"
          style={{ padding: "0 0.3em", flexWrap: "nowrap" }}
        >
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
              onClick={() => selectNoOption(accordionId)}
            >
              Next
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

Step4.propTypes = {};

export default Step4;
