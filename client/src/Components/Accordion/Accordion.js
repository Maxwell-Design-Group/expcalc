import { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
class Accordion extends Component {
  isWinThemes(onSubmit) {
    return (
      <>
        <Row>
          <Col md={12}>
            <div className="body_header">
              <span>Win Themes</span>
            </div>
          </Col>
        </Row>
        <Row md={12} className="winThemes">
          <Col md={3}>
            <span>
              {" "}
              <label className="toggle-switch">
                {/* <input type="checkbox" checked={isToggled} onChange={onToggle} /> */}
                <input type="checkbox" />
                <span className="switch" />
              </label>
              Cost Consciousness
            </span>
          </Col>
          <Col md={3}>
            <span>
              {" "}
              <label className="toggle-switch">
                {/* <input type="checkbox" checked={isToggled} onChange={onToggle} /> */}
                <input type="checkbox" />
                <span className="switch" />
              </label>
              Operational results
            </span>
          </Col>
          <Col md={3}>
            <span>
              {" "}
              <label className="toggle-switch">
                {/* <input type="checkbox" checked={isToggled} onChange={onToggle} /> */}
                <input type="checkbox" />
                <span className="switch" />
              </label>
              Proactive innovation
            </span>
          </Col>

          <Col md={3}>
            <span>
              {" "}
              <label className="toggle-switch">
                {/* <input type="checkbox" checked={isToggled} onChange={onToggle} /> */}
                <input type="checkbox" />
                <span className="switch" />
              </label>
              Right team on the ground
            </span>
          </Col>
        </Row>
        <Row className="winThemes">
          <Col md={3}>
            <span>
              {" "}
              <label className="toggle-switch">
                {/* <input type="checkbox" checked={isToggled} onChange={onToggle} /> */}
                <input type="checkbox" />
                <span className="switch" />
              </label>
              Leadership visibility
            </span>
          </Col>
        </Row>
        <div style={{ textAlign: "center" }}>
          <Button
            style={{ background: "#FDF2E9", color: "#000" }}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </>
    );
  }
  collapse(e) {
    if (this.state.onClick) {
      this.state.onClick(this.state);
    }
  }
  render() {
    const { title, body, expand, onClick, bgColor, id, onSubmit } = this.props;

    if (id === 2) {
      return (
        <div style={{ marginBottom: "1em" }}>
          <dt
            className={expand ? "title is-expanded" : "title"}
            onClick={onClick}
            style={{ background: bgColor }}
          >
            {title}
          </dt>
          <div className={expand ? "content is-expanded" : "content"}>
            {this.isWinThemes(onSubmit)}
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ marginBottom: "1em" }}>
          <div
            className={expand ? "title is-expanded" : "title"}
            onClick={onClick}
            style={{ background: bgColor }}
          >
            <span className="isDataPresenty"></span>&nbsp;{title}
          </div>
          <dd className={expand ? "content is-expanded" : "content"}>
            <p>{body}</p>
          </dd>
        </div>
      );
    }
  }
}

export default Accordion;
