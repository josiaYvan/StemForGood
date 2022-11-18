import { Button } from "@material-ui/core";
import Icon from "@mdi/react";
import { mdiQrcode, mdiQrcodeScan } from "@mdi/js";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserState } from "../atoms/Users";

function Home() {
  const [User] = useRecoilState(UserState);

  return (
    <div className="container">
      <div className="center">
        <div className="container ">
          <div className="card" style={{ marginTop: "4em" }}>
            <div style={{ padding: "50px " }}>
              <h5 style={{ marginBottom: "2em " }}>
                <img className="logo" src="stem4good.png" alt="" />
                <br />
                Authentification
              </h5>
              <div className="row">
                {User && User[10] === "STAFF" && (
                  <div className="col s12 l6" style={{ marginBottom: "10px" }}>
                    <Link to="/form" className="">
                      <Button variant="contained" size="large" color="primary">
                        <Icon
                          style={{ padding: 10 }}
                          path={mdiQrcode}
                          title="QR Generator"
                          size={10}
                          color="white"
                        />
                      </Button>
                    </Link>
                  </div>
                )}
                <div
                  className={
                    User && User[10] === "STAFF" && "col s12 l6 center"
                  }
                >
                  <Link to={!User && "/qr_scanner"}>
                    <Button variant="contained" size="large" color="primary">
                      <Icon
                        style={{ padding: 10 }}
                        path={mdiQrcodeScan}
                        title="QR Scanner"
                        size={10}
                        color="white"
                      />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
