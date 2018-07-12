import React from 'react'
import create from '../create'
import SayHello from '../components/SayHello'
import Helmet from 'react-helmet'
import '../style/index.scss'
const Index = () => (
  <div>
    <Helmet>
      <title>index page</title>
    </Helmet>
    <SayHello name="zido" />
    <a href="/post.html">to post</a>
  </div>
)

create(Index)