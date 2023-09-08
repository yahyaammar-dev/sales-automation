import React, { useEffect, useState } from 'react'
import axios from "axios"
import Button from './Button'

const Block = ({ isGroupAdded, setIsGroupAdded }) => {
  const [groupName, setGroupName] = useState();

  const handleGroup = () => {
    axios
      .post("http://16.163.178.109:9001/api/create-group", {
        name: groupName,
        phoneNumbers: [],
      })
      .then((response) => {
        setIsGroupAdded(!isGroupAdded)
        setGroupName()
        alert("Success: Group Created Successfully");
      });
  };

  return (
    <div className='bg-white shadow-md sm:rounded-lg flex justify-end p-8'>
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
          <Button disabled={!groupName} icon={'/imgs/plus.png'} onClick={handleGroup} text='Add Group' active />
        </div>
      </div>
    </div>
  )
}

export default Block