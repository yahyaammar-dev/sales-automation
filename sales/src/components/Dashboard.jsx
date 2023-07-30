import React from 'react'
import Sidebar from './misc/Sidebar'
import Main from './misc/Main'

const Dashboard = () => {
  return (
    <div class="flex h-screen">
      <div class="w-2/12 h-screen"><Sidebar /></div>
      <div class="w-10/12"><Main /></div>
    </div>
  )
}

export default Dashboard