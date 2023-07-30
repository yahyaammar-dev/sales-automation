import React, { useEffect } from 'react'
import Button from './Button'

const Block = () => {

  return (
    <div className='bg-white shadow-md sm:rounded-lg flex justify-end p-8'>
      <div className='w-2/12'>
        <Button icon={'/imgs/plus.png'} text='Add Group' active />
      </div>
    </div>
  )
}

export default Block