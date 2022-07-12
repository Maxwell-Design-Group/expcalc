import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Dashboard = lazy(() => import("./Container/Dashboard"));

function App() {
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
      <Suspense
        fallback={
          <div style={{ textAlign: "center", marginTop: "20%" }}>
            {" "}
            <CircularProgress />
          </div>
        }
      >
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;