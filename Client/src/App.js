import AOS from "aos";
import "./App.css";
import Landing from "./Components/Accordion/Landing";
import {
  Redirect,
  Route,
  Switch,
  withRouter,
  BrowserRouter,
} from "react-router-dom";
import routes from "../src/views";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  AOS.init();
  return (
    <div className="App">
      <ToastContainer
        style={{
          alignItems: "center",
          fontSize: "small",
          width: "auto",
          maxHeight: "1em",
        }}
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Switch>
          {routes.map((page, key) => (
            <Route path={page.path} component={page.component} key={key} />
          ))}
          <Redirect to="/home" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
