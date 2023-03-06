import React from 'react'
import styled from 'styled-components'
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const Services = () => {
    return (
        <Container>
            <div>
              <SupportAgentIcon className="icon"/>
              <span>Help center</span>
              <p> Round-the-clock assistance for a smooth shopping experience.</p>
            </div>
            <div>
              <AdminPanelSettingsIcon className="icon"/>
              <span>Shop with confidence</span>
              <p> Our Buyer Protection policy covers your entire purchase journey.</p>
            </div>
            <div>
              <CreditScoreIcon className="icon"/>
              <span>Safe payment</span>
              <p> Pay with the world’s most popular and secure payment methods.</p>
            </div>
            <div>
              <LocalShippingIcon className="icon"/>
              <span>Worldwide shopping</span>
              <p> We ship to over 10 countries and regions, and our site comes in English language.</p>
            </div>
            
            
          
        </Container>
    )
}

export default Services
const Container = styled.div`

  width:100%;
  padding:10px;
  background-color:white;
  margin: 25px 0  auto auto;
  display:grid;
  grid-template-columns: repeat(4, auto) ;
  grid-gap:10px;

  
  div{
    display:flex;
    flex-direction:column;
    
    align-items:center;
    
   
  }
  
  p{
     width:50%;
     margin-bottom: 0;
     line-height: 20px;
     word-break: keep-all;
     text-align:center;
     font-size:12px;
     border-right: 1px solid lightgrey;
     border-left: 1px solid lightgrey;
     padding:0 10px;
  }
  
  .icon{
      font-size:40px;
      color: rgb(194, 193, 193);
  }
  @media only screen and (max-width: 1000px) {
  &{
     
    grid-template-columns: repeat(2,auto);
  }
}
@media only screen and (max-width: 760px) {
  &{
     
    grid-template-columns: repeat(1,auto);
  }
}

`
