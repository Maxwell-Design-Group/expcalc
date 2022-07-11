import aramarkLogo from "../../assets/img/aramarkLogo.png";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "abc@infovision.com",
      password: "abcdef",
    };
  }
  handleSubmit() {
    this.props.history.push({
      pathname: "/dashboard",
    });
  }
  render() {
    return (
      <>
        <div>
          <Row>
            <Col md={4}></Col>
            <Col md={4}>
              <div className="loginpage">
                <br />
                <br />
                <br />
                <br />
                <img
                  src={aramarkLogo}
                  alt="aramarkIcon"
                  height="20%"
                  width="20%"
                />
                <h3>Log in to your account</h3>
                <p>welcome back!Please enter your details</p>
                <form
                  className="loginform"
                  onSubmit={this.handleSubmit.bind(this)}
                >
                  <label htmlFor="">Email</label>
                  <input
                    className="forminput rounded border-1"
                    name="email"
                    value={this.state.email}
                    type="Email"
                    placeholder="Enter Your Email"
                    // onChange={handleInputChange}
                  />
                  <br />
                  <label htmlFor="">Password</label>
                  <input
                    className="forminput rounded border-1"
                    name="password"
                    value={this.state.password}
                    type="Password"
                    placeholder="Password"
                    // onChange={this.handleInputChange}
                  />
                  <br />
                  <div
                    className="radioButton"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                      />
                      <label class="form-check-label" for="flexCheckChecked">
                        &nbsp;Remember me
                      </label>
                    </div>
                    <a href="">forgot password</a>
                  </div>
                  <br />
                  <button
                    className="Signinbutton  rounded border-0"
                    onClick={this.handleSubmit}
                  >
                    Sign In
                  </button>
                  <br />
                </form>
                <div className="signuplink">
                  <p>Don't Have an account?</p>
                  &nbsp;
                  <a href="">Sign up</a>
                </div>
              </div>
            </Col>
            <Col md={4}></Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Login;
// const Login = () => {
//   const navigate = useNavigate();
//   const [state, setState] = useState({
//     email: "",
//     password: "",
//   });

//   const { email, password } = state;

//   const handleInputChange = (e) => {
//     let { name, value } = e.target;
//     setState({ ...state, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate("/dashboard");
//   };

//   return (
//     <div className="loginpage">
//       <br />
//       <br />
//       <br />
//       <br />
//       <img src={aramarkLogo} alt="aramarkIcon" height="20%" width="20%" />
//       <h3>Log in to your account</h3>
//       <p>welcome back!Please enter your details</p>
//       <form className="loginform" onSubmit={handleSubmit}>
//         <label htmlFor="">Email</label>
//         <input
//           className="forminput rounded border-1"
//           name="email"
//           value={email}
//           type="Email"
//           placeholder="Enter Your Email"
//           onChange={handleInputChange}
//         />
//         <br />
//         <label htmlFor="">Password</label>
//         <input
//           className="forminput rounded border-1"
//           name="password"
//           value={password}
//           type="Password"
//           placeholder="Password"
//           onChange={handleInputChange}
//         />
//         <br />
//         <div
//           className="radioButton"
//           style={{ display: "flex", justifyContent: "space-between" }}
//         >
//           <div>
//             <input
//               class="form-check-input"
//               type="checkbox"
//               value=""
//               id="flexCheckChecked"
//             />
//             <label class="form-check-label" for="flexCheckChecked">
//               &nbsp;Remember me
//             </label>
//           </div>
//           <a href="">forgot password</a>
//         </div>
//         <br />
//         <button
//           className="Signinbutton  rounded border-0"
//           onClick={handleSubmit}
//         >
//           Sign In
//         </button>
//         <br />
//       </form>
//       <div className="signuplink">
//         <p>Don't Have an account?</p>
//         &nbsp;
//         <a href="">Sign up</a>
//       </div>
//     </div>
//   );
// };

// export default Login;
