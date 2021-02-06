import React, { useState } from "react";
import Toggle from "../Toggle";
import axios from "axios";
import Complaints from "./Complaints";
import OpenComplaints from "./OpenComplaints";
import ClosedComplaints from "./ClosedComplaints";
import TopComplaints from "./TopComplaints";

const ComplaintsContainer = ({ token, userId }) => {
  const [all, setAll] = useState([]);
  const [open, setOpen] = useState([]);
  const [closed, setClosed] = useState([]);
  const [top, setTop] = useState([]);
  const [constituent, setConstituent] = useState([]);
  const [selectedComplaintSet, setSelectedComplaintSet] = useState("");
  const [active, setActive] = useState("");
  const complaintsSetToggle = ["All", "Open", "Closed", "Top", "Constituent"];

  const getTopComplaints = (number, data) => {
    const array = [];
    for (let key in data) {
      array.push({ complaint: key, occurrences: data[key] });
    }

    return array.sort((a, b) => b.occurrences - a.occurrences).slice(0, number);
  };

  const getComplaints = async (complaintType = "All") => {
    setSelectedComplaintSet(complaintType);
    const districtAPICalls = {
      All: { url: "api/complaints/", setMethod: setAll },
      Open: {
        url: "api/complaints/openCases/",
        setMethod: setOpen,
      },
      Closed: {
        url: "api/complaints/closedCases/",
        setMethod: setClosed,
      },
      Top: {
        url: "api/complaints/topComplaints",
        setMethod: setTop,
      },
      Constituent: {
        url: "api/complaints/constituentComplaints",
        setMethod: setConstituent,
      },
    };
    const complaintSubObject = districtAPICalls[complaintType];
    const token = localStorage.getItem("token");
    const district = localStorage.getItem("district");
    const { data } = await axios.get(complaintSubObject.url, {
      "Content-Type": "application/json",
      headers: { Authorization: `Token ${token}` },
    });
    let filteredData;
    if (complaintType === "Top") {
      filteredData = getTopComplaints(3, data[district - 1]);
    } else if (complaintType === "Constituent") {
      filteredData = data.filter(
        (ele) => ele.council_dist?.slice(4) == district
      );
    } else {
      filteredData = data.filter((ele) => ele.account.slice(4) == district);
    }
    complaintSubObject.setMethod(filteredData);
    setActive(complaintType);
  };

  return (
    <div id="complaints-container">
      <div id="toggle-container">
        <Toggle
          options={complaintsSetToggle}
          getComplaints={getComplaints}
          active={active}
        />
      </div>
      <div id="complaints-table-container">
        {selectedComplaintSet === "All" && <Complaints complaintData={all} />}
        {selectedComplaintSet === "Open" && <Complaints complaintData={open} />}
        {selectedComplaintSet === "Closed" && (
          <Complaints complaintData={closed} />
        )}
        {selectedComplaintSet === "Top" && <TopComplaints topData={top} />}
        {selectedComplaintSet === "Constituent" && (
          <Complaints complaintData={constituent} />
        )}
      </div>
    </div>
  );
};

export default ComplaintsContainer;
