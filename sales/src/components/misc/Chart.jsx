import React, { useEffect, useState } from 'react'
import Card from './Card'
import Navbar from './Navbar'
import axios from "axios";

const Chart = () => {
  const [messgaes, setMessages] = useState()
  useEffect(() => {
    axios.get('http://localhost:9000/api/messages')
      .then((res) => {
        setMessages(res.data.messages[0].messages)
      })
  }, [])

  return (
    <div className='p-5 mainBg'>
      <Navbar />
      {
        messgaes?.length > 1 && <>
          <Card message={messgaes[0]['primary']} para={messgaes[0]['seconday']} index='0' />
          <div className="flex gap-2 mb-5 items-center ml-4">
            <p className='font-bold text-sm'>Response Time</p>
            <p className='bg-indigo-500 py-1 px-3 rounded'>05 s </p>
          </div>

          <Card message={messgaes[1]['primary']} para={messgaes[1]['seconday']} index='1' />
          <div className='flex'>
            <Card index='2' message={messgaes[2]['primary']} para={messgaes[2]['seconday']} marginLeft='205px' background='rgb(88 154 176)' color='white' />
            <Card index='3' message={messgaes[3]['primary']} para={messgaes[3]['seconday']} marginLeft='20px' background='rgb(88 154 176)' color='white' />
            <Card index='4' message='Transferring the call' para='0974-363434234' marginLeft='20px' background='rgb(88 154 176)' color='white' />
          </div>
          <div className='flex'>
            <Card index='5' message={messgaes[4]['primary']} para={messgaes[4]['seconday']} background='#0F2C35' marginLeft='205px' color='white' />
            <Card index='6' message={messgaes[5]['primary']} para={messgaes[5]['seconday']} background='#0F2C35' marginLeft='20px' color='white' />
            <Card index='7' message={messgaes[6]['primary']} para={messgaes[6]['seconday']} background='#0F2C35' marginLeft='20px' color='white' />
          </div>
          <div className='flex'>
            <Card index='8' message={messgaes[7]['primary']} para={messgaes[7]['seconday']} background='#A8C5CE' marginLeft='205px' color='white' />
            <Card index='9' message={messgaes[8]['primary']} para={messgaes[8]['seconday']} background='#A8C5CE' marginLeft='20px' color='white' />
          </div>
          <div className='flex'>
            <Card index='10' message={messgaes[9]['primary']} para={messgaes[9]['seconday']} marginLeft='205px' background='#649F91' color='white' />
          </div>
        </>
      }
    </div>
  )
}

export default Chart