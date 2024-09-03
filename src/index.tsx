import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import "./index.css"
import App from "./App"
import configurePresetStore from "./store/presets-store"
import configurePtzStore from "./store/ptz-store"
import configureSceneStore from "./store/scenes-store"

configurePresetStore()
configurePtzStore()
configureSceneStore()

const root = ReactDOM.createRoot(document.getElementById("root")!)
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
