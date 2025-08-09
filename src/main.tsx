import React from "react"
import ReactDOM from "react-dom/client"
import { ErrorBoundary } from "react-error-boundary"
import App from "./App"
import "./styles/reset.css"
import "./styles/variables.css"
import "./styles/global.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Error</div>}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
