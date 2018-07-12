import React from 'react'
import create from '../create'
import SayHello from '../components/SayHello'
import Helmet from 'react-helmet'
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
create(PostPage)