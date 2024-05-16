import { LocationHook, useLocation } from "preact-iso";
import { TrashState } from "../../models/app-state";
import "./style.css";

export function Summary({ state }: { state: TrashState }) {
  const location = useLocation();
  return (
    <div>
      <h1>Detected Trash</h1>
      <div class="summary-container">
        <div class="summary-line">
          <span class="label">Type: </span>
          <span class="value">{state.detectedTrash.value?.trashType}</span>
        </div>
        <div class="summary-line">
          <span class="label">Weight: </span>
          <span class="value">
            {state.detectedTrash.value?.trashWeightGrams} grams
          </span>
        </div>
        <div class="empty-space-1x"></div>
        <div class="summary-line">
          <span class="label">Points Earned: </span>
          <span class="value">
            {state.detectedTrash.value?.trashPoints.toFixed(2)}
          </span>
        </div>
        <div className="empty-space-2x"></div>
      </div>
      <div className="buttons-container">
        <button
          className="action-button-small secondary"
          onClick={() => {
            state.detectedTrash.value = null;
            location.route("/transaction");
          }}
        >
          Rescan Trash
        </button>
        <button
          className="action-button-small secondary"
          onClick={() => handleScanMoreTrash(state, location)}
        >
          Scan More Trash
        </button>
        <button
          className="action-button-small"
          onClick={() => {
            handleFinishTransaction(state, location);
          }}
        >
          Finish Transaction
        </button>
      </div>
    </div>
  );
}

const handleScanMoreTrash = (state: TrashState, location: LocationHook) => {
  state.trashRecords.value.push(state.detectedTrash.value);
  state.detectedTrash.value = null;
  location.route("/transaction");
};

const handleFinishTransaction = (state: TrashState, location: LocationHook) => {
  state.trashRecords.value.push(state.detectedTrash.value);
  state.detectedTrash.value = null;
  location.route("/scanqr");
};
