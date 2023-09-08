import React, { useEffect, useState } from 'react'
import Card from './Card'
import Navbar from './Navbar'
import axios from "axios";

const Chart = () => {
  const [messgaes, setmessgaes] = useState()
  const [formVisible, setFormVisible] = useState(false)

  const [newMessage, setNewMessage] = useState({
    text: null,
    file: null
  })

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

  console.log(messgaes)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('audioFile', newMessage.file);
    formData.append('textMessage', newMessage.text);
    fetch('http://localhost:9000/api/insert-message', {
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
            <input type="text" value={newMessage?.Keyword} onChange={(e) => { setNewMessage({ ...newMessage, Keyword: e.target.value }) }} id="message" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Keyword" required />
          </div>
          <div class="mb-6">
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Audio</label>
            <input type="text" value={newMessage?.audio} onChange={(e) => { setNewMessage({ ...newMessage, audio: e.target.value }) }} id="message" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Audio" required />
          </div>
          <div class="mb-6">
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Message</label>
            <input type="text" value={newMessage?.message} onChange={(e) => { setNewMessage({ ...newMessage, message: e.target.value }) }} id="message" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Message" required />
          </div>
          <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Audio File</label>
            <input type="file" onChange={(e) => { setNewMessage({ ...newMessage, file: e.target.files[0] }) }} id="file" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className='flex justify-end'>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </div>
        </form>
      </div>

      <div className='p-5'>
        {
          messgaes?.length > 1 && <>
            <Card id={messgaes[0]?.id} count={messgaes[0]?.count} parent_id={messgaes[0]?.parent_id} keyword={messgaes[0]?.keyword}  audio={messgaes[0]?.audio} message={messgaes[0]?.message} index='0' />
            <div className="flex gap-2 mb-5 items-center ml-4">
              <p className='font-bold text-sm'>Response Time</p>
              <p className='bg-indigo-500 py-1 px-3 rounded'>05 s </p>
            </div>

            <Card message={messgaes[1]?.textMessage} index='1' />
            <div className='flex'>
              <Card index='2' id={messgaes[0]?.id} parent_id={messgaes[0]?.parent_id} keyword={messgaes[0]?.keyword}  audio={messgaes[0]?.audio} message={messgaes[2]?.textMessage} marginLeft='205px' background='rgb(88 154 176)' color='white' />
              <Card index='3' id={messgaes[0]?.id} parent_id={messgaes[0]?.parent_id} keyword={messgaes[0]?.keyword}  audio={messgaes[0]?.audio} message={messgaes[3]?.textMessage} marginLeft='20px' background='rgb(88 154 176)' color='white' />
              <Card index='4' id={messgaes[0]?.id} parent_id={messgaes[0]?.parent_id} keyword={messgaes[0]?.keyword}  audio={messgaes[0]?.audio} message='Transferring the call' para='0974-363434234' marginLeft='20px' background='rgb(88 154 176)' color='white' />
            </div>
            <div className='flex'>
              <Card index='5' id={messgaes[0]?.id} parent_id={messgaes[0]?.parent_id} keyword={messgaes[0]?.keyword}  audio={messgaes[0]?.audio} message={messgaes[4]?.textMessage} background='#0F2C35' marginLeft='205px' color='white' />
              <Card index='6' id={messgaes[0]?.id} parent_id={messgaes[0]?.parent_id} keyword={messgaes[0]?.keyword}  audio={messgaes[0]?.audio} message={messgaes[5]?.textMessage} background='#0F2C35' marginLeft='20px' color='white' />
              <Card index='7' id={messgaes[0]?.id} parent_id={messgaes[0]?.parent_id} keyword={messgaes[0]?.keyword}  audio={messgaes[0]?.audio} message={messgaes[6]?.textMessage} background='#0F2C35' marginLeft='20px' color='white' />
            </div>
            <div className='flex'>
              <Card index='8' id={messgaes[0]?.id} parent_id={messgaes[0]?.parent_id} keyword={messgaes[0]?.keyword}  audio={messgaes[0]?.audio} message={messgaes[7]?.textMessage} background='#A8C5CE' marginLeft='205px' color='white' />
              <Card index='9' id={messgaes[0]?.id} parent_id={messgaes[0]?.parent_id} keyword={messgaes[0]?.keyword}  audio={messgaes[0]?.audio} message={messgaes[8]?.textMessage} background='#A8C5CE' marginLeft='20px' color='white' />
            </div>
            <div className='flex'>
              <Card index='10' id={messgaes[0]?.id} parent_id={messgaes[0]?.parent_id} keyword={messgaes[0]?.keyword}  audio={messgaes[0]?.audio} message={messgaes[9]?.textMessage} marginLeft='205px' background='#649F91' color='white' />
            </div>
            <div className='flex'>
              <Card index='10' id={messgaes[0]?.id} parent_id={messgaes[0]?.parent_id} keyword={messgaes[0]?.keyword}  audio={messgaes[0]?.audio} background='rgb(88 154 176)' message='Cannot hear you' para='Cannot Hear you' marginLeft='205px' background='#649F91' color='white' />
            </div>
            <div className='flex'>
              <p className='ml-56'>Wait three seconds</p>
            </div>
            <div className='flex'>
              <Card index='10' id={messgaes[0]?.id} parent_id={messgaes[0]?.parent_id} keyword={messgaes[0]?.keyword}  audio={messgaes[0]?.audio} message='Yes' para='Move back to Sales Pitch' marginLeft='205px' background='#0F2C35' color='white' />
            </div>
            <div className='flex'>
              <Card index='10' id={messgaes[0]?.id} parent_id={messgaes[0]?.parent_id} keyword={messgaes[0]?.keyword}  audio={messgaes[0]?.audio} message='No' para='Call Ends' marginLeft='205px' background='#A8C5CE' color='white' />
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default Chart