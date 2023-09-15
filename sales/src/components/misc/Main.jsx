import React, { useEffect, useState } from "react";
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
  const [isGroupAdded, setIsGroupAdded] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [groups, setGroup] = useState();
  const [transformedData, setTransfromedData] = useState();
  const [filterData, setFilterData] = useState([]);
  const [allGroups, setAllGroups] = useState();

  // Extract the string after the last slash (/)
  const pathSegments = currentPath.split("/");
  const lastSegment = pathSegments[pathSegments.length - 2];

  useEffect(()=>{
    console.log('All groups have been changed')
  }, [allGroups, setAllGroups])


  return (
    <div className="mainBg p-5 h-screen">
      <Navbar />
      <Tabs />
      {group ? <GroupBlock
        setToggler={setToggler}
        toggler={toggler}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        group={groups}
        setGroup={setGroup}
        filterData={filterData} setFilterData={setFilterData}
        setAllGroups={setAllGroups}
        allGroups={allGroups}

      /> : <Block isGroupAdded={isGroupAdded} setIsGroupAdded={setIsGroupAdded} />}
      {lastSegment == "group-details" ? (
        <TableDetail
          toggler={toggler}
          fromDate={fromDate}
          toDate={toDate}
          group={groups}
          setGroup={setGroup}
          transformedData={transformedData}
          setTransfromedData={setTransfromedData}
          filterData={filterData}
          setFilterData={setFilterData}
          setAllGroups={setAllGroups}
          allGroups={allGroups}
        />
      ) : (
        <Table isGroupAdded={isGroupAdded} />
      )}
    </div>
  );
};

export default Main;