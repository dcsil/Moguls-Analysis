import React from "react";
import "./App.css";
import ContextState from "./context_state_config";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn:
    "https://39282864c55643a4816655855c7e35ee@o358880.ingest.sentry.io/5662565",
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

function App() {
  return (
    <div>
      <ContextState />
    </div>
  );
}

export default App;
