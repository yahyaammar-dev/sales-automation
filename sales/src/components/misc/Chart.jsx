import React, { useEffect, useState } from 'react'
import Card from './Card'
import Navbar from './Navbar'
import axios from "axios";

const Chart = () => {
  const [messgaes, setmessgaes] = useState()
  const [formVisible, setFormVisible] = useState(false)
  const [file, setFile] = useState(null)
  const [newMessage, setNewMessage] = useState({
    count: null,
    parent_id: null,
    keyword: null,
    audio_file: null,
    text: null
  })
  // console.log(messgaes[0]._id);
  useEffect(() => {
    axios.get('http://localhost:9000/api/messages')
      .then((res) => {
        console.log(res.data)
        if (res.data.messages.length == 0) {
          setFormVisible(true)
        } else {
          setmessgaes(res.data.messages)
        }
      })
      .catch((err) => {
        console.log('Not able to find any messgaes', err)
      })
  }, [])



  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('audio_file', file);
    formData.append('count', newMessage.count);
    formData.append('parent_id', newMessage.parent_id);
    formData.append('keyword', newMessage.keyword);
    formData.append('text', newMessage.text);
   
    fetch('http://localhost:9000/api/messages', {
      method: 'POST',
      body: formData,
    })
      .then((response) => console.log(response))
      .catch((error) => {
        console.error('Error uploading audio:', error);
      });
    alert('Uploaded Successfully');
  }

  return (
    <div className='p-5'>
      <div className='mainBg p-5'>
        <Navbar />
      </div>

      <div className='w-50 p-5 mainBg'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div class="mb-6">
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Count</label>
            <input type="text" value={newMessage?.count} onChange={(e) => { setNewMessage({ ...newMessage, count: e.target.value }) }} id="message" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Count" required />
          </div>
          <div class="mb-6">
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Parent_id</label>
            <input type="text" value={newMessage?.parent_id} onChange={(e) => { setNewMessage({ ...newMessage, parent_id: e.target.value }) }} id="message" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Parent ID" required />
          </div>
          <div class="mb-6">
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Keyword</label>
            <input type="text" value={newMessage?.Keyword} onChange={(e) => { setNewMessage({ ...newMessage, keyword: e.target.value }) }} id="message" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Keyword" required />
          </div>
       
          <div class="mb-6">
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Message</label>
            <input type="text" value={newMessage?.message} onChange={(e) => { setNewMessage({ ...newMessage, text: e.target.value }) }} id="message" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Message" required />
          </div>
          <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Audio File</label>
            <input type="file" name='audio_file'  onChange={(e)=>{setFile(e.target.files[0])}} id="audio_file" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>

          
          <div className='flex justify-end'>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </div>
        </form>
      </div>

      <div className='p-5'>
        {
          messgaes?.length > 1 && <>
          {
            messgaes[0] && 
            <Card id={messgaes[0]?._id} count={messgaes[0]?.count} parent_id={messgaes[0]?.parent_id} keyword={messgaes[0]?.keyword}  audio={messgaes[0]?.uploadedFile} message={messgaes[0]?.text} index='0' />
          }
            <div className="flex gap-2 mb-5 items-center ml-4">
              <p className='font-bold text-sm'>Response Time</p>
              <p className='bg-indigo-500 py-1 px-3 rounded'>05 s </p>
            </div>

            {
              messgaes[1] && 
              <Card count={messgaes[1]?.count} parent_id={messgaes[1]?.parent_id} keyword={messgaes[1]?.keyword}  audio={messgaes[1]?.uploadedFile} message={messgaes[1]?.text} index='1' />
            } 
            <div className='flex'>
              {
                messgaes[2] && 
                <Card count={messgaes[2]?.count} index='2' id={messgaes[2]?._id} parent_id={messgaes[2]?.parent_id} keyword={messgaes[2]?.keyword}  audio={messgaes[2]?.uploadedFile} message={messgaes[2]?.text} marginLeft='205px' background='rgb(88 154 176)' color='white' />
              }
              {
                messgaes[3] && 
                <Card count={messgaes[3]?.count} index='3' id={messgaes[3]?._id} parent_id={messgaes[3]?.parent_id} keyword={messgaes[3]?.keyword}  audio={messgaes[3]?.uploadedFile} message={messgaes[3]?.text} marginLeft='20px' background='rgb(88 154 176)' color='white' />
              }
              {
                messgaes[4] && 
                <Card count={messgaes[4]?.count} index='4' id={messgaes[4]?._id} parent_id={messgaes[4]?.parent_id} keyword={messgaes[4]?.keyword}  audio={messgaes[4]?.audio} message={messgaes[4]?.text} para='0974-363434234' marginLeft='20px' background='rgb(88 154 176)' color='white' />
              }
            </div>
            <div className='flex'>
              {
                messgaes[5] && 
                <Card count={messgaes[5]?.count} index='5' id={messgaes[5]?._id} parent_id={messgaes[5]?.parent_id} keyword={messgaes[5]?.keyword}  audio={messgaes[5]?.uploadedFile} message={messgaes[5]?.text} background='#0F2C35' marginLeft='205px' color='white' />
              }
              {
                messgaes[6] && 
                <Card count={messgaes[6]?.count} index='6' id={messgaes[6]?._id} parent_id={messgaes[6]?.parent_id} keyword={messgaes[6]?.keyword}  audio={messgaes[6]?.uploadedFile} message={messgaes[6]?.text} background='#0F2C35' marginLeft='20px' color='white' />
              }
              {
                messgaes[7] &&
                <Card count={messgaes[7]?.count} index='7' id={messgaes[7]?._id} parent_id={messgaes[7]?.parent_id} keyword={messgaes[7]?.keyword}  audio={messgaes[7]?.uploadedFile} message={messgaes[7]?.text} background='#0F2C35' marginLeft='20px' color='white' />
              }
            </div>
            <div className='flex'>
              {
                messgaes[8] &&
                <Card count={messgaes[8]?.count} index='8' id={messgaes[8]?._id} parent_id={messgaes[8]?.parent_id} keyword={messgaes[8]?.keyword}  audio={messgaes[8]?.uploadedFile} message={messgaes[8]?.text} background='#A8C5CE' marginLeft='205px' color='white' />
              }
              {
                messgaes[9] &&
                <Card count={messgaes[9]?.count} index='9' id={messgaes[9]?._id} parent_id={messgaes[9]?.parent_id} keyword={messgaes[9]?.keyword}  audio={messgaes[9]?.uploadedFile} message={messgaes[9]?.text} background='#A8C5CE' marginLeft='20px' color='white' />
              }
            </div>
            <div className='flex'>
            {
              messgaes[10] &&
              <Card count={messgaes[10]?.count} index='10' id={messgaes[10]?._id} parent_id={messgaes[10]?.parent_id} keyword={messgaes[10]?.keyword}  audio={messgaes[10]?.uploadedFile} message={messgaes[10]?.text} marginLeft='205px' background='#649F91' color='white' />
            }
              </div>
            <div className='flex'>
              {
                messgaes[11] &&
                <Card count={messgaes[11]?.count} index='11' id={messgaes[11]?._id} parent_id={messgaes[11]?.parent_id} keyword={messgaes[11]?.keyword}  audio={messgaes[11]?.uploadedFile} background='rgb(88 154 176)' message={messgaes[11]?.text} para='Cannot Hear you' marginLeft='205px' background='#649F91' color='white' />
              }  
            </div>
            <div className='flex'>
              <p className='ml-56'>Wait three seconds</p>
            </div>
            <div className='flex'>
              {
                messgaes[12]
                &&
                <Card index='12' count={messgaes[12]?.count} id={messgaes[12]?._id} parent_id={messgaes[12]?.parent_id} keyword={messgaes[12]?.keyword}  audio={messgaes[12]?.uploadedFile} message={messgaes[12]?.text}  marginLeft='205px' background='#0F2C35' color='white' />
              }
            </div>
            <div className='flex'>
              {
                messgaes[13]
                &&
                <Card index='13' count={messgaes[13]?.count} id={messgaes[13]?._id} parent_id={messgaes[13]?.parent_id} keyword={messgaes[13]?.keyword}  audio={messgaes[13]?.uploadedFile} message={messgaes[13]?.text}  marginLeft='205px' background='#A8C5CE' color='white' />
              }
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default Chart