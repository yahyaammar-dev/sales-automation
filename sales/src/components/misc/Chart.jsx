import React from 'react'
import Card from './Card'
import Navbar from './Navbar'

const Chart = () => {
  return (
    <div className='p-5 mainBg'>
      <Navbar />
      <Card message='Hello' para='Greeting Speech' />
      <div className="flex gap-2 mb-5 items-center ml-4">
        <p className='font-bold text-sm'>Response Time</p>  
        <p className='bg-indigo-500 py-1 px-3 rounded'>05 s </p>
      </div>
      
      <Card message='Introduction Speech' para='Promotion Offer' />
      <div className='flex'>
        <Card message='Keyword A' para='Interested, Free, Got' marginLeft='205px' background='#256D85' color='white' />
        <Card message='Voice Response A' para='Transferring Call to supervisor' marginLeft='20px' background='#256D85' color='white' />
        <Card message='Transferring the call' para='0974-363434234' marginLeft='20px' background='#256D85' color='white' />
      </div>
      <div className='flex'>
        <Card message='Keyword B' background='#0F2C35' para='Not Available' marginLeft='205px' color='white' />
        <Card message='Voice Response B' background='#0F2C35' para='Sorry to Disturb, Bye Bye, Send by Whataspp' marginLeft='20px' color='white' />
        <Card message='Introduction Speech' background='#0F2C35' para='Promotion Offer' marginLeft='20px' color='white' />
      </div>
      <div className='flex'>
        <Card message='Keyword C' background='#A8C5CE' para='Maybe Call Later' marginLeft='205px' color='white' />
        <Card message='Voice Response C' background='#A8C5CE' para='Sorry to disturb, Bye Bye, send by whatsapp' marginLeft='20px' color='white' />
      </div>
      <div className='flex'>
        <Card message='Keyword D' para='I cant hear You' marginLeft='205px' background='#649F91' color='white' />
        <Card message='Voice Response D' marginLeft='20px' background='#649F91' color='white' />
      </div>
    </div>
  )
}

export default Chart