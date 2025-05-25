import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './AllOrders.module.css';

export default function AllOrders() {
  const headers = {
    token: localStorage.getItem('userToken')
  };
  
  const [userId, setUserId] = useState('679a68bbe75e72a76b173e2d');
  const [allOrders, setAllOrders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getAllOrders(userId) {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
        { headers }
      );
      console.log(res.data);
      setAllOrders(res.data); 
      setLoading(true);
    } catch (err) {
      setError(err.message);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllOrders(userId);
  }, [userId]); 

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='text-3xl font-bold p-5 text-green-600'>Your Orders</h2>
          </div>
        </div>
        <table className="w-3/4 mx-auto my-6 text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Number of items
              </th>
              <th scope="col" className="px-6 py-3">
                Payment method
              </th>
              <th scope="col" className="px-6 py-3">
                Total price
              </th>
            </tr>
          </thead>
          <tbody>
            {allOrders?.map((order) => (
              <tr key={order._id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4">
                  {order.cartItems.length} items
                </td>
                <td className="px-6 py-4">
                  {order.paymentMethodType}
                </td>
                <td className="px-6 py-4">
                  {order.totalOrderPrice} EGP
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
