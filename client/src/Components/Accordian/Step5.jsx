import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { prevAccordionOpen } from "../../Redux/Actions";
import "./Step5.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "react-bootstrap/Table";
const Step5 = (props) => {
  const tableRows = [];
  const supportingFeatures = [];
  const [checked, setChecked] = useState(false);
  const [expand, setExpand] = useState(false);
  const [featureChecked, setFeatureChecked] = useState(false);
  const [userSelectedProducts, setUserSelectedProducts] = useState([]);
  const [userSelectedFeatures, setUserSelectedFeatures] = useState([]);
  const dispatch = useDispatch();
  const { masterData } = useSelector((state) => state.Master);
  const { accordianId } = useSelector((state) => state.Reducer);
  const { themes } = useSelector((state) => state.Reducer);
  const { isMobileView = false } = props;
  const tableData2 = [];

  let supportingFeatureData = [];
  if (masterData.supportingfeature) {
    supportingFeatureData = masterData.supportingfeature;
  }
  const onPrevious = (id) => {
    dispatch(prevAccordionOpen(id));
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
  function onAccordianChange(params) {
    setExpand(!expand);
  }
  return (
    <>
      {/* <div className="stepOne">
        <Row className="pos_row ">
          <div className="pos_container">
            <Row>
              <Col md={3}>
                <div className="pos">
                  <span className="pos_label">POS</span>
                </div>
              </Col>
              <Col md={9}>
                {" "}
                <div class="pos_btn">
                  <input
                    type="radio"
                    id="a25"
                    name="check-substitution-2"
                    value="Dish $2345"
                  />
                  <label class="btn btn-default" for="a25">
                    Dish $2345
                  </label>
                </div>
                <div class="pos_btn">
                  <input
                    type="radio"
                    id="a50"
                    name="check-substitution-2"
                    value="365 Retail $3445"
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
                    value="Micros $5345"
                  />
                  <label class="btn btn-default" for="a75">
                    Micros $5345
                  </label>
                </div>
              </Col>
            </Row>
          </div>
        </Row>
        <Row className="sf_row">
          <div className="pos_container">
            <Row>
              <Col md={3}>
                <div className="pos">
                  <span className="pos_label">Supporting Features</span>
                </div>
              </Col>
              <Col md={9}> {supportingFeatures}</Col>
            </Row>
          </div>
        </Row>

        <Row className="like_row">
          <div className="like_container" style={{ marginBottom: "2em" }}>
            <Row>
              <Col md={3}>
                <div className="like">
                  <span className="like_label">You may also like</span>
                </div>
              </Col>
              <Col md={9} style={{ overflowY: "scroll" }}>
                <table
                  style={{ width: "90%", top: "2em", position: "absolute" }}
                  className="product_tbl "
                >
                  {" "}
                  <thead>
                    <tr style={{ borderBottom: "1px solid #CFCFCF" }}>
                      <th>Product</th>
                      <th>Brief Description</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody> {tableRows}</tbody>
                </table>
              </Col>
            </Row>
          </div>
        </Row>
        <Row className="rowSeprator" style={{ padding: "0 0.6em" }}>
          <Col md={6} style={{ textAlign: "left" }}>
            <Button
              variant="contained"
              size="small"
              type="submit"
              className="previous_btn"
              onClick={() => onPrevious(accordianId - 1)}
            >
              Previous
            </Button>
          </Col>
        </Row>
      </div> */}

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
            <div class="pos_btn">
              <input
                type="radio"
                id="a25"
                name="check-substitution-2"
                value="Dish $2345"
              />
              <label class="btn btn-default" for="a25">
                Dish $2345
              </label>
            </div>
            <div class="pos_btn">
              <input
                type="radio"
                id="a50"
                name="check-substitution-2"
                value="365 Retail $3445"
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
                value="Micros $5345"
              />
              <label class="btn btn-default" for="a75">
                Micros $5345
              </label>
            </div>
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
              onClick={() => onPrevious(accordianId - 1)}
            >
              Previous
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

Step5.propTypes = {};

export default Step5;
