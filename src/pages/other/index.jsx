import React from 'react'
import SayHello from '../../components/SayHello'
import '../../style/style.scss'
import Helmet from 'react-helmet'
import { hot } from 'react-hot-loader'
const OtherIndex = () => (
  <div>
    <Helmet>
      <title>this is other index html</title>
    </Helmet>
    <SayHello name="other index" />
    <a href="/index.html">to index</a>
  </div>
)

export default hot(module)(OtherIndex)