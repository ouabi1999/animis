import React, { Component } from 'react'
import "../Navbar/navbar.css"

 class Userinfo extends Component {
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
    }
    showdata =() =>{
        console.log(this.state.info)
    }

    render() {
        return (
            <div>
                <h1>My Orders</h1>
                <button type="button" onClick={this.showdata}>Your Orders</button>
                <table>
                    <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Date</th>
                        <th>Address</th>
                        <th>Total</th>
                        <th>Price</th>
                        <th>SubTotal</th>
                        <th>Product</th>
                        <th>Quantity</th>
                    </tr>
                    </thead>
                    {this.state.info.map(info =>{
                    return(
                        <tbody>
                            <tr key={info.id}>
                                <td>{info.id}</td>
                                <td>{info.date}</td>
                                <td>{info.address}</td>
                           </tr> 
                        </tbody>
                    )
                })}
                </table>
            </div>
        )
    }
}
export default Userinfo
