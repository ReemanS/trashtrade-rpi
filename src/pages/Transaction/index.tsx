import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import "./style.css";
import Webcam from "react-webcam";
import { TrashRecord, TotalTrashRecords } from "../../models/trashrecords";
import { useLocation } from "preact-iso";
import { signal } from "@preact/signals";
import { TrashState } from "../../models/app-state";

const videoConstraints = {
  height: 768,
  width: 1024,
  facingMode: "user",
};

export function Transaction({ state }: { state: TrashState }) {
  const [isCapturing, setIscapturing] = useState<boolean>(false);

  const webcamRef = useRef(null);
  const location = useLocation();

  const capture = useCallback(async () => {
    const imageSrc: String = webcamRef.current.getScreenshot();
    setIscapturing(true);
    const response = await fetch("http://127.0.0.1:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageSrc }),
    });

    if (!response.ok) {
      console.error("Server response was not ok");
      setIscapturing(false);
      return;
    }

    const result = await response.json();
    state.detectedTrash.value = result;
    setIscapturing(false);

    // TODO: use the result
    // screen that shows the summary of trash, with options to rescan trash, scan more trash, or finish transaction
  }, [webcamRef]);

  const handleClick = () => {
    console.log(state.detectedTrash.value);
  };

  return (
    <div>
      <div class="camera-box">
        <Webcam
          audio={false}
          screenshotFormat="image/jpeg"
          ref={webcamRef}
          videoConstraints={videoConstraints}
        />
      </div>
      <div className="buttons-bar">
        {!isCapturing && (
          <button
            className="action-button-small back-button"
            onClick={() => location.route("/")}
          >
            Back
          </button>
        )}
        <button
          className="action-button-small"
          onClick={capture}
          disabled={isCapturing}
        >
          {!isCapturing ? (
            <div>Scan Trash on Platform</div>
          ) : (
            <div class="loading-circle"></div>
          )}
        </button>
        {!isCapturing && (
          <button
            className="action-button-small help-button"
            onClick={handleClick}
          >
            Help
          </button>
        )}
      </div>
    </div>
  );
}
