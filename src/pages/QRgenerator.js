import React, { useState } from "react";
import { Fab, TextField, Grid } from "@material-ui/core";
import { ArrowBack, GetApp } from "@material-ui/icons";
import { Link } from "react-router-dom";
import QRcode from "qrcode.react";
import Form from "../components/Form";

function QRgenerator() {
  const [qr, setQr] = useState("");
  const handleChange = (event) => {
    setQr(event.target.value);
  };
  const downloadQR = () => {
    const canvas = document.getElementById("myqr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${qr + Date.now()}.png`; //nom d'image telecharge
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="container ">
      <div className="container ">
        <div className="card " style={{ padding: "50px" }}>
          <Link to="/">
            <Fab style={{ marginRight: 10, marginLeft: 10 }} color="primary">
              <ArrowBack />
            </Fab>
          </Link>
          <span>QR Generator</span>
          <div className="center">
            <Form />
            <div style={{ marginTop: 30 }}>
              <TextField
                onChange={handleChange}
                style={{ width: 320, padding: "5px" }}
                value={qr}
                label="QR content"
                size="large"
                variant="outlined"
                color="primary"
              />
            </div>

            <div>
              {qr ? (
                <QRcode
                  id="myqr"
                  value={qr + Date.now()}
                  size={320}
                  includeMargin={true}
                />
              ) : (
                <p>Pas de QR code prevu</p>
              )}
            </div>
            <div>
              {qr && (
                <Grid container>
                  <Grid item xs={10}>
                    <label htmlFor="Identifiant">
                      Identifiant
                      <input
                        type="text"
                        name=""
                        value={qr + Date.now()}
                        readOnly
                        id=""
                        style={{ width: "60%", marginLeft: "10px" }}
                      />
                    </label>
                  </Grid>
                  <Grid item xs={2}>
                    <Fab
                      onClick={downloadQR}
                      style={{ marginLeft: 10 }}
                      color="primary"
                    >
                      <GetApp />
                    </Fab>
                  </Grid>
                </Grid>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRgenerator;
