import React, { useState } from "react";
import Navbar from "./Navbar";
import Tabs from "./Tabs";
import Block from "./Block";
import Table from "./Table";
import GroupBlock from "./GroupBlock";
import GroupDetails from "../GroupDetails";
import TableDetail from "./TableDetails";

const Main = ({ group }) => {
  const currentPath = window.location.pathname;
  const [toggler, setToggler] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  // Extract the string after the last slash (/)
  const pathSegments = currentPath.split("/");
  const lastSegment = pathSegments[pathSegments.length - 2];

  return (
    <div className="mainBg p-5 h-screen">
      <Navbar />
      <Tabs />
      {group ? <GroupBlock
        setToggler={setToggler}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      /> : <Block />}
      {lastSegment == "group-details" ? (
        <TableDetail
          toggler={toggler}
          fromDate={fromDate}
          toDate={toDate}
        />
      ) : (
        <Table />
      )}
    </div>
  );
};

export default Main;
