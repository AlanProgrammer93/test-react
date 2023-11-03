import React from 'react'
import { BiError } from 'react-icons/bi'
import './MessageError.css'

const MessageError = ({ text }) => {
  return (
    <div>
      <div className='msgErrorContainer'>
        <div className='msgErrorBackground'>
          <BiError />
        </div>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default MessageError