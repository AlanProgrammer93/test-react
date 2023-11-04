import React from 'react'
import { MdDelete } from 'react-icons/md'

const CardOrder = ({order}) => {
    const handlerDelete = () => {
        console.log(order);
    }
    return (
        <div className='order'>
            <h1>{order.client}</h1>
            <div className='content'>
                <h2 className='rank'><MdDelete onClick={handlerDelete} /></h2>
                <h4>{order.product}</h4>
                <p>cantidad: {order.quantity}</p>
            </div>
            <p className='status'>{order.status}</p>
        </div>
    )
}

export default CardOrder