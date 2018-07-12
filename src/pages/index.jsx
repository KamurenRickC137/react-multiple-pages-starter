import React from 'react'
import SayHello from '../components/SayHello'
import Helmet from 'react-helmet'
import '../style/index.scss'
import { hot } from 'react-hot-loader'
const Index = () => (
  <div>
    <Helmet>
      <title>index page</title>
    </Helmet>
    <SayHello name="world" />
    <a href="/post.html">to post</a>
  </div>
)
export default hot(module)(Index)