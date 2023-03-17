import React from 'react'
import { Helmet} from 'react-helmet-async';

function HeadeSeo({title}) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

export default HeadeSeo