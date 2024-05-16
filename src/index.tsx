import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import { Home } from "./pages/Home/index.jsx";
import { NotFound } from "./pages/_404.jsx";
import { Transaction } from "./pages/Transaction/index.js";

import "./style.css";

export function App() {
  return (
    <LocationProvider>
      <main>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/transaction" component={Transaction} />
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));
