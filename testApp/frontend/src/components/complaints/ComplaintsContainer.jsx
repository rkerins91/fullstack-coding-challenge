import React, { useState } from "react";
import Toggle from "../Toggle";
import axios from "../../axios-instance";
import AllComplaints from "./AllComplaints";
import OpenComplaints from "./OpenComplaints";
import ClosedComplaints from "./ClosedComplaints";
import TopComplaints from "./TopComplaints";

const ComplaintsContainer = ({ token, userId }) => {
  const [all, setAll] = useState([]);
  const [open, setOpen] = useState([]);
  const [closed, setClosed] = useState([]);
  const [top, setTop] = useState([]);
  const [isAccount, setIsAccount] = useState(true);
  const [selectedComplaintSet, setSelectedComplaintSet] = useState("");
  const [selectedLocationSet, setSelectedLocationSet] = useState("");
  const complaintsSetToggle = ["All", "Open", "Closed", "Top"];
  const locationSetToggle = ["District", "Constituents"];

  const getComplaints = async (
    complaintType = "All",
    locationType = "District"
  ) => {
    setSelectedComplaintSet(complaintType);
    console.log("inGetComplaints");
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
    };
    const complaintSubObject = districtAPICalls[complaintType];

    const { data } = await axios.get(
      complaintSubObject.url,
      // { params: { userId } },
      {
        "Content-Type": "application/json",
        headers: { Authorization: `Token ${token}` },
      }
    );

    complaintSubObject.setMethod(data);
  };

  return (
    <div id="complaints-container">
      <div id="toggle-container">
        <Toggle options={complaintsSetToggle} getComplaints={getComplaints} />
        <Toggle options={locationSetToggle} />
      </div>
      <div id="complaints-table-container">
        {selectedComplaintSet === "All" && (
          <AllComplaints complaintData={all} />
        )}
        {selectedComplaintSet === "Open" && (
          <OpenComplaints complaintData={open} />
        )}
        {selectedComplaintSet === "Closed" && (
          <ClosedComplaints complaintData={closed} />
        )}
        {selectedComplaintSet === "Top" && (
          <TopComplaints complaintData={top} />
        )}
      </div>
    </div>
  );
};

export default ComplaintsContainer;
