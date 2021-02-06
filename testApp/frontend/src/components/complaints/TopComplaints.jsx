import React from "react";

const TopComplaints = ({ topData }) => {
  return (
    <div>
      {" "}
      <table>
        <tr>
          <th>Complaint Type</th>
          <th>Complaint Count</th>
        </tr>
        {topData.map((ele) => {
          return (
            <tr>
              <td>{ele.complaint}</td>
              <td>{ele.occurrences}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TopComplaints;
