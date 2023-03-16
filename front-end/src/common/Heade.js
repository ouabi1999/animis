import React from 'react'
import { Helmet } from 'react-helmet';

function HeadeSeo({title}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content="Animis Shop is your one-stop-shop for all things anime. We offer a wide selection of anime merchandise, including figurines, clothing, accessories, and more." />
      <meta name="keywords" content="animis shop, animis,  anime toys, anime stickers, anime merchandise, anime figurines, anime clothing, anime accessories" />
    </Helmet>
  )
}

export default HeadeSeo