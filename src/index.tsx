import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import { Home } from "./pages/Home/index.jsx";
import { NotFound } from "./pages/_404.jsx";
import { Transaction } from "./pages/Transaction/index.js";
import { Summary } from "./pages/Summary/index.js";
import { QRScreen } from "./pages/QRScreen/index.js";
import { createAppState } from "./models/app-state.js";

import "./style.css";

export function App() {
  const appState = createAppState();
  return (
    <LocationProvider>
      <main>
        <Router>
          <Home path="/" />
          <Transaction state={appState} path="/transaction" />
          <Summary state={appState} path="/summary" />
          <QRScreen state={appState} path="/scanqr" />
          <NotFound default />
        </Router>
      </main>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));
