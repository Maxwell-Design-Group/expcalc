import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../../Assets/Style/style.css";
import { nextAccordionOpen, prevAccordionOpen } from "../../Redux/Actions";

const Step4 = (props) => {
  const tableRows = [];
  const supportingFeatures = [];
  const [checked, setChecked] = useState(false);
  const [expand, setExpand] = useState(false);
  const [featureChecked, setFeatureChecked] = useState(false);
  const [userSelectedProducts, setUserSelectedProducts] = useState([]);
  const [userSelectedFeatures, setUserSelectedFeatures] = useState([]);
  const [digitalSinage50, setDigitalSinage50] = useState([]);
  const [digitalSinage55, setDigitalSinage55] = useState([]);
  const [digitalSinage65, setDigitalSinage65] = useState([]);
  const dispatch = useDispatch();
  const { accordianId } = useSelector((state) => state.Reducer);
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
  const handleChangeFeatures = (e, rowData, index) => {
    const { checked } = e.target;
    let features = userSelectedFeatures;
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

  supportingFeatureData.forEach((feature, index) => {
    supportingFeatures.push(
      <div class="catering sports" style={{ width: "158px" }}>
        <label>
          <input
            type="checkbox"
            value={feature.label}
            defaultChecked={featureChecked}
            onChange={(e) => handleChangeFeatures(e, feature, index)}
          />
          <span style={{ width: "158px" }}> {feature.label}</span>
        </label>
      </div>
    );
  });
  function onAccordianChange(params) {
    setExpand(!expand);
  }
  const onPrevious = (id) => {
    dispatch(prevAccordionOpen(id));
  };
  const selectNoOption = (id) => {
    dispatch(nextAccordionOpen(id));
  };
  return (
    <div className="stepOne">
      <Row className="pos_row ">
        <div className="pos_container">
          <Row>
            <Col md={3}>
              <div className="pos">
                <span className="pos_label">Digital Sinage</span>
              </div>
            </Col>
            <Col md={9}>
              {" "}
              <div class="ds_btn">
                <span
                  style={{ position: "absolute", top: "-24px", left: "24px" }}
                >
                  50&deg;
                </span>
                <input
                  type="text"
                  id="digitalSinage50"
                  value={digitalSinage50}
                  placeholder="Qty"
                  onChange={(e) => setDigitalSinage50(e.target.value)}
                />
              </div>
              <div class="ds_btn">
                <span
                  style={{ position: "absolute", top: "-24px", left: "24px" }}
                >
                  55&deg;
                </span>
                <input
                  type="text"
                  id="digitalSinage50"
                  placeholder="Qty"
                  value={digitalSinage55}
                  onChange={(e) => setDigitalSinage55(e.target.value)}
                />
              </div>
              <div class="ds_btn">
                <span
                  style={{ position: "absolute", top: "-24px", left: "24px" }}
                >
                  65&deg;
                </span>
                <input
                  type="text"
                  id="digitalSinage50"
                  placeholder="Qty"
                  value={digitalSinage65}
                  onChange={(e) => setDigitalSinage65(e.target.value)}
                />
              </div>
            </Col>
          </Row>
        </div>
      </Row>
      <Row className="sf_row">
        <div className="pos_container" style={{ marginBottom: "2em" }}>
          <Row>
            <Col md={3}>
              <div className="pos">
                <span className="pos_label">Catring</span>
              </div>
            </Col>
            <Col md={9}> {supportingFeatures}</Col>
          </Row>
        </div>
      </Row>

      <Row className="rowSeprator" style={{ padding: "0 0.3em" }}>
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
        <Col md={6} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            size="small"
            type="submit"
            className="next_btn"
            onClick={() => selectNoOption(accordianId + 1)}
          >
            Next
          </Button>
        </Col>
      </Row>
    </div>
  );
};

Step4.propTypes = {};

export default Step4;
