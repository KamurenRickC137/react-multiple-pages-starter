import React from 'react'
import create from '../../create'
import SayHello from '../../components/SayHello'
import '../../style/style.scss'
import Helmet from 'react-helmet'
const OtherIndex = () => (
  <div>
    <Helmet>
      <title>this is other index html</title>
    </Helmet>
    <SayHello name="other index" />
    <a href="/index.html">to index</a>
  </div>
)

create(OtherIndex)