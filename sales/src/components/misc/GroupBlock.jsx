import React, { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";

const Block = () => {
  const [groupName, setGroupName] = useState();
  const [allGroups, setAllGroups] = useState();
  const [chats, setAllChats] = useState(null);
  const [chatWithPhone ,setChatWithPhone] = useState(null);
  const [transformedData, setTransfromedData] = useState()

  const handleGroup = () => {
    axios
      .post("http://16.163.178.109:9000/api/create-group", {
        name: groupName,
        phoneNumbers: [],
      })
      .then((response) => {
        alert("Success: Group Created Successfully");
      });
  };
  useEffect(() => {
    axios.get("http://16.163.178.109:9000/api/groups").then((response) => {
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

  useEffect(()=>{
    setChatWithPhone(updatedChats);
  },[chats]);

  const handleCalling = () => {
    let phoneNumbers = [];
    console.log(allGroups)
    allGroups.forEach((group, index) => {
      group.phoneNumbers?.forEach((item, subIndex) => {
        phoneNumbers.push(item.number)
      });
    });

let tempPhone  = [
  {
    "calls": "2",
    "trunk": "1001",
    "foward": '+923045584807'
  },
  phoneNumbers
]

    axios
      .post("https://www.aivoip.org/aivoip/autodial/dial_numbers.php", tempPhone)
      .then((response) => console.log(response));

    alert("Calling Phone Numbers, Status will be updated soon");
  };

  const handleAddPhoneNumber = () => {
    if (!selectedGroupId || !phoneNumber) {
      alert("Please select a group and provide a phone number.");
      return;
    }

    axios
      .post("http://16.163.178.109:9000/api/add-phone-number", {
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


  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <div className="bg-white shadow-md sm:rounded-lg flex justify-end p-8 flex-wrap gap-3">
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
        <div className="w-3/12 flex">
          <p className="font-medium">Phone No.</p>
          <input type="text" className="group--block--input rounded w-1/2" />
        </div>
        <div className="w-2/12">
          <p className="font-medium">Display Status</p>
        </div>
        <div className="w-2/12">
          <Button text="All" active />
        </div>
        <div className="w-2/12">
          <input
            type="text"
            className="group--block--input rounded"
            placeholder=" /  / "
          />
        </div>
        <div className="w-2/12">
          <img src="/imgs/calendar.svg" />
        </div>
        <div className="w-2/12">
          <input
            type="text"
            className="group--block--input rounded"
            placeholder=" /  / "
          />
        </div>
        <div className="w-2/12">
          <img src="/imgs/calendar.svg" />
        </div>
        <div className="w-2/12">
          <Button text="Filter" active />
        </div>
      </div>
    </div>
  );
};

export default Block;
