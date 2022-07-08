import React, { Component } from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Chart from './Chart';
import Dashboard from './Dashboard';
import Products from './Products';
export default class DashboardLyout extends Component {
    render() {
        return (
            
            <div>
        
                    <Dashboard/>
                  
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/products" element={<Products/>}/>
                        <Route path="/charts" element={<Chart/>}/>  
                   
               
            </div>
            
        )
    }
}
