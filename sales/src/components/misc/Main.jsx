import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Tabs from "./Tabs";
import Block from "./Block";
import Table from "./Table";
import GroupBlock from "./GroupBlock";
import GroupDetails from "../GroupDetails";
import TableDetail from "./TableDetails";
import Toast from './Toast';

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
  const [active, setActive] = useState(false)

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');


  // Extract the string after the last slash (/)
  const pathSegments = currentPath.split("/");
  const lastSegment = pathSegments[pathSegments.length - 2];

  useEffect(()=>{
  }, [allGroups, setAllGroups])


  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    // Automatically hide the toast after a certain duration (e.g., 3 seconds)
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  return (
    <div className="mainBg p-5 h-screen">
      <Navbar />
      {/* Toast component displayed before the return statement */}
      <Toast message={toastMessage} type={toastType} showToast={showToast} closeToast={closeToast} />


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
        active={active}
        setActive={setActive}
        showToastMessage={showToastMessage} 
      /> : <Block isGroupAdded={isGroupAdded} setIsGroupAdded={setIsGroupAdded} showToastMessage={showToastMessage}  />}
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