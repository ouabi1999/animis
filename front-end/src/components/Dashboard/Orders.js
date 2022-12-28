import React from 'react'
import styled from 'styled-components'

function Orders() {
  return (
    <OrdersWrap>Orders</OrdersWrap>
  )
}

export default Orders

 const OrdersWrap = styled.div`
     display:flex;
     justify-content:center;
     background:#ffff;
     border-radius:8px;
     padding:5px 10px;
     margin-top:15px;
     table{
         margin-top:10px;
     }
     table th{
         background:lightgrey;
         padding:10px
     }
     table tr td {
        padding:10px
     }

 `
 

 const OrderInfo = styled.div`
 
 
 `