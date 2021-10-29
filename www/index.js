import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { Auth0Provider } from "@auth0/auth0-react"

import App from "./App.jsx"

const root = "root"
const errorMsg = `Error: We could not locate element with id ${root} to mount!`

console.log(`Mounting on ${root}!`)

const wrapper = document.getElementById(root)
wrapper ? ReactDOM.render(
  <Auth0Provider
    domain="dev-9q9l-bfq.us.auth0.com"
    clientId="PS27QDn1YlQVk9YCP4Z4dKiyt7lBWhMC"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  wrapper
) : console.log(errorMsg)
