import React, { useEffect, useState, useRef } from "react"
import * as oolisp from "oolisp"
import { css } from "@emotion/css"

import FlexRow from "../components/FlexRow.jsx"
import Button from "../components/Button.jsx"

import entry from "../build/entry.js"

let env;
const prelude = `
list
(def {true} 1)
(def {false} 0)
(def {nil} ())
(def {fun} (\\ {args body} {def (list (head args)) (\\ (tail args) body)}))
(fun {cons x xs}
  {join
    (if (== x {})
      {x}
      {list x})
    xs})
(fun {snoc x xs} {join xs (list x)})
(fun {curry f xs} {eval (join (list f) xs)})
(fun {uncurry f : xs} {f xs})
(fun {empty l} {if (== l {}) {true} {false}})
(fun {len l} {if (empty l) {0} {+ 1 (len (tail l))}})
(fun {reverse l} {if (== (len l) 1) {l} {snoc (head l) (reverse (tail l)) }})
(fun {dec n} {- n 1})
(fun {add1 n} {+ n 1})
(fun {add a b} {iter a b (\\ {n-1} {+ 1 n-1})})
(fun {gauss n} {rec n 0 (\\ {n-1 gaussn-1} {+ (add1 n-1) (gaussn-1)})})

(fun {nth n l}
  {head (rec n
    l
    (\\ {n-1 nthn-1} {tail (nthn-1)}))})

(fun {fac n}
  {rec n
    1
    (\\ {n-1 facn-1}
      {* (add1 n-1) (facn-1)})})

(fun {peas how-many-peas}
  {rec how-many-peas
    {}
    (\\ {l-1 peasl-1}
    {cons "pea" peasl-1})})

(fun {iter target base step}
  {if (== 0 target)
    {base}
    {step (\\ {} {iter (dec target) base step})}})

(fun {rec target base step}
  {if (== 0 target)
    {base}
    {step (dec target)
      (\\ {} {rec (dec target) base step})}})

(fun {primep n}
  {rec n 0
    (\\ {n-1 primepn-1}
      {if (== 0 (% n n-1))
        {n-1}
        {primepn-1}})})

(fun {gcd a b}
  {if (== b 0) {a} {gcd b (% a b)}})

(fun {zip a b}
  {reverse (rec (len a)
    {}
    (\\ {n-1 zipn-1}
      {cons
        (list (nth n-1 a) (nth n-1 b))
        (zipn-1)}))})
`

const terminalInput = css`
  border: 1px solid black;
  outline: none;
  width: 80%;
  font-size: 1em;
`

const terminal = css`
  font-size: 1.2em;
`

const prompt = "oolisp >"

const help = `
Welcome to Oolisp, a Web-based LISP interpreter.

  Special Commands:
    help - prints this message you're reading now
    env - prints the environment of variables' names and their assigned values
    clear - clears the output buffer

  Syntax & Types:
    number:
        - Numbers like we are all familiar with. (ie. 1, 1.1, 1.1e+13, 1.1e-13)
    symbol:
        - Symbols are names that can be assigned to any value. (ie. add, def, fun, some-var)
        usage: def {symbol-name} value
    string:
        - Strings are characters delimited by double quotes. (ie. "c'ect ci nest pa un pipe?", "hg king")
    s-expression:
        - S-Expressions are used to call and evaluate functions. (ie. (+ 1 2 3), (- (+ 9 1) (* 5 2)), (list 1 2 3 4), (== {} {}))
        usage: (function arg0 arg1 arg2)
    q-expression:
        - Q-Expressions are lists of values, remains unevaluated. (ie. {1 1 1 1}, {+ 9 (== {} {})})
        usage: {elem0 elem1 elem2}
    lambda:
        - Lambda functions are how you build functions, can be partially applied. (ie. (\\ {a b} {+ a b}))
        usage: (\\ {arg-list} {body})
`

function Oolisp( props )  {

  const [ shellInput, setShellInputState ] = useState("")
  const [ shellHistory, setShellHistoryState ] = useState([])
  const [ shellBuffer, setShellBufferState ] = useState("")
  const [ historyIndex, setHistoryIndex ] = useState(-1)

  useEffect(() => {
    env = oolisp.init_env()
    console.log(oolisp.lisp(env, prelude))
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
    } else if (inputRef.current == "help") {
      setShellBufferState(<pre>{help}</pre>)
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
        // setShellInputState(historyRef.current[historyIndex])
      } else if ( e.key == "ArrowDown") {
        setHistoryIndex(i => i == -1 ? -1 : i - 1)
        // setShellInputState(historyIndex == -1 ? "" : historyRef.current[historyIndex])
      }
  };

  return (
    <>
      <h2>Oolisp</h2>
      <p>Web-based LISP interpreter. ~994 lines of Rust, compiled to WASM. Enter <code>help</code> into the prompt below for instructions.</p>
      <div className={terminal}>
        <FlexRow direction="column-reverse" overflowY="scroll" maxHeight="500px">
          {shellBuffer}
        </FlexRow>
        <FlexRow align="center">
          <label htmlFor="prompt">{prompt}</label><input name="prompt" type="text" onChange={handleInput} value={shellInput} className={terminalInput} />
        </FlexRow>
      </div>
    </>
  )
}

entry(<Oolisp />)
