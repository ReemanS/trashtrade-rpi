import { TrashState } from "../../models/app-state";
import { generate } from "lean-qr";
import { makeAsyncComponent } from "lean-qr/extras/react";
import { createElement } from "preact";
import { useRef, useEffect } from "preact/hooks";
import { TotalTrashRecords } from "../../models/trash-records";
import "./style.css";
import { useLocation } from "preact-iso";

const QR = makeAsyncComponent({ createElement, useRef, useEffect }, generate);

export function QRScreen({ state }: { state: TrashState }) {
  const records = new TotalTrashRecords(state.trashRecords.value);
  const dataString = records.getMinifiedJSONString();
  console.log(dataString);
  const location = useLocation();

  return (
    <div>
      <p>
        Congratulations! Scan the QR code from the Mobile App to receive your
        points
      </p>
      <div>
        <QR content={dataString} padX={1} padY={1} className="qr-code" />
      </div>

      <button
        className="action-button-small"
        onClick={() => {
          state.trashRecords.value = [];
          state.detectedTrash.value = null;
          location.route("/");
        }}
      >
        Finish
      </button>
    </div>
  );
}
