import React from 'react'
import Heading from './Heading'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()
  const icons = [
    '/imgs/logo.svg',
    '/imgs/addGroup.svg',
    '/imgs/status.svg',
    '/imgs/document.svg',
    '/imgs/notification.svg',
    '/imgs/setting-2.svg',
    '/imgs/logout.svg'
  ]
  const currentPath = window.location.pathname;

  // Extract the string after the last slash (/)
  const pathSegments = currentPath.split('/');
  const lastSegment = pathSegments[pathSegments.length - 2];
  return (
    <div className="p-5 flex flex-col justify-between h-screen">
      <div>
        <div className="logo flex items-center gap-2">
          <img src={icons[0]} className='w-1/3' />
          <h1 className='sidebar__main__heading'>Sales</h1>
        </div>
        <Heading text={'Main Menu'} />
        <div onClick={() => {
          navigate('/')
        }}>
          {
            lastSegment == '' ? <Button text='Add Group' icon={icons[1]} active my /> : <Button text='Add Group' icon={icons[1]} my />
          }
        </div>
        {/* <div onClick={() => {
          navigate('/group-details')
        }}>
          {
            lastSegment == 'group-details' ? <Button text='Details' icon={icons[2]} active my /> : <Button text='Details' icon={icons[2]} my />
          }
        </div> */}
        <div onClick={() => {
          navigate('/speech')
        }}>
          {
            lastSegment == 'speech' ? <Button text='Speech' icon={icons[3]} my active /> : <Button text='Speech' icon={icons[3]} my />
          }
        </div>
        <Heading text={'Account'} />
        <Button text='Notification' icon={icons[4]} my />
        <Button text='Setting' icon={icons[5]} my />
      </div>
      <Button text='Logout' danger icon={icons[6]} my />
    </div>
  )
}

export default Sidebar