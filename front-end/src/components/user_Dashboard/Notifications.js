import React from 'react'
import styled from 'styled-components'

function Notifications() {
  return (
    <Container>
      <span>
       You have no notifications !
      </span>
      </Container>
  )
}

export default Notifications
const Container = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height:50vh;
`