import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { prevAccordionOpen } from "../../Redux/Actions";
import "./Step5.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "react-bootstrap/Table";
import SupportingQuestionService from "../../Services/SupportingQuestionService";
const Step5 = (props) => {
  const SupportingQuestion = new SupportingQuestionService();
  const tableRows = [];
  const supportingFeatures = [];
  const POSData = [];
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
  const { isMobileView = false } = props;
  const tableData2 = [];
  const POS = [
    { label: "Dish $2345", value: "Dish" },
    { label: "365 Retail $3445", value: "365 Retail" },
    { label: "Micros $5345", value: "Micros" },
  ];
  let supportingFeatureData = [];
  if (masterData.supportingfeature) {
    supportingFeatureData = masterData.supportingfeature;
  }
  const onPrevious = (id) => {
    dispatch(prevAccordionOpen(id));
  };

  const selectNoOption = (id) => {
    let suportingfeature = "";
    // if (features.length > 0) {
    //   suportingfeature = features.toString();
    // }
    let wtproduct = "";
    // if (features.length > 0) {
    //   wtproduct = features.toString();
    // }
    let obj = {
      ...clientDetails,
      pos: pos,
      suportingfeature: suportingfeature,
      wtproduct: wtproduct,
    };
    SupportingQuestion.sendData(obj, id, clientDetails);
  };
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
  const handleChangeFeatures = (e, rowData, index) => {
    const { checked } = e.target;
    let features = userSelectedFeatures;
    if (checked === true) {
      features.push(rowData.Name);

      setUserSelectedFeatures(features);
    } else {
      for (let i = 0; i < features.length; i++) {
        if (features[i] === rowData.Name) {
          features.splice(i, 1);

          setUserSelectedFeatures(features);
        }
      }
    }
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
          <td>{row.productDescription}</td>
          <td>{row.Total}</td>
        </tr>
      );
    });
  }

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
          <span> {feature.Name + " " + "$" + feature.value}</span>
        </label>
      </div>
    );
  });

  const handlePosChange = (ev) => {
    //save your value here with state variable
    console.log(ev.target.value);
    setPos(ev.target.value);
  };
  POS.forEach((pos, index) => {
    POSData.push(
      <div class="pos_btn">
        <input
          type="radio"
          id="a25"
          name="check-substitution-2"
          onChange={handlePosChange}
          value={pos.value}
        />
        <label class="btn btn-default" for="a25">
          {pos.label}
        </label>
      </div>
    );
  });
  function onAccordianChange(params) {
    setExpand(!expand);
  }

  return (
    <>
      <div>
        <div
          className="POS_Container"
          style={{
            flexDirection: isMobileView ? "column" : "row",
          }}
        >
          <div className="POS_text">POS</div>

          <div
            style={{
              height: "80px",
              display: "flex",
              alignItems: "center",
            }}
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
          <div className="POS_text">Supporting Feature</div>
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
                    borderBottom: "1px solid #cfcfcf",
                    textAlign: "left",
                    font: "normal normal 400 14px/36px Gotham",
                    letterSpacing: "0.25px",
                    color: "#4B4B4B",
                    opacity: "1",
                  }}
                >
                  <tr>
                    <th style={{ width: "20%" }}>Product</th>
                    <th style={{ width: "45%" }}>Brief Description</th>
                    <th style={{ width: "10%" }}>Cost</th>
                  </tr>
                </thead>

                <tbody>{tableRows}</tbody>
              </table>
            </Col>
          </div>
        </div>
        <Row className="rowSeprator" style={{ padding: "0 0.6em" }}>
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
              Submit
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

Step5.propTypes = {};

export default Step5;
