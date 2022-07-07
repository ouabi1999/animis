import React, { Component } from 'react'
import styled from 'styled-components'

export class Orders extends Component {
    constructor(){
        super();
        this.state={
        info:[],
        }
    }
    componentDidMount(){   
        fetch('/info').then(response=>{
            if( response.ok){
              return  response.json()
            }
           
          }).then(data => this.setState({info:data}) )
          .then(response=> response.json())
          .then(err=> console.log(err))
    }

    render() {
        return (
            <OrdersWrap>
                <table>
                <tr className="table-head">
                    <th> Order Number</th>
                    <th> Client Name</th>
                    <th> Email</th>
                    <th> Case</th>
                    <th> date</th>
                </tr>
                
                  {this.state.info.map((order) =>{
                      return(
                         <tr key={order.id}>
                            <td>120</td>
                            <td>{order.fullname}</td>
                            <td>{order.email}</td>
                            <td>delvred</td>
                            <td>{order.date}</td>
                         </tr>
                      )
                  })}    
                </table> 
            </OrdersWrap>
        )
    }
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