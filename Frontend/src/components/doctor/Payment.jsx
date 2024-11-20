import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import "./Payment.css"

const Payment = () => {
    const [paymentLista, setPaymentList] = useState([]);
    const { doctor } = useSelector((state) => state.doctor);

    const paymentListFunction = async() =>{
        const paymentList = await axios.get(`http://localhost:8080/appointment/api/v1/get-payment-list/${doctor._id}`)
        if(paymentList.status === 200){
          if(paymentList.data.length>0){
            setPaymentList(paymentList.data.data.reverse());
          }
           
        }
    }
    useEffect(()=>paymentListFunction,[])
  return (
    <>
    {paymentLista ? <> 
      <div className='payment-list'>
    {paymentLista.map((p)=>(
        <>

          <div className='payment-list-1'>
            <div className='payment-list-1-logo'>
              <i class="fa-solid fa-money-check-dollar"></i>
            </div>
            <div className='payment-list-1-detail'>
              <div className='payment-list-1-detail-name'>
              {p.userId.name}
              </div>
              <div className='payment-list-1-detail-date'>
               <b>Date :</b> {String(p.updatedAt).substring(0,10)} {String(p.updatedAt).substring(11,16)}
              </div>
              <div className='payment-list-1-detail-id'>
               <b>PaymentID </b>: {p._id}
              </div>
            </div>
            <div className='payment-list-1-phone'>
            +91-{p.userId.phone}
            </div>
            <div className='payment-list-1-amount'>
              <div className='payment-list-1-amount-total'>
              Rs. {p.totalAmount}
              </div>
              <div className='payment-list-1-amount-status'>
              {p.paymentStatus}
              </div>
            </div>
          </div>
          {/* Name :  {p.userId.name} <br/>
          Phone : {p.userId.phone} <br/>
          Amount : {p.totalAmount} <br/>
          Status : {p.paymentStatus} <br/>
          Date : {String(p.updatedAt).substring(0,10)} {String(p.updatedAt).substring(11,16)}<br/>
          Payment Id : {p._id}<br/> */}
        </>
    ))}</div>
    </> :<div>No Payment Details</div>}
    </>
  )
}

export default Payment