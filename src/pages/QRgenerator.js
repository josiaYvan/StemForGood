import React from "react";
import { Fab } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import QRcode from "qrcode.react";
import { useEffect } from "react";

function QRgenerator({ ID, nom }) {
  const downloadQR = () => {
    const canvas = document.getElementById("myqr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${nom}.png`; //nom d'image telecharge
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  useEffect(() => {
    if (ID) {
      downloadQR();
    }
  });

  return (
    <div>
      <div className="center">
        <div style={{ marginTop: 30 }}>
          <input
            type="text"
            style={{ width: 320, padding: "5px" }}
            value={ID}
            label="QR content"
            size="large"
            variant="outlined"
            color="primary"
          />
        </div>

        <div>
          {ID ? (
            <QRcode id="myqr" value={ID} size={320} includeMargin={true} />
          ) : (
            <p>Pas de QR code prevu</p>
          )}
        </div>
        <div>
          {ID && (
            <Fab
              className="right"
              onClick={downloadQR}
              style={{ marginLeft: 10 }}
              color="primary"
            >
              <GetApp />
            </Fab>
          )}
        </div>
      </div>
    </div>
  );
}

export default QRgenerator;
