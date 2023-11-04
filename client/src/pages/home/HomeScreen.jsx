import React, { useEffect, useState } from 'react'
import './HomeScreen.css'
import clientAxios from '../../utils/axios'
import { useDispatch, useSelector } from 'react-redux';
import { addOrders } from '../../store/orderReducer';
import CardOrder from '../../components/cardOrder/CardOrder';
import MessageOK from '../../components/messageOK/MessageOK';

const HomeScreen = () => {
  const [showMessageOK, setShowMessageOK] = useState("")

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = async () => {
    try {
      setLoading(true)
      await clientAxios.get('/order/getOrders', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(res => {
          dispatch(addOrders(res.data.posts));
          setLoading(false)
        })
        .catch(err => {
          console.log(err);
          setLoading(false)
        });
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <div className='container'>
      <div className='list_Order scrollbar'>
        <p className='title_list'>Listado de Pedidos</p>
        {
          orders.map((order, i) => (
            <CardOrder key={order._id} order={order} dispatch={dispatch} setShowMessageOK={setShowMessageOK} />
          ))
        }
      </div>
      {
        showMessageOK && <MessageOK text={showMessageOK} />
      }
    </div>
  )
}

export default HomeScreen