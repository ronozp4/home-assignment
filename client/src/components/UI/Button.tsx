import React from 'react'
import './buttonStyle.css'

type ButtonProps = {
    title: string
    color?: string
    onClick?: any
  };
  

const Button: React.FC<ButtonProps>  = ({title, onClick, color}) => {
  return (
    <div onClick={onClick} className='button' style={{backgroundColor: color}}>{title}</div>
  )
}

export default Button