import React from "react";

const Toggle = ({ options, active, getComplaints }) => {
  return (
    <div id="toggle">
      {options.map((ele) => (
        <div
          className={
            "toggle-element " +
            (active === ele ? "toggle-element-selected" : "")
          }
          onClick={() => {
            getComplaints(ele);
          }}
        >
          {ele}
        </div>
      ))}
    </div>
  );
};

export default Toggle;
