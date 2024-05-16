import { useLocation } from "preact-iso";
import trashTradeLogo from "../../assets/trashtrade-logo-1x.png";
import "./style.css";

export function Home() {
  const location = useLocation();

  return (
    <div>
      <div class="logo-wrapper">
        <img src={trashTradeLogo} alt="TrashTrade logo" />
      </div>
      <h1>Welcome to TrashTrade</h1>
      <p>
        TrashTrade is a platform that allows you to trade your trash for
        something more valuable.
      </p>
      <button
        class="action-button"
        onClick={() => location.route("/transaction")}
      >
        Start Transaction
      </button>
    </div>
  );
}
