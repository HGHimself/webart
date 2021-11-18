import React, { useEffect, useState, useRef } from "react"
import * as oolisp from "oolisp"
import { css } from "@emotion/css"
import Terminal from 'terminal-in-react';

import FlexRow from "../components/FlexRow.jsx"
import Button from "../components/Button.jsx"

let env;
const prelude = `
list
(def {true} 1)
(def {false} 0)
(def {nil} ())

(def {fun} (\ {args body} {def (head args)   (\ (tail args) body)}))

(fun {list & xs} {xs})

(fun {cons x xs} {join (list x) xs})
(fun {snoc x xs} {join xs (list x)})

(fun {first x : xs} {x})
(fun {second x : xs} {eval (head xs)})

(fun {curry f xs} {eval (join (list f) xs)})
(fun {uncurry f : xs} {f xs})

(fun {len l} {if (empty l) {0} {+ 1 (len (tail l))}})

(fun {reverse x} {if (== (len l) 1) {l} {snoc (head l) (reverse (tail l)) }})

(fun {empty l} {if (== (len l) 0) {true} {false}})
(fun {dec n} {- n 1})
(fun {inc n} {+ n 1})

(fun {nth l n} {if (== n 0) {head l} {nth (tail l) (dec n)}})
`

const terminalInput = css`
  background: inherit;
  border: none;
  height: 1.2em;
  outline: none;
  width: 80%;
`

const prompt = "oolisp $"

export default function Oolisp( props )  {

  const [ shellInput, setShellInputState ] = useState("")
  const [ shellHistory, setShellHistoryState ] = useState([])
  const [ shellBuffer, setShellBufferState ] = useState("")
  const [ historyIndex, setHistoryIndex ] = useState(-1)

  useEffect(() => {
    env = oolisp.init_env()
    oolisp.lisp(env, prelude)
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const inputRef = useRef()
  inputRef.current = shellInput

  const historyRef = useRef()
  historyRef.current = shellHistory

  const bufferRef = useRef()
  bufferRef.current = shellBuffer

  const handleInput = ({target}) => {
    setShellInputState(target.value)
  }

  const handleCalculate = () => {
    if (inputRef.current == "clear") {
      setShellBufferState("")
    } else {
      setShellBufferState((currentBuf) => <>
        <div>{oolisp.lisp(env, inputRef.current)}</div>
        <div>{prompt} {inputRef.current}</div>
        {currentBuf}
      </>)
    }

    setShellHistoryState(history => [inputRef.current, ...history])
    setShellInputState("")
    setHistoryIndex(-1)
  }

  const handleKeyPress = (e) => {
      e = e || window.event;
      if ( e.key == "Enter" ) {
        handleCalculate()
      } else if ( e.key == "ArrowUp") {
        setHistoryIndex(i => i == historyRef.current.length - 1  ? i : i + 1)
        //setShellInputState(historyRef.current[historyIndex])
      } else if ( e.key == "ArrowDown") {
        setHistoryIndex(i => i == -1 ? -1 : i - 1)
        //setShellInputState(historyIndex == -1 ? "" : historyRef.current[historyIndex])
      }
  };

  return (
    <>
      <h2>Oolisp</h2>
      <FlexRow direction="column-reverse" overflowY="scroll" height="500px">
        {shellBuffer}
      </FlexRow>
      <FlexRow align="center">
        <label htmlFor="prompt">oolisp $</label><input name="prompt" type="text" onChange={handleInput} value={shellInput} className={terminalInput} />
      </FlexRow>
    </>
  )
}
