import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from "react-router-dom";
import Button from "./Button";
import axios from "axios";

const apiURL = process.env.REACT_APP_BASE_URL_LIVE;


const Block = ({ group, setGroup, setToggler, toggler, fromDate, setFromDate, toDate, setToDate, filterData, setFilterData, allGroups, setAllGroups }) => {
  const [groupName, setGroupName] = useState();
  const [active, setActive] = useState(false)
  const [forwardNumber, setForwardNumber] = useState();
  const [chats, setAllChats] = useState(null);
  const [chatWithPhone, setChatWithPhone] = useState(null);
  const [transformedData, setTransfromedData] = useState();
  const [errorMessage, setErrorMessage] = useState(null)
  const [file, setFile] = useState(null)
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [concur, setConcur] = useState();
  const [trunkId, setTrunkId] = useState();

  let { id } = useParams();


  useEffect(() => {
    setSelectedGroupId(id)
    axios.get(`${apiURL}/api/concurrent-number`)
      .then((res) => {
        setConcur(res?.data?.concurrentNumber.con)
      })
      .catch((err) => {
        console.log(err)
      })

      axios.get(`${apiURL}/api/getSipSetting`).then((res) => {
        setTrunkId(res.data.data.UserName)
    }).catch((err) => {
        console.log("error ::", err)
    });
  }, [])

  // upload excel file

  const handleUploadFile = () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('excel_file', file);
    formData.append('id', id);

    fetch(`${apiURL}/api/upload-excel`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => console.log(response))
      .then((data) => {
      })
      .catch((error) => {
      });

    alert('Uploaded Successfully');
  };



  const handleGroup = () => {
    axios
      .post(`${apiURL}/api/create-group`, {
        name: groupName,
        phoneNumbers: [],
      })
      .then((response) => {
        alert("Success: Group Created Successfully");
      });
  };

  useEffect(() => {
    axios.get(`${apiURL}/api/groups`).then((response) => {
      setAllGroups(response.data.groups);
    });
  }, []);


  const firstData = () => {
    setAllGroups(null)
    setForwardNumber(null)
    axios.get(`${apiURL}/api/groups`).then((response) => {
      setAllGroups(response.data.groups);
    })
      .catch((err) => console.log(err.message));
    axios.get(`${apiURL}/api/forwarding`).then((response) => {
      // setForwardNumber(response.data.groups);
      setForwardNumber(response.data.forwardingNumbers[0].number);
    })
      .catch((err) => console.log(err));
  }


  useEffect(() => {
    firstData();

    // axios.get(`${apiURL}/api/concurrent-number`)
    //   .then((res) => {
    //     setConcur(res?.data?.concurrentNumber)
    //   })
    //   .catch((err) => {
    //   })

      console.log(active);
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
  


  function divideArrayIntoSubarrays(array, subarraySize) {
    const dividedArrays = [];

    for (let i = 0; i < array.length; i += subarraySize) {
      const subarray = array.slice(i, i + subarraySize);
      dividedArrays.push(subarray);
    }

    return dividedArrays;
  }


  // const handleCalling = () => {
  //   if(active){
  //     console.log('calls has been ended');
  //     setActive(false)
  //   }
  //   setActive(true)
  //   let phoneNumbers = [];
  //   allGroups?.filter((itm) => {
  //     if (selectedGroupId) {
  //       return itm?._id === selectedGroupId
  //     } else {
  //       return true;
  //     }
  //   }).forEach((group, index) => {
  //     group.phoneNumbers?.forEach((item, subIndex) => {
  //       if (item?.number) {
  //         phoneNumbers.push("96" + item?.number);
  //       } else {
  //         phoneNumbers.push("96" + item);
  //       }
  //     });
  //   });

  //   // there should be a loop here

  //   // console.log('---------------------------------------', phoneNumbers)
  //   // const subarraySize = 5; // Specify the size of each subarray
  //   // const dividedArrays = divideArrayIntoSubarrays(phoneNumbers, subarraySize);
  //   // console.log('***********', dividedArrays)

  //   let tempPhone = [
  //     {
  //       calls: "2",
  //       trunk: "1001",
  //       forward: forwardNumber,
  //     },
  //     phoneNumbers,
  //   ];

  //   axios
  //     .post(
  //       `${apiURL}/api/call-numbers`,
  //       tempPhone
  //     )
  //     .then((response) => alert('Calling Status Changed!'))
  //     .catch((err) => {
  //       setActive(false)
  //       alert('Something failed! Try again Later')
  //     })

  //     console.log(active);

  // };


  const handleCalling = () => {
    if (active) {
      axios
      .get(`${apiURL}/api/stop-calling`)
      .then((response) => alert('Calls have been ended'))
      .catch((err) => alert('Something failed! Try again Later'));
      setActive(false);
    } else {
      console.log("all group", allGroups)
      setActive(true);
      let phoneNumbers = [];
      allGroups?.filter((itm) => {
        if (selectedGroupId) {
          return itm?._id === selectedGroupId;
        } else {
          return true;
        }
      }).forEach((group, index) => {
        group.phoneNumbers?.forEach((item, subIndex) => {
          console.log("IN FOREACH",item.number)
          if (item?.number) {
            // phoneNumbers.push("96" + item?.number);
            phoneNumbers.push("98" + item?.number);
          } else {
            phoneNumbers.push("98" + item);
          }
        });
      });
  //concur
          // trunk: "SIP/trk-"+trunkId+"-t",
      //forwardNumber
      let tempPhone = [
        {
          calls: "1",
          trunk: "PJSIP/me-1003",          
          forward: "923066257058"
        },
        phoneNumbers,
      ];
  
      axios
        .post(`${apiURL}/api/call-numbers`, tempPhone)
        .then((response) => alert('Calling Status Changed!'))
        .catch((err) => {
          setActive(false);
          alert('Something failed! Try again Later');
        });
    }
  
    console.log(active);
  };
  
  const handleAddPhoneNumber = () => {

    setSelectedGroupId(id)
    if (!id || !phoneNumber) {
      alert("Please select a group and provide a phone number.", id, phoneNumber);
      return;
    }

    const newPhoneNumberData = {
      groupId: selectedGroupId,
      phoneNumber: phoneNumber,
      status: "calling", // Example status value
      duration: "10s", // Example duration value
      keyword: "yes", // Example keyword value
      answered: "yes", // Example answered value
    };

    axios
      .post(`${apiURL}/api/add-phone-number`, {
        groupId: selectedGroupId,
        phoneNumber: phoneNumber,
      })
      .then((response) => {
        console.log(response)
        firstData()
        alert("Successfully added a new phone number");
      });

    // Clear the input fields after adding the phone number
    // setSelectedGroupId("");
    setPhoneNumber("");
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    localStorage.setItem("toggle", !isChecked);
    setIsChecked(!isChecked);
    setToggler(!isChecked);
  };


  //from and to date filter handling here
  const filterHandler = () => {
    if (fromDate && toDate) {
      const filterResult = group?.phoneNumbers.filter(item => {
        const itemDate = moment(item?.createdAt).format('YYYY/MM/DD');
        return itemDate >= fromDate && itemDate <= toDate;
      });

      setFilterData(filterResult);
    }
  }


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
        {/* <div className="w-6/12">
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
        </div> */}
        <div className="w-6/12">
          <input
            type="text"
            placeholder="Add phone Number"
            className="group--block--input rounded"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="w-3/12">
          <Button text="Add Phone" onClick={handleAddPhoneNumber} active />
        </div>
        <div className="w-3/12">
        <button
      className={`btn btn-primary flex gap-1 p-2 rounded items-center w-full white-color`}
      onClick={handleCalling}
      style={{ background: active ?  'black' : '#256d85' }}
    >
      {active ? 'Stop Calling' : 'Start Calling'}
    </button>
          {/* <button className="btn btn-primary flex gap-1 p-2 rounded items-center   w-full white-color " style={{ background: active ? '#256d85' : 'black' }} onClick={handleCalling}>Start / Stop Calling</button> */}
        </div>
      </div>

      <div className="w-full flex gap-2 items-center">
        <div className="w-4/12 flex items-center">
          <p className="font-medium w-40 mr-4" style={{ textWrap: 'nowrap' }}>Upload Excel</p>
          <input
            type="file"
            className="group--block--input rounded w-1/2"
            id="file_input"
            onChange={(e) => { setFile(e.target.files[0]) }}
          />
        </div>

        <div className="w-2/12">
          <button onClick={() => { handleUploadFile() }} className="btn btn-primary flex gap-1 p-2 rounded items-center bg--active white-color button--main--color">Upload</button>
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
          <Button text="Filter" onClick={filterHandler} active />
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
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 absolute top-2 left-50" role="alert">
            <span class="font-medium">Danger alert!</span> {errorMessage}
          </div>
        </>
      }

    </div>
  );
};

export default Block;
