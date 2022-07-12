import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../../Assets/Style/style.css";
import { prevAccordionOpen } from "../../Redux/Actions";

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
    <div className="stepOne">
      {/* <Accordions
        onChange={onAccordianChange}
        id={"accordian"}
        expanded={expand}
      >
        <AccordionSummary
          expandIcon={
            expand === true ? (
              <RemoveCircleIcon style={{ margin: "-0.4em 0 0 0 !important" }} />
            ) : (
              <AddCircleIcon />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ flexDirection: "row-reverse", margin: "11px 0 0 0" }}
        >
          <Typography>Supporting Question?</Typography>
        </AccordionSummary>
        <AccordionDetails> */}
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
            <Col md={9}>
              <table
                style={{ width: "90%", top: "2em", position: "absolute" }}
                className="product_tbl"
              >
                <tr style={{ borderBottom: "1px solid #CFCFCF" }}>
                  <th>Product</th>
                  <th>Brief Description</th>
                  <th>Cost</th>
                </tr>

                {tableRows}
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
        {/* <Col md={6} style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  size="small"
                  type="submit"
                  className="next_btn"
                //   onClick={onThemeSelected}
                >
                  Next
                </Button>
              </Col> */}
      </Row>
      {/* </AccordionDetails>
      </Accordions> */}
    </div>
  );
};

Step5.propTypes = {};

export default Step5;
