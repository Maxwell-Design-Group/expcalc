import React from "react";
import "./Resultset.css";

const Resultset = () => {
  return (
    <>
      <div className="dashboard-resultset-main-container">
        <h5 className="dashboard-resultset-heder">EXPORT RESULT SET</h5>
        <p className="dashboard-resultset-text">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr tempor
          invidunt.
        </p>
        <form>
          <div>
            <input
              className="dashboard-resultset-email-input"
              type="text"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <button
              className="dashboard-resultset-email-btn"
              type="button"
              class="next_btn btn btn-contained btn-small"
            >
              EMAIL ME THE ESTIMATES
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Resultset;
