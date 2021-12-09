import ReactDOM from "react-dom"

const entry = (container) => {
  const root = "root"
  const errorMsg = `Error: We could not locate element with id ${root} to mount!`

  console.log(`Mounting on ${root}!`)

  const wrapper = document.getElementById(root)
  wrapper ? ReactDOM.render(container, wrapper) : console.log(errorMsg)
}

export default entry;
