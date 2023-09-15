import React, { useEffect, useState } from 'react'
import Card from './Card'
import Navbar from './Navbar'
import axios from "axios";

const Chart = () => {
  const [messgaes, setMessages] = useState()
  useEffect(() => {
    axios.get('http://localhost:9001/api/messages')
      .then((res) => {
        setMessages(res.data.messages)
      })
      .catch((err)=>{
        console.log(err)
      })
  }, [])


  return (
    <div className='p-5 mainBg'>
      <Navbar />
      {
        messgaes?.length > 1 && <>
          <Card message={messgaes[0].primary} para={messgaes[0].secondary} index='0' id={messgaes[0]?._id} />
          <div className="flex gap-2 mb-5 items-center ml-4">
            <p className='font-bold text-sm'>Response Time</p>
            <p className='bg-indigo-500 py-1 px-3 rounded'>05 s </p>
          </div>

          <Card message={messgaes[1].primary} para={messgaes[1].secondary} index='1' id={messgaes[1]?._id} />
          <div className='flex'>
            <Card index='2' message={messgaes[2].primary} para={messgaes[2].secondary} id={messgaes[2]?._id} marginLeft='205px' background='rgb(88 154 176)' color='white' />
            <Card index='3' disabled message={messgaes[3].primary} para={messgaes[3].secondary} id={messgaes[3]?._id} marginLeft='20px' background='rgb(88 154 176)' color='white' />
            <Card index='4' message='Transferring the call' para='1612'  marginLeft='20px' background='rgb(88 154 176)' color='white' />
          </div>
          <div className='flex'>
            <Card index='5' message={messgaes[4].primary} para={messgaes[4].secondary} id={messgaes[4]?._id} background='#0F2C35' marginLeft='205px' color='white' />
            <Card index='6' message={messgaes[5].primary} para={messgaes[5].secondary} id={messgaes[5]?._id} background='#0F2C35' marginLeft='20px' color='white' />
            {/* <Card index='7' message={messgaes[6].primary} para={messgaes[6].secondary} id={messgaes[6]?._id} background='#0F2C35' marginLeft='20px' color='white' /> */}
          </div>
          <p className='ml-48'>If Client says Cannot hear you!</p>
          {/* <div className='flex'>
            <Card index='8' message={messgaes[7].primary} para={messgaes[7].secondary} id={messgaes[7]?._id} background='#A8C5CE' marginLeft='205px' color='white' />
            <Card index='9' message={messgaes[8].primary} para={messgaes[8].secondary} id={messgaes[8]?._id} background='#A8C5CE' marginLeft='20px' color='white' />
          </div> */}
          {/* <div className='flex'>
            <Card index='10' message={messgaes[9].primary} para={messgaes[9].secondary} id={messgaes[9]?._id} marginLeft='205px' background='#649F91' color='white' />
          </div> */}
          <div className='flex'>
            <Card index='6' background='rgb(88 154 176)'message={messgaes[6].primary} para={messgaes[6].secondary} id={messgaes[6]?._id} marginLeft='205px' background='#649F91' color='white' />
          </div>
          <div className='flex'>
            <p className='ml-56'>Wait three seconds</p>
          </div>
          <div className='flex'>
            <Card index='10' message='Yes' para='Move back to Sales Pitch' marginLeft='205px' background='#0F2C35' color='white' disabled />
          </div>
          <div className='flex'>
            <Card index='10' message='No' para='Call Ends' marginLeft='205px' background='#A8C5CE' color='white' disabled />
          </div>
        </>
      }
    </div>
  )
}

export default Chart