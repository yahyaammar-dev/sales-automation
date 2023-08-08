import React from 'react'
import Sidebar from './misc/Sidebar'
import Chart from './misc/Chart'

const Speech = () => {
  return (
    <div class="flex h-screen">
      <div class="w-2/12 h-screen"><Sidebar /></div>
      <div class="w-10/12"><Chart  /></div>
    </div>
  )
}

export default Speech