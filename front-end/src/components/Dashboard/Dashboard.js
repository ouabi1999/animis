import React, { Component } from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom"
import Chart from '../Dashboard/Chart'
import Orders from './Orders'
import HeadeSeo from '../../common/Heade'

 class Dashboard extends Component {
    render() {
        return (
            <Wrapper>
                
                <ChartWrap>
                    <Chart />
                </ChartWrap>
                <OrdersWrap>
                    <Orders />
                </OrdersWrap>
                <HeadeSeo title = " Admin / dashboard"/>
            </Wrapper>
        )
    }
}

export default Dashboard
const Wrapper = styled.div`
    min-width:760px;
    margin:auto;
  
`
 const ChartWrap = styled.div`
    margin-top:10px;
 `
 const OrdersWrap = styled.div`
    
      
     
 `

