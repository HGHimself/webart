import React, { useState, useEffect } from "react"
import { css } from "@emotion/css"
const axios = require('axios')

import FlexRow from '../components/FlexRow.jsx'

const defaultMessage = `TO MAKE A DADAIST POEM
Take a newspaper.
Take some scissors.
Choose from this paper an article of the length you want to make your poem.
Cut out the article.
Next carefully cut out each of the words that makes up this article and put them all in a bag.
Shake gently.
Next take out each cutting one after the other.
Copy conscientiously in the order in which they left the bag.
The poem will resemble you.
And there you are – an infinitely original author of charming sensibility, even though unappreciated by the vulgar herd.`

export default function Dada(props) {
  const { backendUrl } = props
  const [poem, setPoem] = useState()
  const [input, setInput] = useState(defaultMessage)

  useEffect(() => {
    fetchPoem(defaultMessage)
  }, [])

  const handleInput = ({target}) => {
    const inputVal = target.value
    setInput(inputVal)
    fetchPoem(inputVal)
  }

  const fetchPoem = (originalPoem) => {
    axios.post(`${backendUrl}/dada`,{
      message: originalPoem,
    }).then((r) => {
      setPoem(r.data)
    }).catch((r) => {
      setPoem(`Oh no... ${r}`)
    })
  }

  return (
    <FlexRow flex="flex">
      <div className={css`width: 30%;`}>
        <textarea  onChange={handleInput} value={input} />
      </div>
      <div className={css`width: 60%; margin-left: 40px`}>
        <pre>
          {poem}
        </pre>
      </div>
    </FlexRow>
  )
}
