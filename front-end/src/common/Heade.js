import React from 'react'
import { Helmet } from 'react-helmet';

function HeadeSeo({title}) {
  return (
    <Helmet>
        <title>{title}</title>
    </Helmet>
  )
}

export default HeadeSeo