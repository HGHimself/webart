import React, { useState, useEffect } from "react"
const axios = require('axios')
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom"

export default function BlogContainer(props) {
  const { backendUrl } = props
  const [articleOptions, setArticleOptions] = useState()

  const match = useRouteMatch()

  useEffect(() => {
    axios.get(`${backendUrl}/blog`).then((r) => {
      setArticleOptions(r.data)
    })
  }, [])

  const articleLinks = articleOptions
    ? articleOptions.map((link, i) => <div key={i}><Link to={`${match.url}/${link}`} >{link}</Link></div>)
    : 'Loading...'

  return (
    <Switch>
      <Route path={`${match.path}/:article`}>
        <Link to={match.url}>Back!</Link>
        <Article backendUrl={backendUrl} />
      </Route>
      <Route path={match.path}>
        {articleLinks}
      </Route>
    </Switch>
  )
}

function Article(props) {
  const { backendUrl } = props
  const [dangerousHtml, setDangerousHtml] = useState()
  const { article } = useParams()

  axios.get(`${backendUrl}/blog/${article}`).then((r) => {
    setDangerousHtml(r.data)
  })

  return (
    <div dangerouslySetInnerHTML={{__html: dangerousHtml}} />
  )
}
