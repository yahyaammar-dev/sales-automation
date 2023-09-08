import React, { useState } from "react";
import axios from "axios";

const Card = ({ id, count, parent_id, keyword, audio, message = 'No Response', para = 'No Response', lineBottom, marginLeft, background, color, index }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  let indexInt = parseInt(index, 10);
  const [cardData, setCardData] = useState({
    id: id,
    count: count,
    parent_id: parent_id,
    keyword: keyword,
    audio: audio,
    message: message,
    para: para,
    index: index
  })

  const handleOpenEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleUploadAudioFile = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseUpload = () => {
    setIsUploadModalOpen(false);
  };


  const handleChangeText = () => {
    // let data = { currentMessage, currentPara, index }
    axios.post('http://localhost:9000/api/edit-text-message', cardData)
      .then((res) => {
        console.log(res.data)
        alert('Your data has been saved')
      })
      .catch((err) => {
        console.log(err)
      })
  }


  const handleUploadFile = () => {
    if (!file) {
      console.log('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('sales_automation_messages', file);

    fetch('http://localhost:9000/api/upload-audio', {
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

    setIsUploadModalOpen(false);
    alert('Uploaded Successfully');
  };

  const [currentMessage, setCurrentMessage] = useState(message)
  const [currentPara, setCurrentPara] = useState(para)


  return (
    <div
      className="w-2/12 card p-5 rounded mb-5"
      style={{ marginLeft: marginLeft, background: background }}
    >
      <div className={lineBottom ? "container" : ""}>
        <p className="card__para" style={{ color: color }}>
          Count: {count}
        </p>
        <p className="card__para" style={{ color: color }}>
          parent_id: {parent_id}
        </p>
        <p className="card__para" style={{ color: color }}>
          keyword: {keyword}
        </p>
        <p className="card__para" style={{ color: color }}>
          Audio: {audio?.substr(1,15)}
        </p>
        <h2 className="card__heading" style={{ color: color }}>
          Message: {message}
        </h2>
        <div className="flex justify-end gap-3">
          {/* Step 3: Add the modal trigger buttons */}
          <button
            onClick={handleOpenEdit}
            className="icon block text-white font-medium rounded-lg text-sm text-center"
          >
            <img src="/imgs/edit.svg" />
          </button>
          {/* <button
            onClick={handleUploadAudioFile}
            className="icon block text-white font-medium rounded-lg text-sm text-center"
          >
            <img src="/imgs/microphone.svg" />
          </button> */}
        </div>
      </div>

      {isEditModalOpen && (
        <div
          id="defaultModal"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60"
        >
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Modal
            </h3>
            <div>
              <p>Enter count</p>
              <input
                type="text"
                id="count"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={cardData?.count}
                onChange={(e) => { setCardData({ ...cardData, count: e.target.value }) }}
                required
              />
              <p>Enter Parent_id</p>
              <input
                type="text"
                id="parent_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={cardData?.parent_id}
                onChange={(e) => { setCardData({ ...cardData, parent_id: e.target.value }) }}
                required
              />
              <p>Enter Keyword</p>
              <input
                type="text"
                id="keyword"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={cardData?.keyword}
                onChange={(e) => { setCardData({ ...cardData, keyword: e.target.value }) }}
                required
              />
              <p>Enter Message</p>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="file_input"
                type="text"
                value={cardData?.message}
                onChange={(e) => { setCardData({ ...cardData, message: e.target.value }) }}
              />
              <p>Enter Audio</p>
              <input
                class="mb-2 px-1 py-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                onChange={(e) => { setFile(e.target.files[0]) }}
              />


            </div>

            <button
              onClick={handleCloseEdit}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Close
            </button>

            <button
              onClick={() => {
                handleCloseEdit()
                handleChangeText()
              }
              }
              className="ml-3 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Save
            </button>


          </div>
        </div>
      )}

      {isUploadModalOpen && (
        <div
          id="defaultModal"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60"
        >
          {/* Placeholder UI for the upload modal */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Upload Your Audio File
            </h3>

            <input
              class="my-5 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              onChange={(e) => { setFile(e.target.files[0]) }}
            />

            <button
              onClick={handleCloseUpload}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Close
            </button>

            <button
              onClick={handleUploadFile}
              className="ml-3 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Upload
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Card;