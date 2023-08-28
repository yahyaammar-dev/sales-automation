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
  // Extract the string after the last slash (/)
  console.log("toggleer :::", toggler);
  const pathSegments = currentPath.split("/");
  const lastSegment = pathSegments[pathSegments.length - 2];
  return (
    <div className="mainBg p-5 h-screen">
      <Navbar />
      <Tabs />
      {group ? <GroupBlock setToggler={setToggler} /> : <Block />}
      {lastSegment == "group-details" ? (
        <TableDetail toggler={toggler} />
      ) : (
        <Table />
      )}
    </div>
  );
};

export default Main;
