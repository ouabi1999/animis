import React from 'react'
import { Helmet } from 'react-helmet';

function HeadeSeo({title}) {
  return (
    <Helmet>
        <title>{`ANIMIS - ${ title }`}</title>
    </Helmet>
  )
}

export default HeadeSeo