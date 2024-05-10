import trashTradeLogo from "../../assets/trashtrade-logo-1x.png";
import "./style.css";

export function Home() {
  return (
    <div class="home">
      <div class="logo-wrapper">
        <img src={trashTradeLogo} alt="TrashTrade logo" />
      </div>
      <h1>Welcome to TrashTrade</h1>
      <p>
        TrashTrade is a platform that allows you to trade your trash for
        something more valuable.
      </p>
      <button class="action-button" onClick={handleClick}>
        Start Transaction
      </button>
    </div>
  );
}

const handleClick = () => {
  console.log("Transaction started");
};
