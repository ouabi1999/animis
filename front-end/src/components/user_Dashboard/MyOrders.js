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


function MyOrders() {
  const user = useSelector(state => state.auth.user)
 
  return (
    <Container>
    {user  ? (
       <TableContainer component={Paper}>
       <Table sx={{ minWidth: 650 }} aria-label="simple table">
         <TableHead>
           <TableRow>
             <TableCell>Order ID</TableCell>
             <TableCell align="center">Product</TableCell>
             <TableCell align="center">Delivery Date</TableCell>
             <TableCell align="center">Shipping Price</TableCell>
             <TableCell align="center">Delivery Status</TableCell>
             <TableCell align="center">Payment</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
         
             <TableRow
              
               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
             >
               <TableCell component="th" scope="row">
                 order
               </TableCell>
               <TableCell align="center"> countries </TableCell>
               <TableCell align="center">fat</TableCell>
               <TableCell align="center">carbs</TableCell>
               <TableCell align="center">protein</TableCell>
               <TableCell align="center">protein</TableCell>
             </TableRow>
          
         </TableBody>
       </Table>
     </TableContainer>
      
    ):<div>You haven't placed any orders yet</div>}
    </Container>
  )
}

export default MyOrders
const Container = styled.div`

`