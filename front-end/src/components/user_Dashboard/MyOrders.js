import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';


function MyOrders() {
  const user = useSelector(state => state.auth.user)
 
  return (
    <Container>
    {user?.orders?.length > 1 ? (
       <TableContainer component={Paper}>
       <Table sx={{ minWidth: 650 }} aria-label="simple table">
         <TableHead>
           <TableRow>
             <TableCell>Order ID</TableCell>
             <TableCell align="center">Product</TableCell>
             <TableCell align="center">Order date</TableCell>
             <TableCell align="center">Shipping</TableCell>
             <TableCell align="center"> Payment Method </TableCell>
             <TableCell align="center"> Tracking Number </TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
         {user?.orders?.map((order, index) => {
         return (
                    <>
              <TableRow
                 key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
               
                  <TableCell > {order.id.slice(0, 13)} </TableCell>
                  <TableCell align="center">carbs</TableCell>
                  <TableCell align="center">{order.date.slice(0, 17)}</TableCell>
                  <TableCell align="center">{order.shippingPrice === "0" ? "Free" : `$${order.shippingPrice}`} /15-30 days </TableCell>
                  <TableCell align="center">protein</TableCell>
                  <TableCell align="center">Will activate within 3 days</TableCell>

              </TableRow>
              </>
                  )
                })}
         </TableBody>
       </Table>
     </TableContainer>
      
    ):<div style={
             { 
                height:"calc(100vh - 100px)" ,
                display:"flex", alignItems:"center",
                justifyContent:"center",
                flexDirection:'column',
             }
            }
             >
            <span> You haven't placed any orders yet</span>
            <Link to="/" >Start shopping</Link>
      </div>}
    </Container>
  )
}

export default MyOrders
const Container = styled.div`

`