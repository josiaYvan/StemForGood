import React, { useState, useEffect } from "react";
import { Fab } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import QrScan from "react-qr-reader";
import axios from "axios";
import { useRecoilState } from "recoil";
import { UserState } from "../atoms/Users";
// import Popup from "../components/Popup";

function QRscanner() {
  const [qrscan, setQrscan] = useState("No result");
  const [datafetch, setdatafetch] = useState();
  const [user] = useState([]);
  const [stopScan, setstopScan] = useState(Boolean);

  const [User, setUser] = useRecoilState(UserState);

  const history = useHistory();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: process.env.REACT_APP_API_URL,
      })
        .then((res) => {
          setdatafetch(res);
        })
        .catch((err) => {
          console.log("Pas de jeton !: ", [err]);
          alert("Veuillez rescanner☻.");
          window.location = "/";
        });
    };
    fetchToken();
  });

  //   scan
  const handleScan = (data) => {
    if (datafetch && !stopScan) {
      setQrscan(data);
      const doc = datafetch.data.GoogleSheetData;
      for (let i = 0; i < doc.length; i++) {
        for (let j = 0; j < 14; j++) {
          if (i !== 0 && j === 13) {
            let QRcode = doc[i][j];
            if (QRcode === qrscan) {
              for (let k = 0; k < 14; k++) {
                user.push(doc[i][k]);
              }
              console.log(user, qrscan);
              if (user) {
                setstopScan(true);
                localStorage.setItem("UserStored", JSON.stringify(user));
                setUser(user);
                history.push("/accueil");
              }
            }
          }
        }
      }
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="container">
      <div className="container" style={{ marginTop: "4em" }}>
        <div className="card" style={{ height: "33em", padding: "50px" }}>
          <Link to="/">
            <Fab
              className="arrowBack"
              style={{ marginRight: 20 }}
              color="primary"
            >
              <ArrowBack />
            </Fab>
          </Link>
          <span className="arrowBack">QR Scanner</span>

          <center>
            <div className="qrscan">
              <QrScan
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ height: 240, width: 320 }}
              />
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}

export default QRscanner;
