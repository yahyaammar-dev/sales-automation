
import React, { useState } from "react";
import axios from "axios";

const apiURL = process.env.REACT_APP_BASE_URL_LIVE;


const Card = ({ message, para, lineBottom, marginLeft, background, color, index, id, disabled }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');


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
    let data = { currentMessage, currentPara, index }
    data = { ...data, id: id }
    axios.post('https://api.aivoip.org/api/edit-text-message', data)
      .then((res) => {
        console.log('Response ::::', res.status)
        if (res.status == 200) {
          console.log(res.data)
          showToastMessage('Your data has been saved', 'success')
          window.location.reload();
        } else {
          showToastMessage("Failed to update your message", "warning")
          console.log('Response ::::', res.status)
        }
      }).catch((err) => {
        showToastMessage("Failed to update your message", "danger")

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
    formData.append('index', index);

    // console.log("file", file);
    // console.log("formData", formData);


    // fetch(`${apiURL}/api/upload-audio`, {
    //   method: 'POST',
    //   body: formData,
    // })
    fetch(`${apiURL}/api/upload-file`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => showToastMessage('Audio File Uploaded Successfully','success'))
      .then((data) => {
        console.log('Upload response:', data);
      })
      .catch((error) => {
        console.error('Error uploading audio:', error);
      });


    // fetch(`${APIURL}/api/upload-audio`, {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then((response) => alert('Audio File Uploaded Successfully') )
    //   .then((data) => {
    //     console.log('Upload response:', data);
    //   })
    //   .catch((error) => {
    //     console.error('Error uploading audio:', error);
    //   });

    setIsUploadModalOpen(false);
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
          {message}
        </p>
        <h2 className="card__heading" style={{ color: color }}>
          {para}
        </h2>
        {
          !disabled && <>
            <div className="flex justify-end gap-3">
              {/* Step 3: Add the modal trigger buttons */}
              <button
                onClick={handleOpenEdit}
                className="icon block text-white font-medium rounded-lg text-sm text-center"
              >
                <img src="/imgs/edit.svg" />
              </button>
              <button
                onClick={handleUploadAudioFile}
                className="icon block text-white font-medium rounded-lg text-sm text-center"
              >
                <img src="/imgs/microphone.svg" />
              </button>
            </div>
          </>
        }

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
              <input
                type="text"
                id="first_name"
                class="mb-2 mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={currentMessage}
                onChange={(e) => { setCurrentMessage(e.target.value) }}
                required
              />
              <input
                type="text"
                id="first_name"
                class="mt-2 mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={currentPara}
                onChange={(e) => { setCurrentPara(e.target.value) }}
                required
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
            <span className="text-xs text-red-500">Only audio files with the .sln extension are allowed to be submitted.</span>

            <input
              class="my-5 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              onChange={(e) => { setFile(e.target.files[0]) }}
            />

            {/* Your upload file UI components can go here */}
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