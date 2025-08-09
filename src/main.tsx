import React from "react"
import ReactDOM from "react-dom/client"
import { ErrorBoundary } from "react-error-boundary"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { App } from "./App"
import "./reset.css"
import "./styles/variables.css"
import "./styles/global.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<div>Error</div>}>
        <App />
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>,
)
