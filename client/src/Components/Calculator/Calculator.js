import React from "react";
import "./Calculator.css";

const Calculator = () => {
  return (
    <>
      <div className="calculator-main-container">
        <h5 className="dashboard-calculator-heder">ESTIMATED COSTS</h5>
        <p className="dashboard-calculator-text">ACME Insurance Ltd.</p>
        <div className="dashboard-calculator-cap-ex">
          <div className="calculator-dollar-sign">
            <div className="cal-dollar-sign">$</div>
          </div>
          <p className="calculator-cap-label cap-margin mt-10">Cap Ex</p>
          <p className="calculator-cap-price cap-margin">$0</p>
        </div>
        <div className="dashboard-calculator-cap-ex">
          <div className="calculator-dollar-sign">
            <div className="cal-dollar-sign">$</div>
          </div>
          <p className="calculator-cap-label cap-margin mt-10">Cap Ex</p>
          <p className="calculator-cap-price cap-margin">$0</p>
        </div>
        <div className="total-cost">$0</div>
      </div>
    </>
  );
};

export default Calculator;
