import React from 'react'
import SayHello from '../components/SayHello'
import Helmet from 'react-helmet'
import { hot } from 'react-hot-loader'
const PostPage = () => (
  <div>
    <SayHello name="post" />
    <Helmet>
      <title>this is post html</title>
    </Helmet>
    <a href="/index.html">to index</a>
    <br />
    <a href="/other/index.html">to other</a>
  </div>
)
export default hot(module)(PostPage)