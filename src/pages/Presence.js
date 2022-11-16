import React, { useState, useEffect } from "react";
import { Fab } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import QrScan from "react-qr-reader";
import axios from "axios";
import { PopupState } from "../atoms/Users";
import { useRecoilState } from "recoil";

function QRscanner() {
  const [qrscan, setQrscan] = useState("No result");
  const [datafetch, setdatafetch] = useState();
  const [user] = useState([]);
  const [stopScan, setstopScan] = useState(Boolean);

  const history = useHistory();
  const [Pop, setPop] = useRecoilState(PopupState);

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
        });
    };
    fetchToken();
  });

  //   scan
  const handleScan = (data) => {
    if (datafetch && !stopScan) {
      setQrscan(data);
      //   maniplation de données
      const doc = datafetch.data.GoogleSheetData;
      for (let i = 0; i < doc.length; i++) {
        for (let j = 0; j < 15; j++) {
          if (i !== 0 && j === 14) {
            let QRcode = doc[i][j];
            if (QRcode === qrscan) {
              for (let k = 0; k < 15; k++) {
                user.push(doc[i][k]);
              }
              if (user) {
                const d = new Date();
                const date =
                  d.getDate() +
                  "/" +
                  d.getMonth() +
                  "/" +
                  d.getFullYear() +
                  " " +
                  d.getHours() +
                  ":" +
                  d.getMinutes();
                setstopScan(true);

                user[10] === "STAFF"
                  ? sePointerStaff(user[14], date, user[2], user[3])
                  : sePointerNonStaff(
                      user[14],
                      date,
                      user[2],
                      user[3],
                      user[10]
                    );
              }
            }
          }
        }
      }
    }
  };
  // {
  //   text: "",
  //   show: false,
  // }

  const sePointerStaff = async (ID, date, firstname, lastname) => {
    await axios({
      method: "post",
      url: "https://eoroiqf69q2m03q.m.pipedream.net",
      data: {
        ID,
        date,
        firstname,
        lastname,
      },
    })
      .then((res) => {
        console.log(res.data);
        setPop({
          text: `${firstname} présent(e) ☻`,
          show: true,
        });
        setTimeout(() => {
          setPop(null);
        }, 5000);
        history.push("/accueil");
      })
      .catch((err) => {
        alert("Veuillez réessayer!");
        console.log(err);
      });
  };

  const sePointerNonStaff = async (ID, date, firstname, lastname, activity) => {
    await axios({
      method: "post",
      url: "https://eo37g1je0qjzz4f.m.pipedream.net",
      data: {
        ID,
        date,
        firstname,
        lastname,
        activity,
      },
    })
      .then((res) => {
        console.log(res.data);
        setPop({
          text: `${firstname} présent(e) ☻`,
          show: true,
        });
        setTimeout(() => {
          setPop(null);
        }, 5000);
        history.push("/accueil");
      })
      .catch((err) => {
        alert("Veuillez réessayer!");
        console.log(err);
      });
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="container">
      <div className="container" style={{ marginTop: "4em" }}>
        <div className="card" style={{ height: "33em", padding: "50px" }}>
          <Link to="/accueil">
            <Fab
              className="arrowBack"
              color="primary"
              style={{ marginRight: 10 }}
            >
              <ArrowBack />
            </Fab>
          </Link>
          <span className="arrowBack">QR Scanner</span>
          <br />

          <center>
            <img
              className="image"
              src="stem4good.png"
              alt=""
              style={{ width: "10em", marginTop: "-10em" }}
            />
            <div className="qrscan">
              {" "}
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
