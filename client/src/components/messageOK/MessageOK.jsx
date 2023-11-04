import React from 'react'
import './MessageOK.css'
import { AiOutlineCheck } from 'react-icons/ai'

const MessageOK = ({ text="Correcto" }) => {
    return (
        <div>
            <div className='msgOkContainer'>
                <div className='msgOkBackground'>
                    <AiOutlineCheck />
                </div>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default MessageOK