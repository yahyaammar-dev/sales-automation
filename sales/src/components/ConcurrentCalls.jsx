import React from 'react'
import Sidebar from './misc/Sidebar'
import Main from './misc/Main'
import ConcurrentForm from './misc/ConcurrentForm'

const ConcurrentCalls = () => {
  return (
    <div class="flex h-screen">
      <div class="w-2/12 h-screen"><Sidebar /></div>
      <div class="w-10/12"><ConcurrentForm /></div>
    </div>
  )
}

export default ConcurrentCalls