import React from "react";

const OpenComplaints = ({ complaintData }) => {
  return (
    <div>
      <table>
        <tr>
          <th>Account</th>
          <th>Council District</th>
          <th>Complaint Type</th>
          <th>Descriptor</th>
          <th>Zip</th>
          <th>Borough</th>
          <th>City</th>
          <th>Community Board</th>
          <th>Opendate</th>
          <th>Closedate</th>
        </tr>
        {complaintData.map((ele) => {
          return (
            <tr>
              <td>{ele.account}</td>
              <td>{ele.council_dist}</td>
              <td>{ele.complaint_type}</td>
              <td>{ele.descriptor}</td>
              <td>{ele.zip}</td>
              <td>{ele.borough}</td>
              <td>{ele.city}</td>
              <td>{ele.community_board}</td>
              <td>{ele.opendate}</td>
              <td>{ele.closedate}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default OpenComplaints;
