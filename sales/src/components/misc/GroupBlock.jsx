import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from "react-router-dom";
import Button from "./Button";
import axios from "axios";

const Block = ({ setToggler, fromDate, setFromDate, toDate, setToDate }) => {
  const [groupName, setGroupName] = useState();
  const [allGroups, setAllGroups] = useState();
  const [chats, setAllChats] = useState(null);
  const [chatWithPhone, setChatWithPhone] = useState(null);
  const [transformedData, setTransfromedData] = useState();
  const [errorMessage, setErrorMessage] = useState(null)
  const [file, setFile] = useState(null)

  let { id } = useParams();
  // upload excel file

  const handleUploadFile = () => {
    if (!file) {
      console.log('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('excel_file', file);
    formData.append('id', id);

    fetch('http://localhost:9000/api/upload-excel', {
      method: 'POST',
      body: formData,
    })
      .then((response) => console.log(response))
      .then((data) => {
        console.log('Upload response:', data);
      })
      .catch((error) => {
        console.error('Error uploading audio:', error);
      });

      alert('Uploaded Successfully');
  };



  const handleGroup = () => {
    axios
      .post("http://localhost:9000/api/create-group", {
        name: groupName,
        phoneNumbers: [],
      })
      .then((response) => {
        alert("Success: Group Created Successfully");
      });
  };
  useEffect(() => {
    axios.get("http://localhost:9000/api/groups").then((response) => {
      setAllGroups(response.data.groups);
    });
  }, []);

  // Function to extract the number inside the angle brackets from the clid property
  const extractNumberFromClid = (clid) => {
    const regex = /<(\d{1,})>/;
    const match = clid.match(regex);
    return match && match[1] ? match[1] : null;
  };

  // Update the clid property for each chat object
  const updatedChats = chats?.map((chat) => {
    const extractedNumber = extractNumberFromClid(chat.clid);
    return {
      ...chat,
      clid: extractedNumber ? extractedNumber : chat.clid,
    };
  });

  useEffect(() => {
    setChatWithPhone(updatedChats);
  }, [chats]);

  const handleCalling = () => {
    let phoneNumbers = [];
    console.log(allGroups);
    allGroups.forEach((group, index) => {
      group.phoneNumbers?.forEach((item, subIndex) => {
        phoneNumbers.push("96" + item.number);
      });
    });

    let tempPhone = [
      {
        calls: "2",
        trunk: "1001",
        forward: "+923045584807",
      },
      phoneNumbers,
    ];

    axios
      .post(
        "https://www.aivoip.org/aivoip/autodial/dial_numbers.php",
        tempPhone
      )
      .then((response) => console.log(response));

    alert("Calling Phone Numbers, Status will be updated soon");
  };

  const handleAddPhoneNumber = () => {
    if (!selectedGroupId || !phoneNumber) {
      alert("Please select a group and provide a phone number.");
      return;
    }

    axios
      .post("http://localhost:9000/api/add-phone-number", {
        groupId: selectedGroupId,
        phoneNumber: phoneNumber,
      })
      .then((response) => {
        console.log(response);
        alert("Successfully added a new phone number");
      });

    // Log the group ID and phone number to the console
    console.log("Group ID:", selectedGroupId);
    console.log("Phone Number:", phoneNumber);

    // Clear the input fields after adding the phone number
    setSelectedGroupId("");
    setPhoneNumber("");
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    localStorage.setItem("toggle", !isChecked);
    setIsChecked(!isChecked);
    setToggler(!isChecked);
  };

  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <div className="bg-white shadow-md sm:rounded-lg flex justify-end p-8 flex-wrap gap-3" data-testid="groupBlockContainer">
     
      <div className="w-full flex gap-2 items-center">
        <div className="w-2/12">
          <p className="font-medium">Group Name</p>
        </div>
        <div className="w-8/12">
          <input
            type="text"
            className="group--block--input rounded"
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
          />
        </div>
        <div className="w-2/12">
          <Button text="Add Group" onClick={handleGroup} active />
        </div>
      </div>

      <div className="w-full flex gap-2 items-center">
        {/* <div className="w-2/12">
                    <Button text='Upload Phone .xls' active />
                </div> */}
        <div className="w-6/12">
          {/* Select box to display all group names */}
          <select
            className="group--block--input rounded"
            value={selectedGroupId}
            onChange={(e) => setSelectedGroupId(e.target.value)}
          >
            <option value="">Select a Group</option>
            {allGroups?.map((group) => (
              <option key={group._id} value={group._id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-3/12">
          <input
            type="text"
            className="group--block--input rounded"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="w-3/12">
          <Button text="Add Phone" onClick={handleAddPhoneNumber} active />
        </div>
        <div className="w-3/12">
          <Button onClick={handleCalling} text="Start / Stop Calling" active />
        </div>
      </div>

      <div className="w-full flex gap-2 items-center">
        <div className="w-4/12 flex items-center">
          <p className="font-medium w-40 mr-4" style={{ textWrap: 'nowrap' }}>Upload Excel</p>
          <input 
            type="file" 
            className="group--block--input rounded w-1/2"
            id="file_input"
            onChange={(e)=>{setFile(e.target.files[0])}}
            />
        </div>

        <div className="w-2/12">
          <button onClick={()=>{handleUploadFile()}} className="btn btn-primary flex gap-1 p-2 rounded items-center bg--active white-color button--main--color">Upload</button>
        </div>
        <div className="w-2/12">
          <input
            type="text"
            name="fromDate"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="group--block--input rounded"
            placeholder="YYYY/MM/DD"
          />
        </div>
        <div className="w-2/12">
          <DatePicker
            customInput={<img src="/imgs/calendar.svg" style={{ width: "2rem", height: "2rem" }} />}
            maxDate={new Date()}
            onChange={(date) => setFromDate(moment(date).format('YYYY/MM/DD'))}
          />
        </div>
        <div className="w-2/12">
          <input
            type="text"
            name="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="group--block--input rounded"
            placeholder="YYYY/MM/DD"
          />
        </div>
        <div className="w-2/12" >
          <DatePicker
            customInput={<img src="/imgs/calendar.svg" style={{ width: "2rem", height: "2rem" }} />}
            maxDate={new Date()}
            onChange={(date) => {
              setToDate(moment(date).format('YYYY/MM/DD'))
            }}
          />
        </div>
        <div className="w-2/12">
          <Button text="Filter" active />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={isChecked}
              onChange={handleToggle}
            />
            <div
              className={`block bg-gray-600 w-10 h-6 rounded-full transition ${isChecked ? "bg-green-500" : "bg-gray-600"
                }`}
            ></div>
            <div
              className={`dot absolute  top-1 w-4 h-4 rounded-full transition ${isChecked ? "bg-white left-5" : "bg-gray-400 left-1"
                }`}
            ></div>
          </div>
          <div className="ml-3 text-gray-700 font-medium">Filter Answered</div>
        </label>
      </div>

      {
        errorMessage && <>
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 absolute top-2 left-50"  role="alert">
            <span class="font-medium">Danger alert!</span> {errorMessage}
          </div>
        </> 
      }

    </div>
  );
};

export default Block;
