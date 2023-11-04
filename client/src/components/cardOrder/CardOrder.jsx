import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { removeOrder } from '../../store/orderReducer';
import clientAxios from '../../utils/axios';
import Loading from '../loading/Loading';
import MessageError from '../messageError/MessageError';

const CardOrder = ({ order, dispatch, setShowMessageOK }) => {
    const [loading, setLoading] = useState(false)
    const [showMessageError, setShowMessageError] = useState("")

    useEffect(() => {
        setInterval(() => {
            setShowMessageOK("")
        }, 2500)
    }, [])

    const handlerDelete = async () => {
        try {
            setLoading(true)
            await clientAxios.delete(`/order/remove/${order._id}`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(res => {
                    console.log(res.data.msg);
                    dispatch(removeOrder(order._id));
                    setLoading(false)
                    setShowMessageOK(res.data.msg)
                })
                .catch(err => {
                    setLoading(false)
                    setShowMessageError("Ocurrio un error!. Intentelo otra ves.")
                    setInterval(() => {
                        setShowMessageError("")
                    }, 2500)
                });
        } catch (error) {
            setLoading(false)
            setShowMessageError("Ocurrio un error!. Intentelo otra ves.")
            setInterval(() => {
                setShowMessageError("")
            }, 2500)
        }
    }
    return (
        <>
            <div className='order'>
                <h1>{order.client}</h1>
                <div className='content'>
                    <h2 className='rank'><MdDelete onClick={handlerDelete} /></h2>
                    <h4>{order.product}</h4>
                    <p>cantidad: {order.quantity}</p>
                </div>
                <p className='status'>{order.status}</p>
            </div>
            {
                loading && <Loading />
            }
            {
                showMessageError && <MessageError text={showMessageError} />
            }
        </>
    )
}

export default CardOrder