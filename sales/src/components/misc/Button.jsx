import React from 'react'

const Button = ({text, icon, active, danger, my, onClick, getNumber, disabled}) => {
  return (
    <button getNumber disabled = {disabled} onClick={onClick} className={`btn btn-primary flex gap-1 p-2 rounded items-center ${my ? 'my-2' : ''}  w-full ${danger ? 'danger--button' : active ?  'bg--active white-color' : 'button--main--color'} `}>
        {icon && <img src={icon} className='button--image' /> }
        {text && <p>{text}</p>}  
    </button>
  )
}

export default Button