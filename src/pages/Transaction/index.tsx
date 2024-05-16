import { useCallback, useRef, useState } from "preact/hooks";
import "./style.css";
import Webcam from "react-webcam";
import { TrashRecord, TotalTrashRecords } from "../../models/trashrecords";

const videoConstraints = {
  height: 768,
  width: 1024,
  facingMode: "user",
};

export function Transaction() {
  const [isCapturing, setIscapturing] = useState<boolean>(false);
  const webcamRef = useRef(null);
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
    console.log(result);
    setIscapturing(false);

    // TODO: use the result
  }, [webcamRef]);

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
    </div>
  );
}
